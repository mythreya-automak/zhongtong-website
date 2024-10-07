var basePath = 'https://api.jmc.com.kw/api'
// var basePath = 'http://localhost:3000/api'

var uploadPath = 'https://api.jmc.com.kw/uploads/'
// var uploadPath = 'http://localhost:3000/uploads/'


document.addEventListener('DOMContentLoaded', () => {

    function adjustApiPaths() {
        // Get the current protocol from the website URL
        const currentProtocol = window.location.protocol;
    
        // Check if the protocol is HTTPS or HTTP
        if (currentProtocol === 'https:') {
            // If using HTTPS, ensure API paths are also HTTPS
            basePath = basePath.replace(/^http:/, 'https:');
            uploadPath = uploadPath.replace(/^http:/, 'https:');
        } else {
            // If using HTTP, ensure API paths are also HTTP
            basePath = basePath.replace(/^https:/, 'http:');
            uploadPath = uploadPath.replace(/^https:/, 'http:');
        }
    
        console.log('Adjusted basePath:', basePath);
        console.log('Adjusted uploadPath:', uploadPath);
    }

    adjustApiPaths();


    const apiUrl1 = basePath + '/zhongtong-cms/get-global-header'; // Replace with your actual API URL
    const apiUrl2 = basePath + '/zhongtong-cms/get-global-footer'; // Replace with your actual API URL

    // const apiUrl2 = basePath + '/jmc-cms/get-global-footer';
    async function fetchHeaderData() {
        try {
            const response = await fetch(apiUrl1);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            updateHeader(data);
        } catch (error) {
            console.error('Failed to fetch header data:', error);
        }
    }

    function updateHeader(data) {

        data = data[0]
        // Update email, phone
        document.getElementById('header_phone').textContent = data.HEADER_PHONE;
        document.getElementById('header_time').textContent = data.HEADER_TIME;



        // Update locations
        const location1Link = document.getElementById('header_location_1');
        location1Link.href = data.HEADER_LOCATION_1_URL;
        location1Link.querySelector('span').textContent = data.HEADER_LOCATION_1;

        

        // Update logo
        const logo = document.querySelector('.tt-logo img');
        logo.src = uploadPath + data.HEADER_LOGO_FILE_NAME;
        logo.srcset = uploadPath + data.HEADER_LOGO_FILE_NAME;
        logo.alt = 'Header Logo';
    }

    async function fetchFooterData() {
        try {
            const response = await fetch(apiUrl2);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            updateFooter(data);
        } catch (error) {
            console.error('Failed to fetch header data:', error);
        }
    }

    function updateFooter(data) {

        data = data[0]
        document.getElementById('footer_note').innerText = data.FOOTER_NOTE_1;
        document.getElementById('facebook').href = data.FACEBOOK_URL;
        document.getElementById('twitter').href = data.TWITTER_URL;
        document.getElementById('google').href = data.GOOGLE_URL;
        document.getElementById('instagram').href = data.INSTAGRAM_URL;
        document.getElementById('whatsapp').href = data.WHATSAPP_URL;
        document.getElementById('department_2').innerText = data.DEPARTMENT_2;
        document.getElementById('department_2_time').innerText = data.DEPARTMENT_2_TIME;
        document.getElementById('department_1').innerText = data.DEPARTMENT_1;
        document.getElementById('department_1_time').innerText = data.DEPARTMENT_1_TIME;
        const phone = document.querySelector('.phone span')
        phone.innerHTML =data.PHONE;
        const email = document.querySelector('.footer_email span')
        email.innerHTML =data.EMAIL;
        const location = document.querySelector('.footer_location1 span')
        location.innerHTML =data.FOOTER_LOCATION_1;
       
        const logo = document.getElementById('footer_img');
        logo.src = uploadPath + data.FOOTER_LOGO_NAME;
        logo.srcset = uploadPath + data.FOOTER_LOGO_NAME;
        logo.alt = 'Footer Logo';
    }

    fetchHeaderData();
    fetchFooterData();

})