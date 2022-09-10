
import Forgot from '../../models.js/forgot'
const nodemailer = require('nodemailer');
export default function handler(req, res) {
     if(req.body.sendMail){



        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'qazimaaadczsajjad1@gmail.com',
                pass: '2asdcadsa'
            }
        });
        
        let mailOptions = {
            from: 'qazimaazsajjad1@gmail.com',
            to: 'receivers.email@domain.example',
            subject: 'Test',
            text: 'Hello World!'
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });

      res.status(200).json({success:true})}
      else{

      }
    }