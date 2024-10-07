
  const baseURL = 'https://api.jmc.com.kw/api/zhongtong/'
  
//  var basePath = 'http://localhost:3000';

// const baseURL = basePath + '/zhongtong/'

document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('contactform');
    const successMessage = document.getElementById('successPopup'); 
    const errorMessage = document.getElementById('txtErrorMessage'); 
  
    form.addEventListener('submit',function(event){
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message){
            errorMessage.style.display = 'block';
        }else{

            errorMessage.style.display = 'none';

            const formData = {
                // name: document.getElementById('name').value,
                // email: document.getElementById('email').value,
                // phone: document.getElementById('phone').value,
                // message: document.getElementById('message').value,
                name: name,
                email: email,
                phone: phone,
                message: message,
                created_at: new Date().toISOString(),
                status: 'New', 
                status_updated_by: 'source'
            }
    
    
            fetch(baseURL + 'submit-enquiry',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data=>{
                console.log("Success:", data);
                form.reset();
                successMessage.style.display = 'flex';
    
                setTimeout(function(){
                    successMessage.style.display = 'none';
                },5000);
    
                setTimeout(function(){
                    window.location.reload(true);
                },1000);
    
            })
            .catch(err=>{
                console.error("Error:", err);
            })
        }
        

        
    })
})


function submitModelEnquiry(form,event){
    event.preventDefault();
    const successMessage =  document.getElementById('successPopup');
    const errorMessage =  document.getElementById('txtErrorEnquiry');

    let formData = {};

if (form === 'enquiry1') {
    formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        model: document.getElementById('model').value,
        created_at: new Date().toISOString(),
        status: 'New',
        status_updated_by: 'source'
    };

    if (!formData.name || !formData.email || !formData.phone || formData.model === "General Enquiry"){
        errorMessage.style.display = 'block';
      }else{
        errorMessage.style.display = 'none';

        fetch(baseURL + 'model-submit',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data=>{
            console.log("Success",data);
            
            successMessage.style.display = 'flex';

            setTimeout(function(){
                successMessage.style.display = 'none';
            },5000)

            setTimeout(function(){
                window.location.reload(true);
            },1000);

        })
        .catch(err=>{
            console.error("Error",err.message);
        })
      }

} else {
    formData = {
        name: document.getElementById('mob_name').value,
        email: document.getElementById('mob_email').value,
        phone: document.getElementById('mob_phone').value,
        model: document.getElementById('mob_model').value,
        created_at: new Date().toISOString(),
        status: 'New',
        status_updated_by: 'source'
    };

    if (!formData.name || !formData.email || !formData.phone || formData.model === "General Enquiry"){
        errorMessage.style.display = 'block';
      }else{
        errorMessage.style.display = 'none';

        fetch(baseURL + 'model-submit',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data=>{
            console.log("Success",data);
            
            successMessage.style.display = 'flex';

            setTimeout(function(){
                successMessage.style.display = 'none';
            },5000)

            setTimeout(function(){
                window.location.reload(true);
            },100);

        })
        .catch(err=>{
            console.error("Error",err.message);
        })
      }
}

    }


    document.addEventListener('DOMContentLoaded',function(){
        const form = document.getElementById('quoteRequest');
        const successMessage = document.getElementById('txtSuccess');
        const errorMessage = document.getElementById('txtErrorQuote');


        form.addEventListener('submit',function(event){
            event.preventDefault();
 
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                model: document.getElementById('model').value,
                message: document.getElementById('message').value,
                created_at: new Date().toISOString(),
                status : 'New',
                status_updated_by: 'source'
            }

            if(!formData.name || !formData.email || !formData.phone || !formData.model){
                errorMessage.style.display = 'block';
            }else{
                errorMessage.style.display = 'none';
                fetch(baseURL + 'submit-quote',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(formData),
                })
                .then(response=>{
                    if(!response.ok){
                        throw new Error("Network response was not ok")
                    }
                    return response.json();
                })
                .then(data=>{
                    console.log("Success: ",data);
    
                    form.reset();
                    successMessage.style.display ='block';
    
                    setTimeout(function(){
                    successMessage.style.display ='block';
    
                    },5000);
    
                    setTimeout(function(){
                        window.location.reload(true);
                    },1000)
    
                })
                .catch(err=>{
                    console.log("Error: ",err.message);
                })
            }

            

        })

    })

    document.addEventListener('DOMContentLoaded',function(){
        const form = document.getElementById('requestDrive');
        const successMessage = document.getElementById('txtSucces');
        const errorMessage = document.getElementById('txtErrorTestDrive');

        form.addEventListener('submit',function(event){
            event.preventDefault();

            const formData={
                name: document.getElementById('td_name').value,
                email: document.getElementById('td_email').value,
                phone: document.getElementById('td_phone').value,
                model: document.getElementById('td_model').value,
                test_drive_date: document.getElementById('td_date').value,
                created_at: new Date().toISOString(),
                status: 'New',
                status_updated_by: 'source'
            }

            if (!formData.name || !formData.email || !formData.phone || !formData.model || !formData.test_drive_date){
                errorMessage.style.display = 'block';
            }else{

                errorMessage.style.display = 'none';

                fetch(baseURL + 'submit-testdrive',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(formData),
                })
                .then(response=>{
                    if(!response.ok){
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data=>{
                    console.log("Success:",data);
                    form.reset();
                    successMessage.style.display = 'block';
    
                    setTimeout(function(){
                    successMessage.style.display = 'none';
                    },5000)
    
                    setTimeout(function(){
                        window.location.reload(true);
                    },1000)
                })
                .catch(err=>{
                        console.log("Error: ",err.message);
                    })
            }

           

        })
    })

    document.addEventListener('DOMContentLoaded',function(){
        const form = document.getElementById('bookService');
        const successMessage = document.getElementById('txtSuccessMessage');
        const errorMessage = document.getElementById('txtErrorBookService');

        form.addEventListener('submit',function(event){
            event.preventDefault();

            const formData={
                name: document.getElementById('bs_name').value,
                email: document.getElementById('bs_email').value,
                phone: document.getElementById('bs_phone').value,
                model: document.getElementById('bs_model').value,
                service_date: document.getElementById('bs_date').value,
                created_at: new Date().toISOString(),
                status: 'New',
                status_updated_by: 'source'
            }

        if (!formData.name || !formData.email || !formData.phone || formData.model === "General Enquiry" || !formData.service_date){

            errorMessage.style.display = 'block';

        }
        else{
            errorMessage.style.display = 'none';

            fetch(baseURL + 'submit-service',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData),
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data=>{
                console.log("Success:",data);
                form.reset();
                successMessage.style.display = 'block';

                setTimeout(function(){
                successMessage.style.display = 'none';
                },5000)

                setTimeout(function(){
                    window.location.reload(true);
                },1000)
            })
            .catch(err=>{
                console.log("Error: ",err.message);
            })
        }
            

        })
    })