import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(`${process.env.API_SECRET_SENDGRID}`);
export {sgMail}