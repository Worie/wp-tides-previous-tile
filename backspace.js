
// Change the native hashchange of custom.js

jQuery(window).unbind('hashchange');


jQuery(window).on('hashchange',function(ev){
		var url = location.hash;
		var minus = 64;
		if( jQuery('body').hasClass('admin-bar') )
			var minus = 96;
			
		if( jQuery('body').hasClass('resize-off') )
			var minus = 108;
			
		if( jQuery('body').hasClass('resize-off') && jQuery('body').hasClass('admin-bar') )
			var minus = 140;
			
		if( '#home' == url )
			var minus = 200;
			
		if( url )
			if(typeof jQuery(url).offset() !=='undefined'){
			jQuery("html, body").animate({ scrollTop: jQuery(url).offset().top - minus }, 500);
		}else{
			if(url.indexOf('backspacejs'+parseInt(backspaceCarrige-1))>-1){
				previous(ev);
			}
		}



});




function previous(ev){
	backspaceCarrige--;
	if(backspaceCarrige<=0){history.back();return true;}
	var tmp = backspaceHistory[backspaceCarrige];
	
	if(tmp!='#'){
		console.log('wbilem do '+tmp);
		backspaceStop = true;
		tmp.click();
		ev.preventDefault();
		
	}else{console.log('dont prevent');history.back();}
	console.log('carrige'+backspaceCarrige);
	console.log('history'+backspaceHistory);
}




jQuery(document).ready(function(){
backspaceStop=false;
backspaceHistory = [];
backspaceHistory[0]='#';
backspaceCarrige = 1;
backspacePortfolioClose = jQuery("<div></div>");
backspacePortfolioClose.click(function (){

jQuery('#loader').removeClass('fadeInUp').addClass('fadeOutDown').delay(999).hide(1);
setTimeout(function(){
jQuery('#loader').html(' ');
}, 999);
jQuery('#isotope-portfolio, #load-more-wrapper').delay(1000).slideDown(function(){
jQuery('#isotope-portfolio').isotope('reLayout');
}).removeClass('fadeOutLeft').addClass('fadeInRight');
jQuery('#filters').delay(999).show(1).removeClass('fadeOutUp').addClass('fadeInDown');

return false;
});
backspacePrevious = jQuery('.button[href^="*"]')[0]; 
});


jQuery('.button[href^="*"],.button[href^="."],.isotope-alt-image,#selectnav> li >a[href^="#"]').click(function(){
	if(backspaceStop){backspaceStop=false;return false;}
			


	var el = jQuery(this);
	if(backspaceCarrige<=0){backspaceCarrige=1;}
	
	if(el.hasClass('button')){
		if(el.attr('href')[0]=='.' || el.attr('href')[0]=='*'){
			
			backspaceHistory[backspaceCarrige]=backspacePrevious;
			backspacePrevious=el;
			
			}
	}
	
	
	else if(el.hasClass('ajax-link') && el.hasClass('isotope-alt-image')){
	
	backspaceHistory[backspaceCarrige]=backspacePortfolioClose;
				location.href="#backspacejs"+backspaceCarrige;

	backspaceCarrige++;
	backspaceHistory[backspaceCarrige]=el;
	
	}
	else if(typeof el.attr('class')==='undefined' || el.attr('class')==''){
		backspaceHistory[backspaceCarrige]='#';
		
		}
	


	backspaceCarrige++;
location.href="#backspacejs"+backspaceCarrige;

	console.log('carrige'+backspaceCarrige);
	console.log('history'+backspaceHistory);
});
