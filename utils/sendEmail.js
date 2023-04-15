import nodeMailer from "nodemailer";

const Email = (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        };
    });
};

const emailSender = ({ name, email, MobileNumber, message }) => {
    const options = {
        from: `${name}`,
        to: `${email}`,
        subject: "New Contact Form Entry",
        html: `
      <div>
        <p>name:${name}</p>
        <p>email:${email}</p>
        <p>MobileNumber:${MobileNumber}</p>
        <p>Message:${message}</p>
        </div>
      `,
    };
    Email(options);

};

export default emailSender;