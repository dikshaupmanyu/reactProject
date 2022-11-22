const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users = require("../model/usersSchema");
const registerS = require("../model/registerSchema");
const categoryS = require("../model/categorySchema");
const SubCategory = require("../model/SubcategoryS");
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


// ////////////////////////////////////    START PRODUCT       ////////////////////////////////////////////////////////////
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

router.get("/product/:id",async(req,res)=>{

    let result = await users.findById({_id:req.params.id});
    console.log(result)
    if(result){
        res.send(result)
    }else{
        res.send({"message":"No Record Found"})
    }

})


router.patch("/product/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const date = moment(new Date()).format("YYYY-MM-DD");
        // const {fname,description} = req.body;

        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    }catch (error){
        res.status(422).json(error);
    }
})

// //////////////////////////      END PRODUCT   //////////



// //////////////////////     START CATEGORT  //////////////
// user Category
router.post("/category",async(req,res)=>{

    const {fname,status} = req.body;

    if(!fname || !status){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    try {

        const date = moment(new Date()).format("YYYY-MM-DD");

        const Cdata = new categoryS({
            fname:fname,
            status:status,
            date:date
        });

        const finaldata = await Cdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.send({"message":"No Record Found"})
    }
});


// category data get
router.get("/categoryData",async(req,res)=>{
    try {
        const getCat = await categoryS.find();
        
        res.status(201).json({status:201,getCat})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

// delete Category data
router.delete("/category/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await categoryS.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


// Edit Category data
router.get("/editCategory/:id",async(req,res)=>{

    let result = await categoryS.findById({_id:req.params.id});

    if(result){
        res.send(result)
    }else{
        res.send({"message":"No Record Found"})
    }
 
})

router.patch("/editCategory/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const date = moment(new Date()).format("YYYY-MM-DD");
        const {fname,status} = req.body;

        const updateuser = await categoryS.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    }catch (error){
        res.status(422).json(error);
    }
})

// ///////////////////  END CATEGORY /////////////////

// //////////////////   START SUBCATEGORY /////////////////

// user Category

router.post("/subCategory",async(req,res)=>{

    const {category, sname, c_id} = req.body;

    if(!category || !sname){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    try {

        const date = moment(new Date()).format("YYYY-MM-DD");
        const status = "0";
        const SCdata = new SubCategory({
            category:category,
            sname:sname,
            status:status,
            c_id:c_id,
            date:date
        });

        const finaldata = await SCdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        // res.status(401).json({status:401,error})
    }
});

// category data get
router.get("/subcategoryData",async(req,res)=>{
    try {
        const getSubcat = await SubCategory.find();
        
        res.status(201).json({status:201,getSubcat})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// Edit Category data
router.get("/editSubCategory/:id",async(req,res)=>{

    let result = await SubCategory.findById({_id:req.params.id});

    if(result){
        res.send(result)
    }else{
        res.send({"message":"No Record Found"})
    }
 
});


router.patch("/editSubCategory/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const date = moment(new Date()).format("YYYY-MM-DD");
        const {fname,status} = req.body;

        const updateuser = await SubCategory.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
    }catch (error){
        res.status(422).json(error);
    }
});

// delete Category data
router.delete("/Subcategory/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await SubCategory.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


// ///////////////////   END SUBCATEGORY /////////////////
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




module.exports = router;
