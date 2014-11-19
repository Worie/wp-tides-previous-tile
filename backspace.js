
// Remove the defeault hashchange event

jQuery(window).unbind('hashchange');


// Extend the default hashchange event of Tides Theme

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
				if(url.indexOf('@')>-1)
				previous(ev);
			}
		}



});



// Load the previous subpage

function previous(ev){
	backspaceCarrige--;
	if(backspaceCarrige<=0){history.back();return true;}
	var tmp = backspaceHistory[backspaceCarrige];
	
	if(tmp!='#'){
		backspaceStop = true;
		tmp.click();
		ev.preventDefault();
		
	}else{
		history.back();
	}
}



// Initialize variables 
jQuery(document).ready(function(){

	backspaceStop=false;
	backspaceHistory = [];
	backspaceHistory[0]='#';
	backspaceCarrige = 1;
	backspacePortfolioClose = jQuery("<div></div>");

	// Does the same as AJAX TILE X button, but is always available to use
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

// Extend the on click event handler with creating a log

jQuery('.button[href^="*"],.button[href^="."],.isotope-alt-image,#selectnav> li >a[href^="#"]').click(function(){
	
	if(backspaceStop){
		backspaceStop=false;return false;
	}
			


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
	
	}
	else if(typeof el.attr('class')==='undefined' || el.attr('class')==''){
		backspaceHistory[backspaceCarrige]='#';
		
		}
	


	backspaceCarrige++;
	location.href="#backspacejs"+backspaceCarrige;
});
