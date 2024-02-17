import { getRepository } from "typeorm";
import { User } from "../../entity/user";
import { UserPayload } from "./user.interface";
import { UserRole } from "../../entity/user_role";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

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

        // const readFile = util.promisify(fs.readFile);
        // let email_template_str  = await readFile('email-template.html','utf8');
        // let message = email_template_str.replace("{{Replace_Otp}}", createOTPForEmail().toString());
    
        // sendEmail(email,process.env.OTP_SUBJECT_EMAIL,message)
        const saveUser = await getRepository(User).save(user);
        let token = sign(saveUser,process.env.JWT_SECURE_KEY)

        return { user: saveUser, token };
  
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
    const user = await getRepository(User).findOne({ where: { email: email }})
    
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
