var express = require('express');
var router = express.Router();

var aws = require("aws-sdk");
require('dotenv').config();

router.post('/send', function(req, res) {
    // Provide the full path to your config.json file. 
    aws.config.update({
        accessKeyId: process.env.accessKeyId, 
        secretAccessKey: process.env.secretAccessKey, 
        region: process.env.region
    });

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const sender = req.body["from"];

    // Replace recipient@example.com with a "To" address. If your account 
    // is still in the sandbox, this address must be verified.
    const recipient = req.body["to"];

    // Specify a configuration set. If you do not want to use a configuration
    // set, comment the following variable, and the 
    // ConfigurationSetName : configuration_set argument below.
    //const configuration_set = "ConfigSet";

    // The subject line for the email.
    const subject = req.body["subject"];

    // The email body for recipients with non-HTML email clients.
    const body_text = req.body["body"];
                
    // The HTML body of the email.
    const body_html = req.body["body"];

    // The character encoding for the email.
    const charset = "UTF-8";

    // Create a new SES object. 
    var ses = new aws.SES();

    // Specify the parameters to pass to the API.
    var params = { 
    Source: sender, 
    Destination: { 
        ToAddresses: [
        recipient 
        ],
    },
    Message: {
        Subject: {
        Data: subject,
        Charset: charset
        },
        Body: {
        Text: {
            Data: body_text,
            Charset: charset 
        },
        Html: {
            Data: body_html,
            Charset: charset
        }
        }
    }//,
    //ConfigurationSetName: configuration_set
    };

    //Try to send the email.
    ses.sendEmail(params, function(err, data) {
    // If something goes wrong, print an error message.
    if(err) {
        console.log(err.message);
        res.send(err);
    } else {
        console.log("Email sent! Message ID: ", data.MessageId);
        res.send("Email sent! Message ID: ", data.MessageId);
    }


    });
});

module.exports = router;