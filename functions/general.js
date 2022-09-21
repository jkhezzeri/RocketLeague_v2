function modalItem(item, table) {
	$.ajax({
		type: "POST",
		url: "php/modal_item.php",
		data: {table: table, item: item},
		success: function(result){
			$('#modal').html(result);
			$('#modal').show();
			$(document).on('click', function (e) {
			    if ($(e.target).closest("#modal_content").length === 0) {
			        $("#modal").hide();
					$("#modal").empty();
			    }
			});
			$('.modal_paint').click(function() {
				$('#modal_image img').attr('src', $(this).children('.modal_paint_image').children().attr('src'));
				$('#modal_image img').attr('title', $(this).children('.modal_paint_image').children().attr('title'));
				if ($(this).children('.modal_paint_name').text() != 'Default') {
					$('#modal_color').removeClass();
					$('#modal_color').addClass($(this).attr('class').split(' ')[1]);
					$('#modal_color').text($(this).children('.modal_paint_name').text());
				} else {
					$('#modal_color').removeAttr('class');
					$('#modal_color').empty();
				}
				$('#modal_paints').removeClass();
				$('#modal_paints').addClass('close');
				// $('#modal_paints').hide();
			  	$('#modal_paints_button').show();
				$('#modal_paints_text').removeClass();
				$('#modal_paints_text').addClass($(this).attr('class').split(' ')[1]);
			});

			$('#modal_paints_button').click(function() {
				$('#modal_paints').removeClass();
				$('#modal_paints').addClass('open');
			  	// $('#modal_paints').show();
			  	$('#modal_paints_button').hide();
				if ($('#modal_color').attr('class')) {
					$('#modal_paints_text').text($('#modal_color').text() + " " + $('#modal_name').text());
				} else {
					$('#modal_paints_text').text($('#modal_name').text());
				}
			});
			$('#modal_paints_close').click(function() {
				$('#modal_paints').removeClass();
				$('#modal_paints').addClass('close');
			  	// $('#modal_paints').hide();
			  	$('#modal_paints_button').show();
			});
			$("#modal_content").on('click', function (e) {
				if ($(e.target).closest("#modal_paints, #modal_paints_button").length === 0) {
					if ($('#modal_paints').hasClass('open')) {
						$('#modal_paints').removeClass();
						$('#modal_paints').addClass('close');
						// $('#modal_paints').hide();
					  	$('#modal_paints_button').show();
					}
				}
			});

			$('.modal_paint').hover(function() {
				if ($(this).children('.modal_paint_name').text() != 'Default') {
			  		$('#modal_paints_text').text($(this).children($('.modal_paint_name')).text() + " " + $('#modal_name').text());
				} else {
					$('#modal_paints_text').text($('#modal_name').text());
				}
				$('#modal_paints_text').removeClass();
				$('#modal_paints_text').addClass($(this).attr('class').split(' ')[1]);
			}, function() {
				if ($('#modal_color').attr('class')) {
					$('#modal_paints_text').text($('#modal_color').text() + " " + $('#modal_name').text());
					$('#modal_paints_text').removeClass();
					$('#modal_paints_text').addClass($('#modal_color').attr('class'));
				} else {
					$('#modal_paints_text').text($('#modal_name').text());
					$('#modal_paints_text').removeClass();
					$('#modal_paints_text').addClass('default');
				}
			});

		}
	});
};



function openMobileMenu() {
	$("#mobile_left_open").show();

	if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("body").css({
	      "overflow": "hidden",
	      "padding-right": "17px"
	    });
		$("#header_mobile").css({
	      "padding-right": "17px"
	    });

		if ($('body').width()%2 == 0) {
			$("#mobile_center").css({
		      "left": "calc(50% - 9px)"
		    });
		} else {
			$("#mobile_center").css({
		      "left": "calc(50% - 8px)"
		    });
		}
	}

	var current = $(window).scrollTop();
	$(window).scroll(function() {
    	$(window).scrollTop(current);
	});

	$("#mobile_left_open").on('click', function (e) {
		if ($(e.target).closest(".mobile_nav_title, #mobile_menu_bottom, #mobile_menu_back").length === 0) {
			$("#mobile_left_open").hide();
			returnMobileMenu();
			$(window).off('scroll');

			if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

				$("body").css({
			      "overflow": "auto",
			      "padding-right": ""
			    });
				$("#header_mobile").css({
			      "padding-right": ""
			    });
				$("#mobile_center").css({
			      "left": "50%"
			    });
			}

		}
	});
};

function returnMobileMenu() {
	$(".mobile_list").hide();
	$("#mobile_menu_back").hide();
	$("#mobile_menu_bottom").show();
};


function openSearchMobile() {
	$("#mobile_menu_search").hide();
	$("#mobile_menu_close").show();
};

function closeSearchMobile() {
	$("#mobile_menu_close").hide();
	$("#mobile_menu_search").show();
};




$(document).ready(function () {

	$(window).on("beforeunload", function() {
		$(window).scrollTop(0);
	});

	$(window).resize(function() {
		if ($(window).width() > 800) {
			$("#mobile_left_open").hide();
		    returnMobileMenu();
		}
	});

	var toggleColor = document.querySelector('#checkbox_color');
	var currentColor = localStorage.getItem('color');

	var websiteColor = $('#checkbox_color');
	var mobileColor = $('#mobile_checkbox_color');
	mobileColor.on('change', function(toggleColor){
  		websiteColor.prop('checked', this.checked);
		switchColor(toggleColor);
	});

	if (currentColor) {
		document.documentElement.setAttribute('data-color', currentColor);
		if (currentColor === 'orange') {
			toggleColor.checked = true;
			mobileColor.prop('checked', true);
			$('.logo_image').attr('src', 'images/logo_orange.png');

			$('body').addClass("orange");
		} else {
			$('.logo_image').attr('src', 'images/logo_blue.png');
		}
	}

	function switchColor(e) {
		// $('#header').css('transition', '0s');
		if (e.target.checked) {
			document.documentElement.setAttribute('data-color', 'orange');
			localStorage.setItem('color', 'orange');
			$('.logo_image').attr('src', 'images/logo_orange.png');
			mobileColor.prop('checked', true);
			$('body').addClass("orange");
		} else {
			document.documentElement.setAttribute('data-color', 'blue');
			localStorage.setItem('color', 'blue');
			$('.logo_image').attr('src', 'images/logo_blue.png');
			mobileColor.prop('checked', false);
			$('body').removeClass("orange");
		}
	}

	toggleColor.addEventListener('change', switchColor, false);

	var toggleMode = document.querySelector('#checkbox_theme');
	var currentMode = localStorage.getItem('theme');

	var websiteMode = $('#checkbox_theme');
	var mobileMode = $('#mobile_checkbox_theme');
	mobileMode.on('change', function(toggleMode){
  		websiteMode.prop('checked', this.checked);
		switchTheme(toggleMode);
	});

	if (currentMode) {
		document.documentElement.setAttribute('data-theme', currentMode);
		if (currentMode === 'dark') {
			toggleMode.checked = true;
			mobileMode.prop('checked', true);

			$('body').addClass("dark");
		} else {

		}
	}

	function switchTheme(e) {
		// $('#header').css('transition', '0s');
		if (e.target.checked) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
			mobileMode.prop('checked', true);

			$('body').addClass("dark");
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
			mobileMode.prop('checked', false);

			$('body').removeClass("dark");
		}
	}
	toggleMode.addEventListener('change', switchTheme, false);










	$('.mobile_nav_name').click(function() {
	  	$(this).children($('.mobile_list')).show();
		$("#mobile_menu_back").show();
		$("#mobile_menu_bottom").hide();
	});



});
