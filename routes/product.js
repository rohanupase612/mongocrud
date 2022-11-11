let express = require("express");
let bodyparser = require("body-parser");
let fs = require("fs");
let Product = require("../models/Product");

let router = express.Router();

router.post("/save", async(req, res)=>{
    try{
        let body = req.body;
        let product = new Product();
        if(body.data.id != ""){
            product = await Product.findById(body.data.id);
        }
        product.pcid = body.data.pcid;
        product.name = body.data.name;
        product.description = body.data.description;
        product.specification = body.data.specification;
        product.mrp = body.data.mrp;
        product.price = body.data.price;
        product.varieties = body.data.varieties;
        product.instock = body.data.instock;
        product.isactive = body.data.isactive;
        let base64image = body.data.image;
        if(base64image != "")
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            product.imagepath = "products/" + randomname + ".png";
            fs.writeFile("assets/" + product.imagepath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }
        product.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

router.post("/list", async(req, res)=>{
  try{
  let body = req.body;
  let product = await Product.find();
  res.end(JSON.stringify({status: "Success", data: product}));
}
catch{
  res.end(JSON.stringify({status:"Failed", data:"Something Went Wrong"}))
}
});

router.post("/get", async(req, res)=>{
  try{
  let body = req.body;
  let product = await Product.findById(body.data.id);
  res.end(JSON.stringify({status: "Success", data:product}));
}
  catch{
    res.end(JSON.stringify({status: "Failed", data:"Something Went Wrong"}))
  }
});

router.post("/delete", async(req, res)=>{
  try{
  let body = req.body;
  let product = await Product.findByIdAndDelete(body.data.id);
  res.end(JSON.stringify({status: "Success", data: product}));
}
  catch{
    res.end(JSON.stringify({status: "Failed", data: "Something Went Wrong"}))
  }
})
module.exports = router;