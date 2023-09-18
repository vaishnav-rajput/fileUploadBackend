const File = require("../models/File")
const cloudinary = require("cloudinary").v2
//localfileupload -> handler function

exports.localFileUpload =  async (req, res) => {
    try {
        //fetch filefrom request
        const file = req.files.file;
        console.log("file", file)    

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("Path", path)

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err)
        })

        //create a successfull response
        res.json({
            success: true,
            message: "local file uploaded successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder}
    await cloudinary.uploader.upload(file.tempFilePath, options)
}

//image upload handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch 
        const {name, tags, email} = req.body
        console.log(name, tags, email)

        //file fetch
        const file = req.files.imageFile;
        console.log("imageUploadFile", file)

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
          return res.status(400).json({
            success: false,
            message: "file format not supported"
          })  
        }

        const response = await uploadFileToCloudinary(file, "fileupload")

        //entry in DB
        // const fileData = await File.create({
        //     name,
        //     tags, 
        //     email,
        //     imageUrl
        // })

        res.json({
            success: true,
            message: "image successfully uploaded"
        })

    } catch (error) {
            console.error(error)
        res.status(400).json({
            success: false,
            message: "something went wrong"
        })         
    }
}