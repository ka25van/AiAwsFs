const AWS = require('aws-sdk')
const fs = require('fs');

AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3({apiVersion: "******" })
const uploadToS3= (filePath, fileName)=>{

    const fileContent=fs.readFileSync(filePath);

    const body={
        Bucket:"********",
        Key:fileName,
        Body: fileContent,
        ContentType:"image/jpeg",
    };

    return s3.upload(body).promise()
};

module.exports= uploadToS3;