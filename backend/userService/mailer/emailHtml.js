import { host, port } from "../index.js"

export const emailHtml=(token)=>{
 return `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" 
    style="font-family: 'Open Sans', sans-serif; border-collapse: collapse;">
 
     <tr>
         <td align="center">
             <table style="background-color: #f2f3f8; max-width:670px; width:100%; margin:0 auto;" border="0" cellpadding="0" cellspacing="0">
                 <tr>
                     <td style="height:50px;">&nbsp;</td>
                 </tr>
 
                 <tr>
                     <td style="height:20px;">&nbsp;</td>
                 </tr>
                 <tr>
                     <td>
                         <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                             style="max-width:670px; background:#fff; border-radius:5px; text-align:center;
                             box-shadow:0 6px 18px 0 rgba(0,0,0,.06); padding:20px;">
                             <tr>
                                 <td>
                                     <h1 style="color:#1e1e2d; font-weight:500; margin:0; font-size:28px;">Get Started</h1>
                                     <p style="font-size:15px; color:#455056; margin:10px 0; line-height:22px;">
                                         Your account has been created on the AMIT eCommerce. <br/>
                                         <br/>
                                          
                                     </p>
                                     <hr style="border: 0; border-top: 1px solid #cecece; width: 100px; margin: 20px auto;">
                                     <p style="color:#455056; font-size:16px; margin:10px 0; font-weight: 500;">
                                          
                                          
                                     </p>
                                     <p style="color:#455056; font-size:16px; margin:10px 0; font-weight: 500;">
                                          
                                         
                                     </p>
                                     <a target="_blank" href="http://localhost:${port}/verify/${token}" 
                                         style="background:#20e277; text-decoration:none; display:inline-block; font-weight:500; 
                                         margin-top:24px; color:#fff; text-transform:uppercase; font-size:14px; padding:12px 30px;
                                         border-radius:30px;">
                                         Confirm Account
                                     </a>
                                 </td>
                             </tr>
                         </table>
                     </td>
                 </tr>
                 <tr>
                     <td style="height:20px;">&nbsp;</td>
                 </tr>
 
                 <tr>
                     <td style="height:50px;">&nbsp;</td>
                 </tr>
             </table>
         </td>
     </tr>
 </table>`
}