var adminHelper = require("../helpers/adminHelper");

const adminCredential = {
  name: "MENTOONS ADMIN PANEL",
  email: "admin@gmail.com",
  password: "mentoons123",
};

module.exports = {
  postLogin: async (req, res) => {
    try {
      console.log("Received login request:", req.body);
    
      if (
        req.body.email == adminCredential.email &&
        req.body.password == adminCredential.password
      ){
       
        res.status(200).json({message:"success"})
      }else{
       
        res.status(401).json({message:"invalid password/email"})
      }


    //   if (isValidCredentials) {
    //     res.status(200).json({ message: "Login successful" });
    //   } else {
    //     res.status(401).json({ message: "Invalid credentials" });
    //   }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  postCategory :async(req,res)=>{
    console.log("welcome to add category!!");
    try {
       
        adminHelper.addCategory(req.body).then(()=>{
            res.status(200).json({message:"successfully added"})     
        })
        // if already exist ----------->>
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }

  },
  postAgeCategory:async(req,res)=>{
    console.log("welcome to add category!!");
    try {
       console.log(req.body,"this is the bodyyyyyyy");
        adminHelper.addAgeCategory(req.body).then(()=>{
            res.status(200).json({message:"successfully added"})     
        })
        // if already exist ----------->>
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }

  },

  postProduct:async(req,res)=>{

     await adminHelper.addProduct(req.body,req.file.originalname).then((data)=>{
      res.status(200).json({message:"product added to the DATABASE successfully!"})
    }).catch((error)=>{
      res.status(404).json({message:"something went wrong!!"})
    })

  },
  addOpening:async(req,res)=>{
    try {
      console.log(req.body,"formdaaaaaaaaa");
      console.log(req.file.originalname,"......image");
      const response = await adminHelper.postJob(req.body,req.file.originalname)
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"internal error occured!"})
    }
  }


  


};
