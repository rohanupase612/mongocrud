let mongoose = require("mongoose");
let express = require("express");
let bodyparser = require("body-parser");

let app = express();
app.use(express.static("assets"));
app.use(express.json());
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));

app.get("/", function(req, res){
          res.send("Welcome to Ecom");
          res.end();
});

app.use((req, res, next)=>{
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "*");
          if(req.method == "OPTIONS")
          {
              res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
              return res.status(200).json({});
          }
          next();
      });

      mongoose.connect("mongodb://localhost:27017/ecommerceproject2022");
let db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));



app.use("/admin", require("./routes/admin"));
app.use("/product", require("./routes/product"))
app.use("/productcategory", require("./routes/productcategory"));


app.listen(8081, function(){
          console.log("🚀 http://localhost:8081/");
});