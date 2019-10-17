const dotenv = require('dotenv');
// var helper = require('sendgrid').mail;
// const async = require('async');
// function sendEmail(
//     parentCallback,
//     fromEmail,
//     toEmails,
//     subject,
//     textContent,
//     htmlContent
//   ) {
//     const errorEmails = [];
//     const successfulEmails = [];
// const sg = require('sendgrid')('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');
// async.parallel([
//       function(callback) {
//         // Add to emails
//         for (let i = 0; i < toEmails.length; i += 1) {
//           // Add from emails
//           const senderEmail = new helper.Email(fromEmail);
//           // Add to email
//           const toEmail = new helper.Email(toEmails[i]);
//           // HTML Content
//           const content = new helper.Content('text/html', htmlContent);
//           const mail = new helper.Mail(senderEmail, subject, toEmail, content);
//           var request = sg.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: mail.toJSON()
//           });
//           sg.API(request, function (error, response) {
//             console.log('SendGrid');
//             if (error) {
//               console.log('Error response received');
//             }
//             console.log(response.statusCode);
//             console.log(response.body);
//             console.log(response.headers);
//           });
//         }
//         // return
//         callback(null, true);
//       }
//     ], function(err, results) {
//       console.log('Done');
//     });
//     parentCallback(null,
//       {
//         successfulEmails: successfulEmails,
//         errorEmails: errorEmails,
//       }
//     );
// }
// module.exports = (router) => {
//   router.post('/api/send', function (req, res, next) {
//     async.parallel([
//       function (callback) {
//         sendEmail(
//           callback,
//           'adisamicheal20@gmail.com',
//           ['adisamicheal5@gmail.com'],
//           'Subject Line',
//           'Text Content',
//           '<p style="font-size: 32px;">Your Application have been recieved, wathchout this space</p>'
//         );
//       }
//     ], function(err, results) {
//       res.send({
//         success: true,
//         message: 'Emails sent',
//         successfulEmails: results[0].successfulEmails,
//         errorEmails: results[0].errorEmails,
//       });
//     });
//  });
// };

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'adisamicheal20',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);