const config = {
    user:'sa',
    password:'Welcome@1234',
    server:'2351-LT',
    database:'AMK_LEADS',
    options:{
        trustedconnection:true,
        enableArithAbort: true,
        instancename:'MSSQLSERVER',
        ecrypt:false,
        trustServerCertificate:true,
        cryptoCredentialsDetails:{
            minVersion: 'TLSv1'
        }
    },
    port:1433
}


module.exports = config;