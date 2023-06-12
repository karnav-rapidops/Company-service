module.exports = function makeSendEmail({
    nodemailer,
}){
    return async function sendEmail({ cname, email, empname })
    {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, 
            auth: {
              user: 'karnavgamit@gmail.com', 
              pass: 'chcvpetsrwfpqszp', // app password of mail
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'karnavgamit@gmail.com', 
            to: email, 
            subject: "Employee Registered!", // Subject line
            text: `Hello ${cname}!\n${empname} has been registered at your company!`, 
          });
        
          console.log(`Email sent to email: ${email}`);
        
    }
}