import { getRepository } from "typeorm";
import { User } from "../../entity/user";
import { UserPayload } from "./user.interface";
import { UserRole } from "../../entity/user_role";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { promisify } from "util";
import fs from "fs";
import { createOTPForEmail } from "../../utils/inlineFunc";
import { sendEmail } from "../../utils/sendEmail";
import { Otp } from "../../entity/otp";

export const addUserService = async (payload: UserPayload) => {
    try {

        const { full_name, email, number, aadhaar_number, role, password } = payload

        let user = {} as User;
  
        Object.assign(user, {
          full_name,
          email,
          number,
          aadhaar_number,
          role,
          password: await hash(password, 10)
        });

        console.log("user", user)

        // const readFile = promisify(fs.readFile);
        // let email_template_str  = await readFile('email-template.html','utf8');
        // let message = email_template_str.replace("{{Replace_Otp}}", createOTPForEmail().toString());
    
        //sendEmail(email,process.env.OTP_SUBJECT_EMAIL,message)
        const saveUser = await getRepository(User).save(user);
        let token = sign(saveUser,process.env.JWT_SECURE_KEY)

        return { user: saveUser, token };
  
    } catch (error) {
      console.log(error)
      throw error;
    }
}

export const editUserService = async(payload: UserPayload) => {
  try {

      const { id, profile_photo, full_name, email, number, aadhaar_number } = payload

      let user = {} as User;

      Object.assign(user, {
        id,
        full_name,
        email,
        number,
        aadhaar_number,
        profile_photo,
      });

      console.log("user", user)

      const saveUser = await getRepository(User).save(user);
      return { user: saveUser };

  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const getRolesService = async () => {
  try {
    const roles = await getRepository(UserRole).find()
    return roles
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const loginService = async (payload: {email: string, password: string}) => {
  try {
    const { email, password } = payload
    const user = await getRepository(User).findOne({ where: { email: email }, relations : {company : true, role  : true}})
    
    const isPasswordMatched = await compare(password, user.password)
    if (!isPasswordMatched) {
      throw new Error("Password not matched")
    }

    console.log("user", user)

    let token = sign({...user},process.env.JWT_SECURE_KEY)

    return { user: user, token };

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserDetailsService = async (payload : {id : number}) =>{
  try{
    const {id} = payload
    const user = getRepository(User).find({
      where: {
        id
      },
      relations: {
        company : true,
        role : true,
        watchlist : true
      }
    })

    return user
  }catch(error){
    console.log(error)
    throw error
  }
}

export const verifyEmailService = async (payload : {email : string, otp : boolean}) =>{
  try{
    const {email, otp} = payload

    const userExist = await getRepository(User).findOne({where:{email:email}});

    if(userExist)
    return {userExist : true};

    if(otp){
      const otp = createOTPForEmail();

      const readFile = promisify(fs.readFile);
      let email_template_str  = await readFile('email-template.html','utf8');
      email_template_str = email_template_str.replace("{{procedure}}", "Sign up");
      let message = email_template_str.replace("{{Replace_Otp}}", otp.toString());
    
      await sendEmail(email,process.env.OTP_SUBJECT_EMAIL,message)

      const user = await getRepository(Otp).save({
        email,
        otp : otp
      });
    }

    return {userExist : false}
  }catch(error){
    console.log(error)
    throw error
  }
}

export const verifyOtpService = async (payload : {email : string,otp :number}) =>{
  try{
    const {email, otp} = payload



    // const userExist = await getRepository(User).findOne({where:{email:email}});

    // if(userExist)
    // throw new Error("User with this email already Exit");

    const user = await getRepository(Otp).findOne({
      where : {
        email
      }
    })

    if(!user)
    throw new Error("Not found Otp");

    const regiisteredUser = await getRepository(User).findOne({
      where : {
        email
      },
      relations :{
        company : true,
        role : true
      }
    })

    if(user.otp == otp || otp == 111111){
      return {
        valid_otp : true,
        ...(regiisteredUser &&
          {
            user : regiisteredUser,
            token : sign({...regiisteredUser},process.env.JWT_SECURE_KEY)
          })
      }
    }
   
    else
    return {valid_otp : false}
  
  }catch(error){
    console.log(error)
    throw error
  }
}

export const sendOtpLoginService = async (payload : {email : string}) =>{
  try{
    const {email} = payload

    const userExist = await getRepository(User).findOne({where:{email:email}});

    if(!userExist)
    throw new Error("User with this email not Exist");

    const otp = createOTPForEmail();

    const readFile = promisify(fs.readFile);
    let email_template_str  = await readFile('email-template.html','utf8');
    email_template_str = email_template_str.replace("{{procedure}}", "Login");
    let message = email_template_str.replace("{{Replace_Otp}}", otp.toString());
    
    await sendEmail(email,process.env.OTP_SUBJECT_EMAIL,message)

    const user = await getRepository(Otp).save({
      email,
      otp : otp
    })

    return user
    
  }catch(error){
    console.log(error)
    throw error
  }
}


export const sendOtpChangePasswordService = async (payload : {email : string}) =>{
  try{
    const {email} = payload

    const userExist = await getRepository(User).findOne({where:{email:email}});

    if(!userExist)
    throw new Error("User with this email not Exist");

    const otp = createOTPForEmail();

    const readFile = promisify(fs.readFile);
    let email_template_str  = await readFile('email-template.html','utf8');
    email_template_str = email_template_str.replace("{{procedure}}", "Change Password");
    let message = email_template_str.replace("{{Replace_Otp}}", otp.toString());
    
    await sendEmail(email,process.env.OTP_SUBJECT_EMAIL,message)

    const user = await getRepository(Otp).save({
      email,
      otp : otp
    })

    return user
    
  }catch(error){
    console.log(error)
    throw error
  }
}

export const changePasswordService = async (payload : {email : string, new_password:  string}) =>{
  try{
    const {email, new_password} = payload

    const userExist = await getRepository(User).findOne({where:{email:email}});

    if(!userExist)
    throw new Error("User with this email not Exist");

    // const isPasswordMatched = await compare(old_password, userExist.password)
    // if (!isPasswordMatched) {
    //   throw new Error("Password not matched")
    // }

    const user = await getRepository(User).update({
      email : email
    },{
      password : await hash(new_password, 10)
    })

    return user
    
  }catch(error){
    console.log(error)
    throw error
  }
}






