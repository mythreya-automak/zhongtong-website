
var express = require('express');
var ZtFunctions = require('./html-handler');
var bodyParser = require('body-parser')
var cors = require('cors');
var router = express.Router();
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);


// app.post('/zhongtong/submit-enquiry',(req,res)=>{
//     let record = { ...req.body }
//    ZtFunctions.addEnquiry(record, res).then(result => {
//    })
// })

router.route('/zhongtong/submit-enquiry').post((req, res) => {
   let record = { ...req.body }
   ZtFunctions.addEnquiry(record, res).then(result => {
   })
})


router.route('/zhongtong/model-submit').post((req, res) => {
    let record = {...req.body}
    ZtFunctions.addModelEnquiry(record,res).then(result=>{
    })
 })

// app.post('/zhongtong/model-submit',(req,res)=>{
//     let record = {...req.body}
//     ZtFunctions.addModelEnquiry(record,res).then(result=>{

//     })
// })

// app.post('/zhongtong/submit-quote',(req,res)=>{
//     let record = {...req.body}
//     ZtFunctions.addQuote(record,res).then(result=>{

//     })
// })

router.route('/zhongtong/submit-quote').post((req, res) => {
    let record = {...req.body}
    ZtFunctions.addQuote(record,res).then(result=>{
    })
 })

 router.route('/zhongtong/submit-testdrive').post((req, res) => {
    let record = {...req.body}
    ZtFunctions.addTestDrive(record,res).then(result=>{
    })
 })

// app.post("/zhongtong/submit-testdrive",(req,res)=>{
//     let record = {...req.body}
//     ZtFunctions.addTestDrive(record,res).then(result=>{

//     })
// })

router.route('/zhongtong/submit-service').post((req, res) => {
    let record = {...req.body}
    ZtFunctions.addService(record,res).then(result=>{
    })
 })


// app.post("/zhongtong/submit-service",(req,res)=>{
//     let record = {...req.body}
//     ZtFunctions.addService(record,res).then(result=>{
        
//     })
// })

router.route('/zhongtong/get-quotes').get(async (req, res) => {
    // const page = parseInt(req.params.page, 10);
    
    // if (isNaN(page) || page < 1) {
    //     return res.status(400).json({ error: 'Invalid page number' });
    // }
  
    try {
        let data = await ZtFunctions.getQuotes();
        res.json(data);
    } catch (error) {
        console.log("Error Message: ",error.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
 });

// app.get("/zhongtong/get-quotes",async (req,res)=>{
//     try{
//         let data = await ZtFunctions.getQuotes();
//         res.json(data);
//     }
//     catch(err){
//         console.log("Error Message: ",err.message);
//         res.status(500).json({message:"Failed to fetch quotes"});
//     }
// })

router.route('/zhongtong/get-general-enquiry').get(async (req, res) => {
    // const page = parseInt(req.params.page, 10);
    
    // if (isNaN(page) || page < 1) {
    //     return res.status(400).json({ error: 'Invalid page number' });
    // }
  
    try {
        let data = await ZtFunctions.getGeneralEnquiry();
        res.json(data);
    } catch (error) {
        console.log("Error Message: ",error.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
 });

// app.get("/zhongtong/get-general-enquiry",async (req,res)=>{
//     try{
//         let data = await ZtFunctions.getGeneralEnquiry();
//         res.json(data);
//     }
//     catch(err){
//         console.log("Error Message: ",err.message);
//         res.status(500).json({message:"Failed to fetch quotes"});
//     }
// })

router.route('/zhongtong/get-model-enquiry').get(async (req, res) => {
   
    try {
        let data = await ZtFunctions.getModelEnquiry();
        res.json(data);
    } catch (error) {
        console.log("Error Message: ",error.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
 });

// app.get("/zhongtong/get-model-enquiry",async (req,res)=>{
//     try{
//         let data = await ZtFunctions.getModelEnquiry();
//         res.json(data);
//     }
//     catch(err){
//         console.log("Error Message: ",err.message);
//         res.status(500).json({message:"Failed to fetch quotes"});
//     }
// })

router.route('/zhongtong/get-test-drive').get(async (req, res) => {
   
    try {
        let data = await ZtFunctions.getTestDrive();
        res.json(data);
    } catch (error) {
        console.log("Error Message: ",error.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
 });

// app.get("/zhongtong/get-test-drive",async (req,res)=>{
//     try{
//         let data = await ZtFunctions.getTestDrive();
//         res.json(data);
//     }
//     catch(err){
//         console.log("Error Message: ",err.message);
//         res.status(500).json({message:"Failed to fetch quotes"});
//     }
// })

router.route('/zhongtong/get-service-enquiry').get(async (req, res) => {
   
    try {
        let data = await ZtFunctions.getServiceEnquiry();
        res.json(data);
    } catch (error) {
        console.log("Error Message: ",error.message);
        res.status(500).json({message:"Failed to fetch quotes"});
    }
 });

// app.get("/zhongtong/get-service-enquiry",async (req,res)=>{
//     try{
//         let data = await ZtFunctions.getServiceEnquiry();
//         res.json(data);
//     }
//     catch(err){
//         console.log("Error Message: ",err.message);
//         res.status(500).json({message:"Failed to fetch quotes"});
//     }
// })

router.route('/zhongtong/update-quote').put((req, res) => {
    ZtFunctions.updateQuote(req,res);
 });
  

// app.put("/zhongtong/update-quote",(req,res)=>{
//     ZtFunctions.updateQuote(req,res);
// })

router.route('/zhongtong/update-general-enquiry').put((req, res) => {
    ZtFunctions.updateGenEnquiry(req,res);
 });

// app.put("/zhongtong/update-general-enquiry",(req,res)=>{
//     ZtFunctions.updateGenEnquiry(req,res);
// })

router.route('/zhongtong/update-model-enquiry').put((req, res) => {
    ZtFunctions.updateGenEnquiry(req,res);
 });

// app.put("/zhongtong/update-model-enquiry",(req,res)=>{
//     ZtFunctions.updateModelEnquiry(req,res);
// })

router.route('/zhongtong/update-test-drive').put((req, res) => {
    ZtFunctions.updateTestDrive(req,res);
 });

// app.put("/zhongtong/update-test-drive",(req,res)=>{
//     ZtFunctions.updateTestDrive(req,res);
// })

router.route('/zhongtong/update-service-enquiry').put((req, res) => {
    ZtFunctions.updateServiceEnquiry(req,res);
 });

// app.put("/zhongtong/update-service-enquiry",(req,res)=>{
//     ZtFunctions.updateServiceEnquiry(req,res);
// })


app.listen(3000,()=>{
    console.log("Server is running")
})