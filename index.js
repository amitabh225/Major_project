const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");

const listing=require("./model/listing.js");
const methodOverride=require("method-override");



app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));




main().
then(()=>{
    console.log("connection with db");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayzone");
  }

  //index route
  app.get("/listings",async(req,res)=>{
    
    let alllisting=await listing.find({});

    res.render("index.ejs",{alllisting});
        
  });
  //new route
  app.get("/listings/new",(req,res)=>{
    res.render("new.ejs");
  })
  //read route
  app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
  const list=await listing.findById(id);
  res.render("show.ejs",{list});
});

//create route
app.post("/listings",async(req,res)=>{
  let{title,description,image,price,location,country}= req.body;
  let newlistings=new listing(req.body);
await newlistings.save().then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.log(err);
})
console.log(req.body);

res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  const list=await listing.findById(id);
  res.render("edit.ejs",{list});
  
});
//update route
app.put("/listings/:id",async(req,res)=>{
  let{title,description,image,price,location,country}= req.body;
  let {id}=req.params;
  console.log(id);
  await listing.findByIdAndUpdate(id,req.body);
  res.redirect(`/listings/${id}`);        

   console.log(req.body);
  //    res.send("all done");

  
});
app.delete("/listings/:id",async(req,res)=>{
  let{id}=req.params;
 await listing.findByIdAndDelete(id);
  res.redirect("/listings");
  console.log(id);


});

let port=3000;
app.listen(port,()=>{
    console.log("this is done");

});
app.get("/",(req,res)=>{
    res.send("successfull");
});