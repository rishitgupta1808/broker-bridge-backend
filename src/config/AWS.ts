import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials
const ConfigureAWSCredentials = () =>{
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION, // Change this to your desired AWS region
  });  
}

export { AWS, ConfigureAWSCredentials }