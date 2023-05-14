const File = require('../models/File')
const fs = require('fs')
const sendMail = require('../services/mailService')
const {htmlWrapper} = require('../services/emailTemplate')


const uploadFile = async (req, res) => {
    //console.log(req.file)
    try {
        const file = await File.create({
            filePath: req.file?.path,
            originalname: req.file?.originalname,
            filename: req.file?.filename,
            size: req.file?.size
        })

        if (file) {
            res.status(200).json({
                fileUrl: `${process.env.BASE_URL}/download/${file._id}`, 
                fileId: file._id
            })
        } else {
            res.status(400)
            throw new Error("Unable to upload file")
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

const send = async (req, res) => {
    const {emailFrom, emailTo, message, id} = req.body;

    try {
        if(!emailTo || !emailFrom || !id){
            res.status(400)
            throw new Error("Field can't be empty")
        }

        // Get file by current file id
        const file = await File.findOne({_id: id})

        if (file.sender) {
            res.status(400)
            throw new Error("Email already sent once")
        }
        
        file.sender = emailFrom
        file.receiver = emailTo
        file.message = message

        const savedFile = await file.save()

        //Send Email
        sendMail(
            emailTo,
            emailFrom,
            "Send-IT: FileShare",
            `${emailFrom} sent a file to you`,
            htmlWrapper(
                emailFrom,
                `${process.env.BASE_URL}/download/${file._id}`,
                parseInt(file.size / 100) + 'KB',
                `${process.env.BASE_URL}`,
                message
            )
        ).then(()=>{
            return res.status(200).send("File has been sent to your mail")
        }).catch((err)=>{
            return res.status(500).send("An error occurred whule sending the email")
        })
        
    }catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

const sendFile = async (req, res) => {
    return
}

const getFileById = async (req, res)=>{
    try{
        const file = await File.findById({_id: req.params.id})
        if(file){
            res.status(200).json(file.filename)
        }else{
            res.status(400)
            throw new Error("File Not Found on this Server")
        }
    }catch(error){
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

const downloadFile = async (req, res) => {
    try{
        const file = await File.findOne({_id: req.params.id})

        if (!file) {
            res.status(400)
            throw new Error("Expired link file")
        }

        const filePath = `${__dirname}/../public/uploads/${file.filename}`;

        if(filePath){
            res.download(filePath)
        }else{
            res.status(400)
            throw new Error("Unable to download file")
        }
    }catch(err){
        res.status(400).send(err.messgae)
    }
}


const testEmail = async (req, res)=>{
    try {
        const {emailFrom, emailTo, subject, text, message} = req.body;
        sendMail(
            emailTo,
            emailFrom,
            "Send-IT: FileShare",
            `${emailFrom} sent a file to you`,            
            htmlWrapper(
                emailFrom,
                `${process.env.BASE_URL}/download/`,
                100 + 'KB',
                `${process.env.BASE_URL}`,
                message
            )
        ).then(()=>{
            return res.json({success: true})
        }).catch((err)=>{
            return res.status(500).send("An error occurred whule sending the email")
        })       
        
    } catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    uploadFile,
    send,
    sendFile,
    getFileById,
    downloadFile,
    testEmail 
}   