import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

export async function sendVerificationEmailNodeMailer(
  email,
  username,
  verifyCode
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address from env
        pass: process.env.GMAIL_PASS, // App-specific password from env
      },
    });
    //   console.log(' done ye chal gya')
    // Set up email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to: email, // Receiver's email address
      subject: "VoteGov otp", // Email subject
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
          <style>
              * {
                  box-sizing: border-box;
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
              }
      
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
              }
      
              p {
                  line-height: inherit
              }
      
              .desktop_hide,
              .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
              }
      
              .image_block img+div {
                  display: none;
              }
      
              sup,
              sub {
                  line-height: 0;
                  font-size: 75%;
              }
      
              @media (max-width:660px) {
                  .desktop_hide table.icons-inner {
                      display: inline-block !important;
                  }
      
                  .icons-inner {
                      text-align: center;
                  }
      
                  .icons-inner td {
                      margin: 0 auto;
                  }
      
                  .mobile_hide {
                      display: none;
                  }
      
                  .row-content {
                      width: 100% !important;
                  }
      
                  .stack .column {
                      width: 100%;
                      display: block;
                  }
      
                  .mobile_hide {
                      min-height: 0;
                      max-height: 0;
                      max-width: 0;
                      overflow: hidden;
                      font-size: 0px;
                  }
      
                  .desktop_hide,
                  .desktop_hide table {
                      display: table !important;
                      max-height: none !important;
                  }
              }
          </style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
      </head>
      
      <body class="body" style="background-color: #e3e3e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e3e3e3;">
              <tbody>
                  <tr>
                      <td>
                          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                      <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1526/ED_BG_shadow.png'); background-position: top center; background-repeat: no-repeat;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <div class="spacer_block block-1" style="height:100px;line-height:100px;font-size:1px;">&#8202;</div>
                                                          <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                      <div style="color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:26px;line-height:120%;text-align:center;mso-line-height-alt:31.2px;">
                                                                          <p style="margin: 0;"><span style="word-break: break-word; color: #ffffff;">Hey ${username}</span></p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:45px;">
                                                                      <div style="color:#ffdd15;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;line-height:120%;text-align:center;mso-line-height-alt:28.799999999999997px;">
                                                                          <p style="margin: 0; word-break: break-word;">This OTP is valid for the next 10 minutes.</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                      <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Thank you for registering with VoteGov! To ensure the security of your account, please verify your email address by entering the One-Time Password (OTP) provided below.</span></p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <div class="spacer_block block-5" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
                                                          <table class="button_block block-6" width="100%" border="0" cellpadding="55" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center"><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;width:145px;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#ffdd15">
      <w:anchorlock/>
      <v:textbox inset="0px,0px,0px,0px">
      <center dir="false" style="color:#3e74c5;font-family:Arial, sans-serif;font-size:20px">
      <![endif]--><a href="#" target="_blank" style="background-color:#ffdd15;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#3e74c5;display:inline-block;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 20px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 40px;">${verifyCode}</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="image_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;">
                                                                      <div class="alignment" align="center" style="line-height:10px">
                                                                          <div style="max-width: 512px;"><img src="https://cba7b50bb4.imgdist.com/pub/bfra/ja5o8qhr/1dc/iwk/796/vote.png" style="display: block; height: auto; border: 0; width: 100%;" width="512" height="auto"></div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <div class="spacer_block block-8" style="height:100px;line-height:100px;font-size:1px;">&#8202;</div>
                                                          <div class="spacer_block block-9" style="height:76px;line-height:76px;font-size:1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div style="color:#C0C0C0;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                          <p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #000000;">If you have any questions or need assistance, feel free to contact our support team at votegovelection@gmail.com</span></p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <div class="spacer_block block-2" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
                                                              <tr>
                                                                  <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                      <!--[if !vml]><!-->
                                                                      <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                                                          <tr>
                                                                              <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                                              <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table><!-- End -->
      </body>
      
      </html>`,
    };
    //   console.log('ho gya done ye chal gya')
    // Send the email
    await transporter.sendMail(mailOptions);
    //   console.log('finally')
    return { success: true, message: "Verification email send successfully" };
  } catch (err) {
    console.error("Error in sending verification email");
    return { success: false, message: "Error in sending verification email", error:err};
  }
}
