// IMPORTING MODULES
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

// FUNCTION TO SEND EMAIL USING NODEMAILER AND MAILGEN
const sendMail = async function (options) {
  // Initializing mailgen with theme and product info
  const mailGenerator = new Mailgen({
    theme: 'neopolitan',
    product: {
      name: 'ProjectNest',
      link: 'http://projectnest.com',
    },
  });

  // Generating plain text email content from mailgen template
  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  // Generating HTML email content from mailgen template
  var emailHtml = mailGenerator.generate(options.mailGenContent);

  // Creating a transporter object using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // FALSE FOR NON-SECURE CONNECTION
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  // Defining the mail options
  const mail = {
    from: process.env.MAILTRAP_SMTP_SENDEREMAIL, 
    to: options.email, 
    subject: options.subject, 
    text: emailText, 
    html: emailHtml,
  };

  // Sending the email using the transporter object
  try {
    await transporter.sendMail(mail);
    console.log('✅ EMAIL SENT SUCCESSFULLY! ✉️');
  } catch (error) {
    console.error('❌ FAILED TO SEND EMAIL! ⚠️ ERROR:', error);
  }
};

// FUNCTION TO GENERATE EMAIL VERIFICATION TEMPLATE CONTENT
function emailVerificationMailGenContent(userName, verificationUrl) {
  return {
    body: {
      name: userName,
      intro: "WELCOME TO PROJECTNEST! WE'RE THRILLED TO HAVE YOU WITH US.",
      action: {
        instructions:
          'TO COMPLETE YOUR REGISTRATION AND GET STARTED WITH PROJECTNEST, PLEASE VERIFY YOUR EMAIL ADDRESS BY CLICKING THE BUTTON BELOW:',
        button: {
          color: '#22BC66',
          text: 'VERIFY YOUR EMAIL',
          link: verificationUrl,
        },
      },
      outro:
        "IF YOU HAVE ANY QUESTIONS OR NEED ASSISTANCE, FEEL FREE TO REPLY TO THIS EMAIL—WE'RE HERE TO HELP!",
    },
  };
}

// FUNCTION TO GENERATE FORGOT PASSWORD TEMPLATE CONTENT
function forgotPasswordMailGenContent(userName, resetPasswordUrl) {
  return {
    body: {
      name: userName,
      intro:
        'WE RECEIVED A REQUEST TO RESET YOUR PASSWORD FOR YOUR PROJECTNEST ACCOUNT.',
      action: {
        instructions:
          "CLICK THE BUTTON BELOW TO RESET YOUR PASSWORD. IF YOU DIDN'T REQUEST A PASSWORD RESET, YOU CAN SAFELY IGNORE THIS EMAIL:",
        button: {
          color: '#DC3545', // OPTIONAL: RED-THEMED FOR WARNING/RESET ACTION
          text: 'RESET YOUR PASSWORD',
          link: resetPasswordUrl,
        },
      },
      outro:
        'IF YOU HAVE ANY QUESTIONS OR NEED HELP, JUST REPLY TO THIS EMAIL—WE’RE HAPPY TO ASSIST YOU.',
    },
  };
}

// EXPORTING FUNCTIONS
