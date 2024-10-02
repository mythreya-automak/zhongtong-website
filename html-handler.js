const config = require('./dbConfig');
const sql = require('mssql');


async function addEnquiry(record,res) {

    try {
        let conn = await sql.connect(config);
        let insertRecord = await conn.request()
        .input('name',sql.VarChar(100),record.name)
        .input('email',sql.VarChar(100),record.email)
        .input('phone',sql.VarChar(20),record.phone)
        .input('message',sql.VarChar(sql.MAX),record.message)
        .input('created_at',sql.VarChar(50),record.created_at)
        .input('status',sql.VarChar(50),record.status)
        .input('status_updated_by',sql.VarChar(100),record.status_updated_by)
        .query("INSERT INTO zt_enquiry (name,email,phone,message,created_at,status,status_updated_by) VALUES(@name,@email,@phone,@message,@created_at,@status,@status_updated_by)");

        let data = insertRecord.recordsets[0];
        res.status(201).json({message:"Submitted Successfully",data});

    }catch (err){
    //    console.error("Error occurred: ",err.message );
       res.status(500).json({error:"Failed to submit"});
    }
    
}

async function addModelEnquiry(record,res){
    try{
        let conn = await sql.connect(config);
        let insertRecord = await conn.request()
        .input('name',sql.VarChar(100),record.name)
        .input('email',sql.VarChar(100),record.email)
        .input('phone',sql.VarChar(20),record.phone)
        .input('model',sql.VarChar(sql.MAX),record.model)
        .input('created_at',sql.VarChar(50),record.created_at)
        .input('status',sql.VarChar(50),record.status)
        .input('status_updated_by',sql.VarChar(100),record.status_updated_by)
        .query("INSERT INTO zt_model_enquiry (name,email,phone,model,created_at,status,status_updated_by) VALUES(@name,@email,@phone,@model,@created_at,@status,@status_updated_by)");

        let data = insertRecord.recordsets[0];

        res.status(201).json({message:"Submitted Successfully",data});

    }catch(err){
        res.status(500).json({error:"Failed to submit"});
    }
}

async function addQuote(record,res){
    try{
        let conn = await sql.connect(config);
        let insertRecord = await conn.request()
        .input('name',sql.VarChar(100),record.name)
        .input('email',sql.VarChar(100),record.email)
        .input('phone',sql.VarChar(20),record.phone)
        .input('model',sql.VarChar(sql.MAX),record.model)
        .input('message',sql.VarChar(sql.MAX),record.message)
        .input('created_at',sql.VarChar(50),record.created_at)
        .input('status',sql.VarChar(50),record.status)
        .input('status_updated_by',sql.VarChar(100),record.status_updated_by)
        .query("INSERT INTO zt_quote (name,email,phone,model,message,created_at,status,status_updated_by) VALUES(@name,@email,@phone,@model,@message,@created_at,@status,@status_updated_by)")

        let data = insertRecord.recordsets[0];

        res.status(201).json({message:"Submitted Successfully",data})
    }
    catch(err){
        res.status(500).json({message:"Failed to Submit",err})
    }
}

async function addTestDrive(record,res){
    try{
        let conn = await sql.connect(config);
        let insertRecord = await conn.request()
        .input('name',sql.VarChar(100),record.name)
        .input('email',sql.VarChar(100),record.email)
        .input('phone',sql.VarChar(20),record.phone)
        .input('model',sql.VarChar(sql.MAX),record.model)
        .input('test_drive_date',sql.VarChar(20),record.test_drive_date)
        .input('created_at',sql.VarChar(50),record.created_at)
        .input('status',sql.VarChar(50),record.status)
        .input('status_updated_by',sql.VarChar(100),record.status_updated_by)
        .query("INSERT INTO zt_test_drive (name,email,phone,model,test_drive_date,created_at,status,status_updated_by) VALUES(@name,@email,@phone,@model,@test_drive_date,@created_at,@status,@status_updated_by)");

        let data = insertRecord.recordsets[0];
        res.status(201).json({message:"Submitted Successfully",data});

    }
    catch(err){
        res.status(500).json({message:"Failed to submit",err});
    }
}

async function addService(record,res){
    try{
        let conn = await sql.connect(config);
        let insertRecord = await conn.request()
        .input('name',sql.VarChar(100),record.name)
        .input('email',sql.VarChar(100),record.email)
        .input('phone',sql.VarChar(20),record.phone)
        .input('model',sql.VarChar(sql.MAX),record.model)
        .input('service_date',sql.VarChar(20),record.service_date)
        .input('created_at',sql.VarChar(50),record.created_at)
        .input('status',sql.VarChar(50),record.status)
        .input('status_updated_by',sql.VarChar(100),record.status_updated_by)
        .query("INSERT INTO zt_service (name,email,phone,model,service_date,created_at,status,status_updated_by) VALUES(@name,@email,@phone,@model,@service_date,@created_at,@status,@status_updated_by)");

        let data = insertRecord.recordsets[0];
        res.status(201).json({message:"Submitted Successfully",data});

    }
    catch(err){
        res.status(500).json({message:"Failed to submit",err});
    }
}


async function getQuotes(){
    try{
        const conn = await sql.connect(config);
        const records = await conn.request()
        .query(`select * from zt_quote order by created_at desc`);
        if (records.recordset.length > 0) {
            return records.recordset
        } else {
            return 'No enquiries found.'
        }
        

    }
    catch(err){
        console.log("Error: ",err.message);
        res.status(500).json({message:"Failed to fetch quotes"});

    }
    finally{
        sql.close();
    }
}

async function getGeneralEnquiry(){
    try{
        const conn = await sql.connect(config);
        const records = await conn.request()
        .query(`select * from zt_enquiry order by created_at desc`);

        if(records.recordset.length > 0){
            return records.recordset
        }else{
            return "No enquiries found."
        }
    }
    catch(err){
        console.log("Error:",err.message);
    }
    finally{
        sql.close();
    }
}

async function getModelEnquiry(){
    try{
        const conn = await sql.connect(config);
        const records = await conn.request()
        .query(`select * from zt_model_enquiry order by created_at desc`);

        if(records.recordset.length > 0){
            return records.recordset
        }else{
            return "No enquiries found."
        }
    }
    catch(err){
        console.log("Error:",err.message);
    }
    finally{
        sql.close();
    }
}

async function getTestDrive(){
    try{
        const conn = await sql.connect(config);
        const records = await conn.request()
        .query(`select * from zt_test_drive order by created_at desc`);

        if(records.recordset.length > 0){
            return records.recordset
        }else{
            return "No enquiries found."
        }
    }
    catch(err){
        console.log("Error:",err.message);
    }
    finally{
        sql.close();
    }
}

async function getServiceEnquiry(){
    try{
        const conn = await sql.connect(config);
        const records = await conn.request()
        .query(`select * from zt_service order by created_at desc`);

        if(records.recordset.length > 0){
            return records.recordset
        }else{
            return "No enquiries found."
        }
    }
    catch(err){
        console.log("Error:",err.message);
    }
    finally{
        sql.close();
    }
}

async function updateQuote(req,res){

    const { record_id, status,status_updated_by } = req.body;
    if (!record_id || !status || !status_updated_by){
        res.status(500).json({error: 'Missing required fields.' });
    }

    try{
    let conn = await sql.connect(config);
    await conn.request()
    .input('record_id',sql.Int,record_id)
    .input('status',sql.VarChar(50),status)
    .input('status_updated_by',sql.VarChar(100),status_updated_by)
    .query(`update zt_quote set status=@status,status_updated_by=@status_updated_by where record_id=@record_id`);

    res.status(200).json({message:"updated successfully"})
    }
    catch(err){
        console.error('Error updating quote:', err.message);
        res.status(500).json({ error: 'Failed to update quote.' });
    }

}

async function updateGenEnquiry(req,res){

    const { record_id, status,status_updated_by } = req.body;
    if (!record_id || !status || !status_updated_by){
        res.status(500).json({error: 'Missing required fields.' });
    }

    try{
    let conn = await sql.connect(config);
    await conn.request()
    .input('record_id',sql.Int,record_id)
    .input('status',sql.VarChar(50),status)
    .input('status_updated_by',sql.VarChar(100),status_updated_by)
    .query(`update zt_enquiry set status=@status,status_updated_by=@status_updated_by where record_id=@record_id`);

    res.status(200).json({message:"updated successfully"})
    }
    catch(err){
        console.error('Error updating quote:', err.message);
        res.status(500).json({ error: 'Failed to update quote.' });
    }

}

async function updateModelEnquiry(req,res){

    const { record_id, status,status_updated_by } = req.body;
    if (!record_id || !status || !status_updated_by){
        res.status(500).json({error: 'Missing required fields.' });
    }

    try{
    let conn = await sql.connect(config);
    await conn.request()
    .input('record_id',sql.Int,record_id)
    .input('status',sql.VarChar(50),status)
    .input('status_updated_by',sql.VarChar(100),status_updated_by)
    .query(`update zt_model_enquiry set status=@status,status_updated_by=@status_updated_by where record_id=@record_id`);

    res.status(200).json({message:"updated successfully"})
    }
    catch(err){
        console.error('Error updating quote:', err.message);
        res.status(500).json({ error: 'Failed to update quote.' });
    }

}

async function updateTestDrive(req,res){

    const { record_id, status,status_updated_by } = req.body;
    if (!record_id || !status || !status_updated_by){
        res.status(500).json({error: 'Missing required fields.' });
    }

    try{
    let conn = await sql.connect(config);
    await conn.request()
    .input('record_id',sql.Int,record_id)
    .input('status',sql.VarChar(50),status)
    .input('status_updated_by',sql.VarChar(100),status_updated_by)
    .query(`update zt_test_drive set status=@status,status_updated_by=@status_updated_by where record_id=@record_id`);

    res.status(200).json({message:"updated successfully"})
    }
    catch(err){
        console.error('Error updating quote:', err.message);
        res.status(500).json({ error: 'Failed to update quote.' });
    }

}

async function updateServiceEnquiry(req,res){

    const { record_id, status,status_updated_by } = req.body;
    if (!record_id || !status || !status_updated_by){
        res.status(500).json({error: 'Missing required fields.' });
    }

    try{
    let conn = await sql.connect(config);
    await conn.request()
    .input('record_id',sql.Int,record_id)
    .input('status',sql.VarChar(50),status)
    .input('status_updated_by',sql.VarChar(100),status_updated_by)
    .query(`update zt_service set status=@status,status_updated_by=@status_updated_by where record_id=@record_id`);

    res.status(200).json({message:"updated successfully"})
    }
    catch(err){
        console.error('Error updating quote:', err.message);
        res.status(500).json({ error: 'Failed to update quote.' });
    }

}


module.exports ={
    addEnquiry: addEnquiry,
    addModelEnquiry : addModelEnquiry,
    addQuote : addQuote,
    addTestDrive: addTestDrive,
    addService : addService,
    getQuotes:getQuotes,
    getGeneralEnquiry: getGeneralEnquiry,
    getModelEnquiry:getModelEnquiry,
    getTestDrive:getTestDrive,
    getServiceEnquiry:getServiceEnquiry,
    updateQuote:updateQuote,
    updateGenEnquiry:updateGenEnquiry,
    updateModelEnquiry:updateModelEnquiry,
    updateTestDrive:updateTestDrive,
    updateServiceEnquiry:updateServiceEnquiry,
}