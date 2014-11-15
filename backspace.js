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


jQuery(document).keypress(function(e) {

    if(e.which == 8) {
		
		  var d = e.srcElement || e.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && 
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' || 
                 d.type.toUpperCase() === 'FILE' || 
                 d.type.toUpperCase() === 'EMAIL' || 
                 d.type.toUpperCase() === 'SEARCH' || 
                 d.type.toUpperCase() === 'DATE' )
             ) || 
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }

		if(doPrevent){previous(e);}
    }
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
	backspaceCarrige++;
	backspaceHistory[backspaceCarrige]=el;
	
	}
	else if(typeof el.attr('class')==='undefined' || el.attr('class')==''){
		backspaceHistory[backspaceCarrige]='#';
		
		}
	
	backspaceCarrige++;
	
	console.log('carrige'+backspaceCarrige);
	console.log('history'+backspaceHistory);
});
