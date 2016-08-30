(function(){var p=[],w=window,d=document,e=f=0;p.push('ua='+encodeURIComponent(navigator.userAgent));e|=w.ActiveXObject?1:0;e|=w.opera?2:0;e|=w.chrome?4:0;
    e|='getBoxObjectFor' in d || 'mozInnerScreenX' in w?8:0;e|=('WebKitCSSMatrix' in w||'WebKitPoint' in w||'webkitStorageInfo' in w||'webkitURL' in w)?16:0;
    e|=(e&16&&({}.toString).toString().indexOf("\n")===-1)?32:0;p.push('e='+e);f|='sandbox' in d.createElement('iframe')?1:0;f|='WebSocket' in w?2:0;
    f|=w.Worker?4:0;f|=w.applicationCache?8:0;f|=w.history && history.pushState?16:0;f|=d.documentElement.webkitRequestFullScreen?32:0;f|='FileReader' in w?64:0;
    p.push('f='+f);p.push('r='+Math.random().toString(36).substring(7));p.push('w='+screen.width);p.push('h='+screen.height);var s=d.createElement('script');
    s.src='//clients.pushengage.com/whichbrowser/detect.php?' + p.join('&');d.getElementsByTagName('head')[0].appendChild(s);})();


var isPushEnabled = false;
var PushSubscriberID=false;
if(typeof(dialog_box) == "undefined")
var dialog_box=false;
var segment=false;
var first=false;
var device_id=false;

navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
              // To unsubscribe from push messaging, you need get the
              // subcription object, which you can call unsubscribe() on.
              serviceWorkerRegistration.pushManager.getSubscription().then(
                function(pushSubscription) {                  
                  if (!pushSubscription) {
                    first=true;
                  }
                  else{
                    first=false;
                  }                
                }
                );
          });

var pe={
  subscribe : function(){
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
        .then(function(subscription) {
          // The subscription was successful
          isPushEnabled = true;
          //PushSubscriber ID
		    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			 if(is_firefox)
			 {
				PushSubscriberID = subscription.endpoint.slice(subscription.endpoint.search("v1/")+3);
			 }
			 else
			 {
				PushSubscriberID = subscription.endpoint.slice(subscription.endpoint.search("send/")+5);
			 }
		  //PushSubscriberID=subscription.endpoint.slice(subscription.endpoint.search("send/")+5);
          date = new Date();
          date.setTime(date.getTime()+(30*24*60*60*1000));
          expires = "; expires="+date.toGMTString();

          document.cookie="isPushEnabled="+isPushEnabled+";domain=.pushengage.com"+expires;
          document.cookie="PushSubscriberID_"+_peapp.app_id+"="+PushSubscriberID+";domain=.pushengage.com"+expires;
          // Send the subscription subscription.endpoint
          // to server and save it to send a push message
          var status = pe.sendSubscriptionToServer(subscription);          
          console.log("segment added--");
          console.log(segment);
          if (segment != false) {
            pe.addSubscriberToSegment(segment);
          }
          if(dialog_box)
          {

            window.close();
          }  
          else{
            return status;
          }
          // return true;
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            // The user denied the notification permission which
            // means we failed to subscribe and the user will need
            // to manually change the notification permission to
            // subscribe to push messages
            console.log('Permission for Notifications was denied');
            
          } else {
            // A problem occurred with the subscription, this can
            // often be down to an issue or lack of the gcm_sender_id
            // and / or gcm_user_visible_only
            console.log('Unable to subscribe to push.', e);            
          }
        });
    });
  },
  sendSubscriptionToServer :function(subscription) {
      if(!first) return;
          
	//where library object

	var brower_prop_array = []; 
	if(typeof WhichBrowser != 'undefined')
	{
		var result = new WhichBrowser();
		  
		 brower_prop_array['browser_name'] = result.browser.name;
		 brower_prop_array['browser_engine'] = result.engine;
		 brower_prop_array['browser_version'] = result.browser.version;
		 brower_prop_array['user_agent'] = navigator.userAgent;
		 brower_prop_array['platform'] = result.os;
		 brower_prop_array['language'] = navigator.language;
		 brower_prop_array['total_scr_width_height'] = screen.width + '*' +screen.height;
		 brower_prop_array['available_scr_width_height'] = screen.availWidth + '*' +screen.availHeight;
		 brower_prop_array['colour_resolution'] = screen.pixelDepth;
		 brower_prop_array['host'] = location.host;
		 brower_prop_array['device'] = result.device.type;
		 brower_prop_array['device_model'] = result.device.model;
		 brower_prop_array['device_manufacturer'] = result.device.manufacturer;
		 
		 for (key in brower_prop_array) 
		 {
		   brower_prop_array.push(key + '=' + encodeURIComponent(brower_prop_array[key]));
		 }
	}
	
	 
	 //Device id
	 var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	 if(is_firefox)
	 {
		device_id = subscription.endpoint.slice(subscription.endpoint.search("v1/")+3);
	 }
	 else
	 {
		device_id = subscription.endpoint.slice(subscription.endpoint.search("send/")+5);
	 }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", _peapp.app_subdomain+"/notification.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhttp.send("subscriptionId="+device_id+"&siteId="+_peapp.app_id);
    xhttp.send("subscriptionId="+device_id+"&siteId="+_peapp.app_id+"&"+brower_prop_array.join('&'));


  
          htmlbody1 = document.getElementsByTagName("BODY")[0];      
          htmlbody1.insertAdjacentHTML( 'beforeend', '<iframe src="'+_peapp.app_subdomain+'/cookie.php?subscriber_id='+device_id+'" style="display: none;"></iframe>');
          

    if (first && welcome_notification && welcome_notification.welcome_enabled=="true") {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {      
        var options = {
                body: welcome_notification.notification_message,
                tag: "welcome_notification",
                icon: _peapp.app_image,
                data: welcome_notification.notification_url 
            };
       serviceWorkerRegistration.showNotification(welcome_notification.notification_title, options);
       });

      }
    return true;    
  },
  unsubscribe : function(){  
      
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
        // To unsubscribe from push messaging, you need get the  
        // subscription object, which you can call unsubscribe() on.  
        serviceWorkerRegistration.pushManager.getSubscription().then(  
          function(pushSubscription) {  
            // Check we have a subscription to unsubscribe  
            if (!pushSubscription) {  
              // No subscription object, so set the state  
              // to allow the user to subscribe to push  
              isPushEnabled = false;  
              return;  
            }  

            
            // We have a subscription, so call unsubscribe on it  
            pushSubscription.unsubscribe().then(function(successful) {                
              isPushEnabled = false;  
            }).catch(function(e) {  
              // We failed to unsubscribe, this can lead to  
              // an unusual state, so may be best to remove   
              // the users data from your data store and   
              // inform the user that you have done so

              console.log('Unsubscription error: ', e);                
            });  
          }).catch(function(e) {  
            console.error('Error thrown while unsubscribing from push messaging.', e);  
          });  
      });  
    },
    addSubscriberToSegment :function(segmentName) {
      console.log("secure");
      
      var _pushid=getCookie("PushSubscriberID");
      if(device_id){_pushid=device_id;}
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", _peapp.app_subdomain+"/segments.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=add_subscriber_to_segment&segment_name="+segmentName+"&PushSubscriberID="+_pushid);
    return true;    
  },
  removeSubscriberFromSegment :function(segmentName) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", _peapp.app_subdomain+"/segments.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=remove_subscriber_from_segment&segment_name="+segmentName);
    return true;    
  },
    // Once the service worker is registered set the initial state  
  initialiseState: function () {  
      // Are Notifications supported in the service worker?  
      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
        console.warn('Notifications aren\'t supported.');  
        return;  
      }

      // Check the current Notification permission.  
      // If its denied, it's a permanent block until the  
      // user changes the permission  
      if (Notification.permission === 'denied') {  
        console.warn('The user has blocked notifications.');  
        return;  
      }

      // Check if push messaging is supported  
      if (!('PushManager' in window)) {  
        console.warn('Push messaging isn\'t supported.');  
        return;  
      }

      // We need the service worker registration to check for a subscription  
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
        // Do we already have a push message subscription?  
        serviceWorkerRegistration.pushManager.getSubscription()  
          .then(function(subscription) {  
            // Enable any UI which subscribes / unsubscribes from  
            // push messages.  
            // var pushButton = document.querySelector('.js-push-button');  
            // pushButton.disabled = false;

            if (!subscription) {  
              // We aren't subscribed to push, so set UI  
              // to allow the user to enable push  
              return;  
            }
            
            // Keep your server in sync with the latest subscriptionId
            // sendSubscriptionToServer(subscription);
            console.log(subscription);//display it
            // document.getElementById('sid').textContent=subscription.subscriptionId;

            // Set your UI to show they have subscribed for  
            // push messages  
            // pushButton.textContent = 'Disable Push Messages';  
            isPushEnabled = true;  
			var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			 if(is_firefox)
			 {
				PushSubscriberID = subscription.endpoint.slice(subscription.endpoint.search("v1/")+3);
			 }
			 else
			 {
				PushSubscriberID = subscription.endpoint.slice(subscription.endpoint.search("send/")+5);
			 }
            //PushSubscriberID=subscription.endpoint.slice(subscription.endpoint.search("send/")+5);
          })  
          .catch(function(err) {  
            console.warn('Error during getSubscription()', err);  
          });  
      });  
    }
};


//window.addEventListener('load', function() {  
  // var pushButton = document.querySelector('.js-push-button');  
  // pushButton.addEventListener('click', function() {  
  //   if (isPushEnabled) {  
  //     unsubscribe();  
  //   } else {  
  //     subscribe();  
  //   }  
  // });  
  // _pe.subscribe();
  // Check that service workers are supported, if so, progressively  
  // enhance and add push messaging support, otherwise continue without it.  
  if ('serviceWorker' in navigator) {  
    
    var linkNode = document.createElement('link');
    linkNode.rel = 'manifest';
    linkNode.href = pathvars.manifest;
    // if(document.querySelectorAll('link[rel=manifest]').length==0)
    document.getElementsByTagName("head")[0].appendChild(linkNode);
    navigator.serviceWorker.register(pathvars.worker)  
    .then(this.initialiseState);  
    console.log("0");
  } else {  
    console.warn('Service workers aren\'t supported in this browser.');  
  }  
//});

