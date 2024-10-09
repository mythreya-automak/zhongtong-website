var basePath = 'https://api.jmc.com.kw/api'
// var basePath = 'http://localhost:3000/api'

// var uploadPath = 'http://localhost:3000/uploads/'

var uploadPath = 'https://api.jmc.com.kw/uploads/'

document.addEventListener('DOMContentLoaded', function () {

    function loadPageBanner() {
       
        fetch(`${basePath}/zhongtong-cms/get-page-banner?RECID=1`, {
        })
        .then(response => response.json())
        .then(data => {
           
            document.getElementById('page-banner-title').innerText = data.FIELD_CONTENT;
            document.getElementById('page-banner-title-2').innerText = data.FIELD_CONTENT;
            var section = document.getElementById('breadcrumb-section');
            var imageUrl = uploadPath + data.IMAGE_FILE_NAME; // Your dynamic image path
            section.style.backgroundImage = 'url(' + imageUrl + ')';
           
        })
        .catch(error => console.error('Error fetching content:', error));
    }

    function loadSlider() {
        fetch(`${basePath}/zhongtong-cms/get-offers`)
            .then(response => response.json())
            .then(data => {
                const mainSlider = document.getElementById('main-slider-1');
                const offers = data;
                let template = '';
                offers.forEach(offer => {
                    if (offer.IS_ACTIVE) {
                        const imageUrl = uploadPath + offer.IMAGE_NAME;
                        const sliderItemHtml =`
						<div class="slider_item">
							<div class="image_overlay">
								<img src="${imageUrl}" alt="Offer Image">
							</div>
							<div class="container">
								<div class="slider_text">
									<div class="budget_brand">
										<!-- Add any additional text or content if available -->
									</div>
								</div>
							</div>
						</div>
					`;
                        template += sliderItemHtml
                    }
                });
    
                const finalRender = `	
                    <div class="main_slider budget_slider" id="slider-container">
                        ${template}
                    </div>
                    <div class="slider_nav slider_nav_four">
                        <i class="arrow_left ti-angle-left"></i>
                        <i class="arrow_right ti-angle-right"></i>
                    </div>`
    
                mainSlider.innerHTML = finalRender;
    
    
    
                $('.main_slider').on('init', function (e, slick) {
                    var $firstAnimatingElements = $('div.slider_item:first-child').find('[data-animation]');
                    doAnimations($firstAnimatingElements);
                });
                $('.main_slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                    var $animatingElements = $('div.slider_item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                    doAnimations($animatingElements);
                });
    
    
                var $status = $('.pagingInfo');
                var $slickElement = $('.main_slider');
                $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                    var i = (currentSlide ? currentSlide : 0) + 1;
                    $status.text(i + '/' + slick.slideCount);
                });
                $slickElement.slick({
                    autoplay: true,
                    autoplaySpeed: 2200,
                    speed: 600,
                    dots: false,
                    fade: true,
                    prevArrow: ".arrow_left",
                    nextArrow: ".arrow_right",
                    draggable: false,
                });
    
    
    
                function doAnimations(elements) {
                    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    elements.each(function () {
                        var $this = $(this);
                        var $animationDelay = $this.data('delay');
                        var $animationType = 'animated ' + $this.data('animation');
                        $this.css({
                            'animation-delay': $animationDelay,
                            '-webkit-animation-delay': $animationDelay
                        });
                        $this.addClass($animationType).one(animationEndEvents, function () {
                            $this.removeClass($animationType);
                        });
                    });
                }
    
    
            })
            .catch(error => console.error('Error fetching slider data:', error));
    }






    // Initialize the page
    loadPageBanner();
    loadSlider();
});
