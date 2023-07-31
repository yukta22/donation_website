import nodemailer from "nodemailer";
export const sendMail = (data) => {
  console.log(data);
  const transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 465,
    secure: true,
    auth: {
      user: "testphp@mailtest.radixweb.net",
      pass: "Radix@web#8",
    },
  });

  const mailOptions = {
    from: "testdotnet@mailtest.radixweb.net",
    to: "yuktasaraiya@gmail.com",
    subject: "Here is your OTP By Yukta",
    text: `${data.otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("err", error.message);
    }
    console.log("Email Sent: " + info);
  });
};

export const sendEmailCredeantial = (data) => {
  console.log(data);
  const transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 465,
    secure: true,
    auth: {
      user: "testphp@mailtest.radixweb.net",
      pass: "Radix@web#8",
    },
  });

  const mailOptions = {
    from: "testdotnet@mailtest.radixweb.net",
    to: "yuktasaraiya@gmail.com",
    subject: "Here is your Id and Password By Yukta",
    text: `Id: ${data.id}, Password: ${data.password}`,
  };
  // transporter.sendEmailCredeantial(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log("err", error.message);
  //   }
  //   console.log("Email Sent: " + info);
  // });
};
