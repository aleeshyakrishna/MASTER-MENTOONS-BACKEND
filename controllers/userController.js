var userHelper = require('../helpers/userHelper')


module.exports= {
    gertHome : (req,res) =>{
        try {
            
            console.log("welcome home");
            res.status(200).json({message:"success"})
        } catch (error) {
            
        }
        
    },
    signup:async(req,res)=>{
        try {
            
            await userHelper.userSignup(req.body).then((data)=>{
                if (data.Exist) {
                    res.json({message:' already registered!!'});
                }else if (data.usercreated) {
                    const UserData=data.usercreated
                    console.log(UserData,'registered');
                    res.json({status:true,message:"User registerd",UserData})
                } else {
                    res.json({status:false,UserData})
                }
            }).catch((error)=>{
                res.json(400).json({message:"something went wrong!!"})
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    userLogin:async(req,res)=>{
        try {
            console.log(req.body,"this is form data..");
            const response = await userHelper.forlogin(req.body);
            console.log(response,"this is response....");
            if (response.login && response.userExist) {
                const userData=response.userExist
                const userId = response.userExist._id;
                const username = response.userExist.username;

                const Token = await userHelper.createToken(userId.toString(), username);
                console.log(Token);
                res.json({message:"user successfully logedIn",status:true,userData,Token});
            } else {
                res.json({status:false})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getProduct:async(req,res)=>{
        try {
            console.log("get products..");
            const result = await userHelper.getAllProducts()
            if( result.products.length > 0){
                var prod= result.products;
                res.status(200).json({message:"get all products",prod})
            }else{
                res.json({message:"NO AVAILABLE PRODUCTS NOW!"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getOneProd:async(req,res)=>{
        try {
            
            console.log("productId",req.params.id);
             await userHelper.getOneProduct(req.params.id).then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!"})
                }else{
                    if(data.success){
                        res.json({data,message:"success!!"})
                    }else{
                        res.json({message:"something went wrong!!"})
                    }
                }
             })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error!!"})
        }

    },
    getAllCategory:async(req,res)=>{
        try {
            
            await userHelper.allCategory().then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!!"})
                }else{
                    if(data.success){
                        var cate = data.allCategory
                        res.json({message:"success",cate})
                    }else{
                        res.json({message:"no categories available..sorry for the inconvenience!!"})
                    }
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getOneCategory:async(req,res)=>{
        try {
            await userHelper.getOneCategory(req.params.id).then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!!"})

                }else{
                    if(data.success){
                        var cate = data.categoryData
                        res.json({message:"success",cate})
                    }else{
                        res.json({message:"no category availbale !!"})
                    }
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    addToCart : async (req,res)=>{
        try {
            const response = await userHelper.addToCart(req.body)
            if(response.error){
                const msg = response.message
                res.status(500).json({msg})
            }
            if(!response.success){
                const msg = response.message
                res.status(401).json({msg})
            }else{
                const msg = response.message
                res.status(200).json({msg})
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({message:" internal error occured! "})
        }
    },
    RemoveCart:async(req,res)=>{
        try {
            console.log(req.body,"ooooooooooooo");
            const response = await userHelper.removeFromCart(req.body)
            if(response.error){
                const msg= response.message
                res.status(401).json({msg})
            }
            if(!response.success){
                const msg= response.message
                res.status(401).json({msg})
            }else{
                const msg= response.message
                res.status(200).json({msg})
            }
        } catch (error) {
            console.log(error);
            res.json({message:"internal error occured!!"})
        }
    },
    getCart:async(req,res)=>{
        try {          
            const response = await userHelper.getCart(req.params.userId)
            if(response.error){
                const msg = response.message
                res.status(500).json({msg})
            }
            if(response.success){
                const cart = response.cart
                res.status(200).json({cart})
            }else{
                const msg= response.message;
                res.status(401).json({msg})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    writeUs:async(req,res)=>{
        try {
            console.log(req.body,"------>");
            const response = await userHelper.storeMsg(req.body)
            res.status(200).json({message:"success.."})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    hireMe:async(req,res)=>{
        try {
            console.log(req.body,">>>>>>>>>>>>>");
            
        } catch (error) {
            res.status(500).json({message:"internal error occured!!"})
        }
    }

}