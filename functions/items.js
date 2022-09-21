function setImageCategory() {
	$.ajax({
		type: "POST",
		url: "php/image_category.php",
		data: {category: $('#garage_top').attr('class')},
		success: function(result){
			$('#category_image').attr('src', result);
		}
	});
};





function setSort(id) {
	$.ajax({
		type: "POST",
		url: "php/sort_items.php",
		// data: {table: $('title').text().toLowerCase().replace(/ /gi,"_"), id: id},
        data: {table: $('#garage_top').attr('class'), id: id},
		success: function(result){
			$('#garage_list').html(result);
			// $('#sort_result').text($('#sort_list>div[id='+id+']').text());
			$('#sort_result').text($('[onclick="setSort('+id+')"]').text());
			// $('.sort').removeClass('selected');
			$('[onclick="setSort('+id+')"]').addClass('selected');
			$('#sort_list').hide();
			$('#sort_input input').blur();

			var delay_array = ["0s", "-.25s", "-.5s", "-.75s", "-1s", "-1.25s", "-1.5s", "-1.75s"];
			$('.garage_item').each( function() {
				if ($(this).hasClass('black_market')) {
					var delay = delay_array[Math.floor(Math.random()*delay_array.length)];
					// console.log(delay);
					$(this).children('.item_image').children().css('animation-delay', delay);
				}
			});
		}
	});
	sessionStorage.setItem('sortBy', id);
};






$(document).ready(function () {

	setImageCategory();

    var sortBy = sessionStorage.getItem('sortBy');
    if (sortBy) {
        setSort(parseInt(sortBy));
    } else {
        setSort(1);
    }

	$('#sort_label, #sort_menu').click(function() {
	  	$('#sort_list').show();
	  	$('#sort_input input').focus();
	});

	$(document).on('click', function (e) {
	    if (!$(e.target).closest('#sort_label, #sort_menu').length) {
	        $('#sort_list').hide();
	    }
	});

	$('#sort_input input').keydown(function(e) {
		var selected = $('.sort.selected');
		if (e.keyCode == 38) { // up
	        $('.sort').removeClass('selected');
	        if (selected.prev().length == 0) {
	            selected.siblings().last().addClass('selected');
	        } else {
	            selected.prev().addClass('selected');
	        }
	    }
	    if (e.keyCode == 40) { // down
	        $('.sort').removeClass('selected');
	        if (selected.next().length == 0) {
	            selected.siblings().first().addClass('selected');
	        } else {
	            selected.next().addClass('selected');
	        }
	    }
		if (e.keyCode == 13) { // enter
	        selected.click();
	    }
		if (e.keyCode == 27) { // escape
	        $('#sort_list').hide();
			$('#sort_input input').blur();
	    }
	});






	$('.sort').mouseover(function() {
	    $('.sort').removeClass('selected');
	    $(this).addClass('selected');
	});

});
