import axios from 'axios';

export const sendEmail = async (receiver: string, subject: string, body: string): Promise<void> => {
  const data = JSON.stringify({
    "From": process.env.POSTMARK_SENDER_EMAIL,
    "To": receiver,
    "Subject": subject,
    "HtmlBody": body,
    "MessageStream": "outbound"
  });

  const config = {
    method: 'post',
    url: 'https://api.postmarkapp.com/email',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'X-Postmark-Server-Token': process.env.POST_MARK_API_TOKEN || ''
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw error
  }
}
