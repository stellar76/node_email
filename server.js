'use strict'

let nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport('smtps://YOUR EMAIL:YOURPASSWORD@smtp.gmail.com'),
    express = require('express'),
    app = express(),
    appPort = 8080,
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let sendEmail = (rec, text, html) => {

    let mailOptions = {
        from: '"YOUR NAME ?" <YOUR EMAIL ADDRESS>', // sender address
        to: rec, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: text, // plaintext
        html: html // html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

}


app.post('/', (req, res, next) => {
    let rec = req.param('rec');
    let text = req.param('text');
    let html = req.param('html');
    console.log(rec, text, html);
    sendEmail(rec, text, html);
});

app.listen(appPort, () => {
    console.log('::: server listening on port: ' + appPort + ':::');
});
