 
import nodemailer from "nodemailer"
import { emailHtml } from "./emailHtml.js";
import jwt from "jsonwebtoken"
import { secret_key } from "../index.js";
 
export const sendConfirmEmail=async(sender,appPass,reciever)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: sender,
          pass: appPass,
        },
      });

      jwt.sign({reciever},secret_key,async(err,token)=>{
        var message = {
            from: sender,
            to: reciever,
            subject: "Confirm Email",
            text: "Plaintext version of the message",
            html: emailHtml(token),
          };
 
        const info = await transporter.sendMail(message)
      })

    
}

  
 