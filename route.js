
var express = require('express');
var ZtFunctions = require('./html-handler');
var bodyParser = require('body-parser')
var cors = require('cors');
var router = express.Router();
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/zhongtong/submit-enquiry',(req,res)=>{
    let record = { ...req.body }
   ZtFunctions.addEnquiry(record, res).then(result => {
   })
})

app.post('/zhongtong/model-submit',(req,res)=>{
    let record = {...req.body}
    ZtFunctions.addModelEnquiry(record,res).then(result=>{

    })
})

app.post('/zhongtong/submit-quote',(req,res)=>{
    let record = {...req.body}
    ZtFunctions.addQuote(record,res).then(result=>{

    })
})

app.post("/zhongtong/submit-testdrive",(req,res)=>{
    let record = {...req.body}
    ZtFunctions.addTestDrive(record,res).then(result=>{

    })
})

app.post("/zhongtong/submit-service",(req,res)=>{
    let record = {...req.body}
    ZtFunctions.addService(record,res).then(result=>{
        
    })
})

app.get("/zhongtong/get-quotes",async (req,res)=>{
    try{
        let data = await ZtFunctions.getQuotes();
        res.json(data);
    }
    catch(err){
        console.log("Error Message: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
})

app.get("/zhongtong/get-general-enquiry",async (req,res)=>{
    try{
        let data = await ZtFunctions.getGeneralEnquiry();
        res.json(data);
    }
    catch(err){
        console.log("Error Message: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
})

app.get("/zhongtong/get-model-enquiry",async (req,res)=>{
    try{
        let data = await ZtFunctions.getModelEnquiry();
        res.json(data);
    }
    catch(err){
        console.log("Error Message: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
})

app.get("/zhongtong/get-test-drive",async (req,res)=>{
    try{
        let data = await ZtFunctions.getTestDrive();
        res.json(data);
    }
    catch(err){
        console.log("Error Message: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
})

app.get("/zhongtong/get-service-enquiry",async (req,res)=>{
    try{
        let data = await ZtFunctions.getServiceEnquiry();
        res.json(data);
    }
    catch(err){
        console.log("Error Message: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
})

app.put("/zhongtong/update-quote",(req,res)=>{
    ZtFunctions.updateQuote(req,res);
})

app.put("/zhongtong/update-general-enquiry",(req,res)=>{
    ZtFunctions.updateGenEnquiry(req,res);
})

app.put("/zhongtong/update-model-enquiry",(req,res)=>{
    ZtFunctions.updateModelEnquiry(req,res);
})

app.put("/zhongtong/update-test-drive",(req,res)=>{
    ZtFunctions.updateTestDrive(req,res);
})

app.put("/zhongtong/update-service-enquiry",(req,res)=>{
    ZtFunctions.updateServiceEnquiry(req,res);
})


app.listen(3000,()=>{
    console.log("Server is running")
})