const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const fs = require('fs')

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb)=>{
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    // Allowed Extensions
    let filesTypes = /jpeg|jpg|png|gif/;
    //check extension
    const extName = filesTypes.test(path.extname(file.originalname).toLowerCase())
    // Mime type
    const mimetype = filesTypes.test(file.mimetype)

    if(mimetype && extName){
        return cb(null, true)
    }else{
        cb('Error: Images Only')
    }
}

let upload = multer({storage: storage, 
                    limits: {fileSize: 1000000},
                    fileFilter: function(req,file,cb){
                        checkFileType(file, cb)
                    }}).single('avatar')


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
    });

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.send('index');
})

app.get('/images', (req,res)=>{
    fs.readdir('./public/uploads', (err, files)=>{
        if(err) throw(err)
        res.json(files);
    })
})

app.get('/images/remove', (req, res)=>{
    let fileToRemove = "public/uploads/" + req.query.file;
    fs.unlink(fileToRemove, err=>{
        if(err) throw(err)

         res.redirect('/');
    })
})

app.post('/upload/', (req,res)=>{
    upload(req,res, err=>{
        if(err) return res.end(err);

        if(req.file == undefined){
            return res.send('Error: No file selected');
        }
        res.redirect('/');
    })
     
})

app.listen(3000, () => {
    console.log(`Server is LIVE`);
});