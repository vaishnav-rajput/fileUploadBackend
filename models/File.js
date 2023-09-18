const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    imageUrl: {
        type: String,
        
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }



})

//post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("doc", doc)

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        //send mail 
        let info = await transporter.sendMail({
            from: `codehelp - by vaishnav`,
            to:doc.email, 
            subject: "New file uploaded on cloudinary",
            html:`<h2>Hello your file is uploaded </h2> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> `
        })
        console.log("info", info)
    } catch (error) {
        console.error(error)
    }
})

const File = mongoose.model("File", fileSchema)
module.exports = File; 