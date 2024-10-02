jQuery(function($) {
	function successModal(){
		if($('body').hasClass('modal-open')){
			var objModal = $('.modal');
			if(!objModal.hasClass('show')) return false;
			objModal.find('.tt-modal-message').addClass('tt-active');
			setTimeout(function(){
				objModal.find('.close').trigger('click');
				objModal.find('.tt-modal-message').removeClass('tt-active');
			}, 1600);
		};
	};
	function successForm(obj){
		var objMessage = $(obj).find('.tt-modal-message');
		objMessage.addClass('tt-active');
		setTimeout(function(){
			objMessage.removeClass('tt-active');
		}, 3600);
	};
	// var formContactForm = $('#contactform');
	// if (formContactForm.length){
	// 	formContactForm.validate({
	// 		rules: {
	// 			name: {
	// 				required: true,
	// 				minlength: 2
	// 			},
	// 			email: {
	// 				required: true,
	// 				email: true
	// 			},
	// 			message: {
	// 				required: true,
	// 			}
	// 		},
	// 		messages: {
	// 			name: {
	// 				required: "Please enter your name",
	// 				minlength: "Your name must consist of at least 2 characters"
	// 			},
	// 			email: {
	// 				required: "Please enter your email"
	// 			},
	// 			message: {
	// 				required: "Please enter your message"
	// 			}
	// 		},
	// 		submitHandler: function(form) {
	// 			$(form).ajaxSubmit({
	// 				type:"POST",
	// 				data: $(form).serialize(),
	// 				url:"http://localhost:3000/zhongtong/submit-enquiry",
	// 				success: function() {
	// 					  $('#success').fadeIn();
							 
	// 				},
	// 				error: function() {
	// 					$('#contactform').fadeTo( "slow", 1, function() {
	// 						$('#error').fadeIn();
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});
	// };
	var newsletterform = $('#newsletterform');
	if (newsletterform.length){
		newsletterform.validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/newsletter-form.php",
					success: function() {
						  $('#success').fadeIn();
						newsletterform.each(function(){this.reset();});
						successForm(newsletterform);
					},
					error: function() {
						$('#newsletterform').fadeTo( "slow", 1, function() {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
	var modalAddYourItem = $('#formAddYourItem');
	if (modalAddYourItem.length){
		modalAddYourItem.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/modal__additem.php",
					success: function() {
						$('#success').fadeIn();
						modalAddYourItem.each(function(){this.reset();});
						successModal(modalAddYourItem);
					},
					error: function() {
						modalAddYourItem.fadeTo( "slow", 1, function() {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
});