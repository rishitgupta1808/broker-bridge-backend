import AWS from "aws-sdk";
import fs from "fs";

export class  AWSService {
  private S3: AWS.S3;

  constructor() {
    try {
      this.S3 = new AWS.S3()
    } catch (error) {
      console.error('Error initializing S3 client:', error);
      throw {success: false, err : error}
    }
  }

  async uploadFileGetKey(file: any): Promise<string> {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: "public/"+ file.filename,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype,
        };

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION, // Change this to your desired AWS region
          });
        const data = await s3.upload(params).promise();
        console.log('File uploaded to S3:213123', data);

        return data.Location
    } catch (error) {
        console.log("ytfgftygfty",error)
        console.log(error)
        throw error
    }
}
}

