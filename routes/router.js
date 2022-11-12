const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users = require("../model/usersSchema");
const registerS = require("../model/registerSchema");
const moment = require("moment")

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});

// User REGISTRATION
router.post('/register', async (req, res) => {

    // const {filename} = req.file;

    const {name, email ,  password, Cpassword} = req.body;

    if(!name || !email  || !password || !Cpassword ){
        return res.status(400).json({error:"Plz fill all fields"});
    }

    try{
        // console.log("inside")
        const userExist = await registerS.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email alread exist"})
        };

        if(password !== Cpassword){
            return res.status(420).json({error:"Password and Confirm password are not matching."})
        };


        const user = new registerS({name, email, password, Cpassword});

        await  user.save();
  
        res.status(201).json({message:"message successful"});         

    }catch (err){
        console.log(err)
    }
})


// USER LOGIN

router.post('/signin', async (req, res) => {
    console.log(req.body)
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Plz fill  email and password"})
        }
        

        const userLogin = await registerS.findOne({email:email});
        const userPassword = await registerS.findOne({password:password});

        if(!userLogin || !userPassword){
            return res.status(422).json({error:"usererror"})
        }else{
            return res.status(420).json({message:"user sign successfully"})
        }
    } catch{
        console.log(err) 
    }
})

// user product
router.post("/product",upload.single("photo"),async(req,res)=>{

    const {filename} = req.file;

    const {fname,description} = req.body;

    if(!fname || !description || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    try {

        const date = moment(new Date()).format("YYYY-MM-DD");

        const userdata = new users({
            fname:fname,
            description:description,
            imgpath:filename,
            date:date
        });

        const finaldata = await userdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// delete user data
router.delete("/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await users.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


router.get("/product/:id",async(req,res)=>{

    let result = await users.findById({_id:req.params.id});

    if(result){
        res.send(result)
    }else{
        res.send({"message":"No Record Found"})
    }

})


router.put("/product/:id",async(req,res)=>{

    let result = await users.updateOne(
        {_id:req.params.id},
        {$set:req.body}
        );

        res.send(result)
})


module.exports = router;
