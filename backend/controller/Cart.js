const User = require('../models/User');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

exports.getcart=async(req,res,next)=>{
    try{
        var cartom = new Array();
        //console.log(req.user.cart);
        for(let idx=0;idx<req.user.cart.length;idx++) {
            let elem = req.user.cart[idx];
            var prod = await Product.findById(elem.item); 
            //console.log(prod); ]
            var cartitem ={id:elem._id,name:prod.name,imageurl:prod.imageUrl,price:prod.price,product:prod._id,qty:elem.qty,cis:prod.countInStock};
            //console.log(cartitem);
            cartom.push(cartitem);
        }
        //console.log(cartom);
        res.status(200).json(cartom);
    }
    catch(error){
        next(error);
    }
}

exports.updatecart = async(req,res,next) =>{
    try{
        const {cartitemid,qty}= req.body;
        const user = await User.findById(req.user._id);
        if(qty==0){
            user.cart.pull({_id:cartitemid});
        }
        else{
            for(var idx=0;idx<user.cart.length;idx++){
                if(user.cart[idx]._id==cartitemid){
                    user.cart[idx].qty=qty;
                }
            }
        }
        await user.save();
        res.status(201).json({
            success:true,
            data:"item updated cart",
        });
    }
    catch(error){
        next(error);
    }
}

exports.addtocart = async (req,res,next) =>{
    try {
        const {productid,qty}= req.body;
        const user = await User.findById(req.user._id);
        var found = false;
        for(var idx=0;idx<user.cart.length;idx++){
            if(user.cart[idx]._id==productid){
                found=true;
                user.cart[idx].qty+=Number(qty);
            }
        }
        if(!found){        
            user.cart.push({_id:productid,item:productid,qty});
        }
        await user.save();
        res.status(201).json({
            success:true,
            data:"item added to car",
        })
    } catch (error) {
        next(error);
    }
}