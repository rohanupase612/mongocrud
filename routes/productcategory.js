let express = require("express");
let bodyparser = require("body-parser");
let fs = require("fs");
let Productcategory = require("../models/Productcategory");
let router = express.Router();

router.post("/save", async (req, res) => {
  try{
    let body = req.body;
    // console.log(body);
    let productcategory = new Productcategory();
    if(body.data.id != ""){``
      productcategory = await Productcategory.findById(body.data.id);
    }
      productcategory.name = body.data.name;
        productcategory.srno = body.data.srno;
        let base64image = body.data.image;
        if(base64image != "")
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            productcategory.imagepath = "productcategories/" + randomname + ".png";
            fs.writeFile("assets/" + productcategory.imagepath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }
        productcategory.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
      }
      catch{
        res.end(JSON.stringify({status:"failed", data:"Something Went Wrong"+err}));
      }
    
});

router.post("/list", async(req, res)=>{
  try{
  let body = req.body;
  let productcategories = await Productcategory.find();
  res.end(JSON.stringify({status: "Success", data: productcategories}))
}
catch{
  req.end(JSON.stringify({status: "failed", data: "Something Went Wrong"}))
}
});

router.post("/get", async(req, res)=>{
  try{
  let body = req.body;
  let productcategory = await Productcategory.findById(body.data.id);
  res.end(JSON.stringify({status: "Success", data: productcategory}));
}
catch{
  res.end(JSON.stringify({status: "Failed", data: "Something Went Wrong"}))
}
});

router.post("/delete", async(req, res)=>{
  try{
  let body = req.body;
  let productcategory = await Productcategory.findByIdAndDelete(body.data.id);
  res.end(JSON.stringify({status : "Success", data: productcategory}))
}
catch{
  res.end(JSON.stringify({status: "Failed", data: "Something Went Wrong"}))
}
});

module.exports = router;