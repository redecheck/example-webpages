/*
jQuery(document).ready(function(){
	jQuery('.amazon').each(function() {
		var url = jQuery(this).data("amzn"); 
		jQuery(this).find('a.amzn').each(function() {
			jQuery(this).attr("href", url).attr("target", "_blank");
		});
	}); 
});
*/

jQuery(document).ready(function($){
  $('.grid4 .post-image').hover(
    function(){
      $(this).css('opacity', '0.7');
    }
  ,
    function(){
      $(this).css('opacity', '1');
    }
  );
});

/* Google Analytics */

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-50062-30', 'hundredzeros.com');
  ga('send', 'pageview');

/* Google DFP */

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') + 
'//www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();

googletag.cmd.push(function() {
googletag.defineSlot('/1012428/HundredZeros_MediumRectangle', [300, 250], 'div-gpt-ad-1387439946464-0').addService(googletag.pubads());
googletag.pubads().enableSingleRequest();
googletag.enableServices();
});

googletag.cmd.push(function() { googletag.display('div-gpt-ad-1387439946464-0'); });

/* Uservoice */

/*
(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/CIaYkfTxIozqeVkH3TQ1g.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

UserVoice = window.UserVoice || [];
UserVoice.push(['showTab', 'classic_widget', {
  mode: 'full',
  primary_color: '#cc6d00',
  link_color: '#007dbf',
  default_mode: 'feedback',
  forum_id: 171182,
  tab_label: 'Help',
  tab_color: '#444444',
  tab_position: 'bottom-right',
  tab_inverted: false
}]);
*/