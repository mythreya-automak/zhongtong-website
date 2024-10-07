const multer = require('multer');
const path = require('path');
const config = require('./dbConfig');
const sql = require('mssql');
var dbConfig = require('./dbConfig3.js');


const fs = require('fs');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });
const uploadBulk = multer({ storage: storage }).array('images', 10);

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


/// Zhongtong CMS

async function updateGlobalHeader(req, res) {
    upload.single('header_logo')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to upload header logo.' });
        }

        const {
            REC_ID, HEADER_TIME, HEADER_TIME_AR, HEADER_LOCATION_1, HEADER_LOCATION_1_AR,HEADER_LOCATION_1_URL,HEADER_PHONE, UPDATED_BY
        } = req.body;

        const headerLogoFile = req.file;
        const headerLogoPath = headerLogoFile ? path.join('uploads', headerLogoFile.filename) : null;
        const headerLogoFileName = headerLogoFile ? headerLogoFile.filename : null;

        if (!REC_ID || !UPDATED_BY) {
            return res.status(400).json({ error: 'REC_ID and UPDATED_BY are required.' });
        }

        try {
            let pool = await sql.connect(dbConfig);

            let setClause = [];
            let inputs = {
                REC_ID: sql.Int,
                UPDATED_AT: sql.DateTime,
                UPDATED_BY: sql.NVarChar(100)
            };
            let values = {
                REC_ID: REC_ID,
                UPDATED_AT: new Date(),
                UPDATED_BY: UPDATED_BY
            };

            if (HEADER_TIME) {
                setClause.push('HEADER_TIME = @HEADER_TIME');
                inputs.HEADER_TIME = sql.NVarChar(sql.MAX);
                values.HEADER_TIME = HEADER_TIME || null;
            }
            if (HEADER_TIME_AR) {
                setClause.push('HEADER_TIME_AR = @HEADER_TIME_AR');
                inputs.HEADER_TIME_AR = sql.NVarChar(sql.MAX);
                values.HEADER_TIME_AR = HEADER_TIME_AR || null;
            }
            if (HEADER_LOCATION_1) {
                setClause.push('HEADER_LOCATION_1 = @HEADER_LOCATION_1');
                inputs.HEADER_LOCATION_1 = sql.NVarChar(sql.MAX);
                values.HEADER_LOCATION_1 = HEADER_LOCATION_1 || null;
            }
            if (HEADER_LOCATION_1_AR) {
                setClause.push('HEADER_LOCATION_1_AR = @HEADER_LOCATION_1_AR');
                inputs.HEADER_LOCATION_1_AR = sql.NVarChar(sql.MAX);
                values.HEADER_LOCATION_1_AR = HEADER_LOCATION_1_AR || null;
            }
            if (HEADER_LOCATION_1_URL) {
                setClause.push('HEADER_LOCATION_1_URL = @HEADER_LOCATION_1_URL');
                inputs.HEADER_LOCATION_1_URL = sql.NVarChar(sql.MAX);
                values.HEADER_LOCATION_1_URL = HEADER_LOCATION_1_URL || null;
            }
            if (HEADER_PHONE) {
                setClause.push('HEADER_PHONE = @HEADER_PHONE');
                inputs.HEADER_PHONE = sql.NVarChar(sql.MAX);
                values.HEADER_PHONE = HEADER_PHONE || null;
            }

            // Include logo fields if a file was uploaded
            if (headerLogoPath) {
                setClause.push('HEADER_LOGO_PATH = @HEADER_LOGO_PATH, HEADER_LOGO_FILE_NAME = @HEADER_LOGO_FILE_NAME');
                inputs.HEADER_LOGO_PATH = sql.NVarChar(sql.MAX);
                values.HEADER_LOGO_PATH = headerLogoPath;
                inputs.HEADER_LOGO_FILE_NAME = sql.NVarChar(sql.MAX);
                values.HEADER_LOGO_FILE_NAME = headerLogoFileName || null;
            }

            if (setClause.length === 0) {
                return res.status(400).json({ error: 'No fields to update.' });
            }

            let query = `
                UPDATE [CMS_ZHONGTONG].[dbo].[TBL_GLOBAL_HEADER]
                SET ${setClause.join(', ')}
                WHERE REC_ID = @REC_ID;
            `;

            let request = pool.request();
            for (let key in inputs) {
                request.input(key, inputs[key], values[key]);
            }

            await request.query(query);

            res.status(200).json({ message: 'Global header updated successfully.' });
        } catch (err) {
            console.error('Error updating global header:', err.message);
            res.status(500).json({ error: 'Failed to update global header.' });
        } finally {
            sql.close();
        }
    });
}

async function getGlobalHeader(req, res) {
    try {
        let pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .query('SELECT * FROM [CMS_ZHONGTONG].[dbo].[TBL_GLOBAL_HEADER]');

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching global header records:', err.message);
        res.status(500).json({ error: 'Failed to retrieve global header records.' });
    } finally {
        sql.close();
    }
}


// Zhongtong Footer

async function getGlobalFooter(req, res) {
    try {
        let pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .query('SELECT * FROM [CMS_ZHONGTONG].[dbo].[TBL_GLOBAL_FOOTER]');

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching global header records:', err.message);
        res.status(500).json({ error: 'Failed to retrieve global header records.' });
    } finally {
        sql.close();
    }
}

async function updateGlobalFooter(req, res) {
    upload.single('footer_logo')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to upload footer logo.' });
        }

        const {
            REC_ID,FOOTER_LOCATION_1,FOOTER_LOCATION_1_AR,DEPARTMENT_1,DEPARTMENT_1_AR,DEPARTMENT_2,DEPARTMENT_2_AR,DEPARTMENT_1_TIME,
            DEPARTMENT_1_TIME_AR,DEPARTMENT_2_TIME,DEPARTMENT_2_TIME_AR,EMAIL,PHONE,FOOTER_NOTE_1,FOOTER_NOTE_AR,FOOTER_LOCATION_1_URL,
            WHATSAPP_URL,GOOGLE_URL,INSTAGRAM_URL,TWITTER_URL,FACEBOOK_URL, UPDATED_BY
        } = req.body;

        const footerLogoFile = req.file;
        const footerLogoPath = footerLogoFile ? path.join('uploads', footerLogoFile.filename) : null;
        const footerLogoFileName = footerLogoFile ? footerLogoFile.filename : null;

        if (!REC_ID || !UPDATED_BY) {
            return res.status(400).json({ error: 'REC_ID and UPDATED_BY are required.' });
        }

        try {
            let pool = await sql.connect(dbConfig);

            let setClause = [];
            let inputs = {
                REC_ID: sql.Int,
                UPDATED_AT: sql.DateTime,
                UPDATED_BY: sql.NVarChar(100)
            };
            let values = {
                REC_ID: REC_ID,
                UPDATED_AT: new Date(),
                UPDATED_BY: UPDATED_BY
            };

            if (FOOTER_LOCATION_1) {
                setClause.push('FOOTER_LOCATION_1 = @FOOTER_LOCATION_1');
                inputs.FOOTER_LOCATION_1 = sql.NVarChar(sql.MAX);
                values.FOOTER_LOCATION_1 = FOOTER_LOCATION_1 || null;
            }
            if (FOOTER_LOCATION_1_AR) {
                setClause.push('FOOTER_LOCATION_1_AR = @FOOTER_LOCATION_1_AR');
                inputs.FOOTER_LOCATION_1_AR = sql.NVarChar(sql.MAX);
                values.FOOTER_LOCATION_1_AR = FOOTER_LOCATION_1_AR || null;
            }
            if (DEPARTMENT_1) {
                setClause.push('DEPARTMENT_1 = @DEPARTMENT_1');
                inputs.DEPARTMENT_1 = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_1 = DEPARTMENT_1 || null;
            }
            if (DEPARTMENT_1_AR) {
                setClause.push('DEPARTMENT_1_AR = @DEPARTMENT_1_AR');
                inputs.DEPARTMENT_1_AR = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_1_AR = DEPARTMENT_1_AR || null;
            }
            if (DEPARTMENT_2) {
                setClause.push('DEPARTMENT_2 = @DEPARTMENT_2');
                inputs.DEPARTMENT_2 = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_2 = DEPARTMENT_2 || null;
            }
            if (DEPARTMENT_2_AR) {
                setClause.push('DEPARTMENT_2_AR = @DEPARTMENT_2_AR');
                inputs.DEPARTMENT_2_AR = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_2_AR = DEPARTMENT_2_AR || null;
            }
            if (DEPARTMENT_1_TIME) {
                setClause.push('DEPARTMENT_1_TIME = @DEPARTMENT_1_TIME');
                inputs.DEPARTMENT_1_TIME = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_1_TIME = DEPARTMENT_1_TIME || null;
            }
            if (DEPARTMENT_1_TIME_AR) {
                setClause.push('DEPARTMENT_1_TIME_AR = @DEPARTMENT_1_TIME_AR');
                inputs.DEPARTMENT_1_TIME_AR = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_1_TIME_AR = DEPARTMENT_1_TIME_AR || null;
            }
            if (DEPARTMENT_2_TIME) {
                setClause.push('DEPARTMENT_2_TIME = @DEPARTMENT_2_TIME');
                inputs.DEPARTMENT_2_TIME = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_2_TIME = DEPARTMENT_2_TIME || null;
            }
            if (DEPARTMENT_2_TIME_AR) {
                setClause.push('DEPARTMENT_2_TIME_AR = @DEPARTMENT_2_TIME_AR');
                inputs.DEPARTMENT_2_TIME_AR = sql.NVarChar(sql.MAX);
                values.DEPARTMENT_2_TIME_AR = DEPARTMENT_2_TIME_AR || null;
            }
            if (EMAIL) {
                setClause.push('EMAIL = @EMAIL');
                inputs.EMAIL = sql.NVarChar(sql.MAX);
                values.EMAIL = EMAIL || null;
            }
            if (PHONE) {
                setClause.push('PHONE = @PHONE');
                inputs.PHONE = sql.NVarChar(sql.MAX);
                values.PHONE = PHONE || null;
            }
            if (FOOTER_NOTE_1) {
                setClause.push('FOOTER_NOTE_1 = @FOOTER_NOTE_1');
                inputs.FOOTER_NOTE_1 = sql.NVarChar(sql.MAX);
                values.FOOTER_NOTE_1 = FOOTER_NOTE_1 || null;
            }
            if (FOOTER_NOTE_AR) {
                setClause.push('FOOTER_NOTE_AR = @FOOTER_NOTE_AR');
                inputs.FOOTER_NOTE_AR = sql.NVarChar(sql.MAX);
                values.FOOTER_NOTE_AR = FOOTER_NOTE_AR || null;
            }
            if (FOOTER_LOCATION_1_URL) {
                setClause.push('FOOTER_LOCATION_1_URL = @FOOTER_LOCATION_1_URL');
                inputs.FOOTER_LOCATION_1_URL = sql.NVarChar(sql.MAX);
                values.FOOTER_LOCATION_1_URL = FOOTER_LOCATION_1_URL || null;
            }
            if (WHATSAPP_URL) {
                setClause.push('WHATSAPP_URL = @WHATSAPP_URL');
                inputs.WHATSAPP_URL = sql.NVarChar(sql.MAX);
                values.WHATSAPP_URL = WHATSAPP_URL || null;
            }
            if (GOOGLE_URL) {
                setClause.push('GOOGLE_URL = @GOOGLE_URL');
                inputs.GOOGLE_URL = sql.NVarChar(sql.MAX);
                values.GOOGLE_URL = GOOGLE_URL || null;
            }
            if (INSTAGRAM_URL) {
                setClause.push('INSTAGRAM_URL = @INSTAGRAM_URL');
                inputs.INSTAGRAM_URL = sql.NVarChar(sql.MAX);
                values.INSTAGRAM_URL = INSTAGRAM_URL || null;
            }
            if (TWITTER_URL) {
                setClause.push('TWITTER_URL = @TWITTER_URL');
                inputs.TWITTER_URL = sql.NVarChar(sql.MAX);
                values.TWITTER_URL = TWITTER_URL || null;
            } 
            if (FACEBOOK_URL) {
                setClause.push('FACEBOOK_URL = @FACEBOOK_URL');
                inputs.FACEBOOK_URL = sql.NVarChar(sql.MAX);
                values.FACEBOOK_URL = FACEBOOK_URL || null;
            }

            // Include logo fields if a file was uploaded
            if (footerLogoPath) {
                setClause.push('FOOTER_LOGO_PATH = @FOOTER_LOGO_PATH, FOOTER_LOGO_NAME = @FOOTER_LOGO_FILE_NAME');
                inputs.FOOTER_LOGO_PATH = sql.NVarChar(sql.MAX);
                values.FOOTER_LOGO_PATH = footerLogoPath;
                inputs.FOOTER_LOGO_FILE_NAME = sql.NVarChar(sql.MAX);
                values.FOOTER_LOGO_FILE_NAME = footerLogoFileName || null;
            }

            if (setClause.length === 0) {
                return res.status(400).json({ error: 'No fields to update.' });
            }

            let query = `
                UPDATE [CMS_ZHONGTONG].[dbo].[TBL_GLOBAL_FOOTER]
                SET ${setClause.join(', ')}
                WHERE REC_ID = @REC_ID;
            `;

            let request = pool.request();
            for (let key in inputs) {
                request.input(key, inputs[key], values[key]);
            }

            await request.query(query);

            res.status(200).json({ message: 'Global footer updated successfully.' });
        } catch (err) {
            console.error('Error updating global footer:', err.message);
            res.status(500).json({ error: 'Failed to update global footer.' });
        } finally {
            sql.close();
        }
    });
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
    getGlobalHeader:getGlobalHeader,
    updateGlobalHeader:updateGlobalHeader,
    getGlobalFooter:getGlobalFooter,
    updateGlobalFooter:updateGlobalFooter,
}