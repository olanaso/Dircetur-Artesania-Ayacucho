const {Router} = require('express');
const router = Router();
var nodemailer = require('nodemailer');

router.post('/web/sendemail',async (req,res)=>{
  var transport = nodemailer.createTransport({
      
     
 
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
      // user: "noreply@cbiologosayacucho.org.pe", //generated by Mailtrap
    //pass: "d[aN9gIXM(Y8" //generated by Mailtrap
    user: "clever.max159@gmail.com", //generated by Mailtrap
    pass: "uabs ekla pnef muvg" //generated by Mailtrap
  },

});

var mailOptions = {
        from:req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.email_html
      };

      transport.sendMail(mailOptions, function(error, info){
        if (error) {
           var correcto={result:false}
           res.status(500).json(error);
          
            
        } 
        else {
          console.log('Email sent: ' + info.response);
           var correcto={result:true}
            res.status(200).json(correcto);
        }
      });




    })


module.exports=router;