jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-slider');
		    //不让首页一直被选中	自定义function
		    function checkMode(hiddenSlide, container, n) {
			var visibleMode = container.children('li').eq(n);//选择至第n个li navbar and page
			}
			
		
			function nextSlide(visibleSlide, container, pagination, n){
				visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					visibleSlide.removeClass('is-moving');
				});
		
				container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
				checkMode(visibleSlide, container, n);
			}
		
			function prevSlide(visibleSlide, container, pagination, n){
				visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					visibleSlide.removeClass('is-moving');
				});
		
				container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
				checkMode(visibleSlide, container, n);
			}
		
			function updateSliderNavigation(pagination, n) {
				var navigationDot = pagination.find('.selected');
				navigationDot.removeClass('selected');
				pagination.find('li').eq(n).addClass('selected');
			}
		
			function updateNavigationMarker(marker, n) {
				marker.removeClassPrefix('item').addClass('item-'+n);
			}
		
	if ( slidesWrapper.length > 0 ) {//length 属性包含 jQuery 对象中元素的数目。
		var primaryNav = $('.cd-primary-nav'),
			sliderNav = $('.cd-slider-nav'),
			navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,			
			PlayDelay = 4000;//4000ms		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
			event.preventDefault();
			var selectedItem = $(this);//当前对象
			if(!selectedItem.hasClass('selected')) {
				//selected 选择器选取被选择的 <option> 元素。
				var selectedPosition = selectedItem.index(),
					activePosition = slidesWrapper.find('li.selected').index();
				
				if( activePosition < selectedPosition) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);//返回至selected地点
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				}

				//滑动
				visibleSlidePosition = selectedPosition;
				updateSliderNavigation(sliderNav, selectedPosition);
				updateNavigationMarker(navigationMarker, selectedPosition+1);
				
			}
		});
	}
	
});