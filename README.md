## A bit of explanation

This an angular-meteor web application starter.

The router isn't using nested views for now, maybe it should, maybe not.
The change is pretty easy to make anyway. But for now let's keep things extra simple.

Email Verification can be turned on in /server/config/settings.js file by applying
```
Meteor.settings.public.verifyEmail = true;
Accounts.config({
    sendVerificationEmail: true
});
```

## Current packages
### Initial package   [Doc][meteor]
- meteor-base                 
   * Packages every Meteor app needs to have
- mobile-experience                  
   * Packages for a great mobile UX
- mongo                              
   * The database Meteor supports right now
- session                            
   * Client-side reactive dictionary for your app
- jquery                             
   * Helpful client-side library
- tracker                            
   * Meteor's client-side reactive programming library
- standard-minifiers                 
   * JS/CSS minifiers run for production mode
- es5-shim                           
   * ECMAScript 5 compatibility for older browsers.

###  Packages maintained by the core Meteor Team
- [angular][angular]
   * Js client side framework
   * It comes with its own version of ECMAScript so remember to remove the basic one
   * also do not forget to remove blaze
- [less][less]                              
   * generate css style sheet dynamically
- [check][check]                              
   * object validation
- [email][email]                              
   * package to send email from meteor server via smtp
- [accounts-password][accounts-password]                  
   * manage users authentication
- [angularui:angular-ui-router][angularui:angular-ui-router]        
   * angular style user interface router
   * See official angular doc: [here][official-angular-doc]
- [angularui:angular-ui-bootstrap][angularui:angular-ui-bootstrap]     
   * access $modal and other fancy bootstrap element
- [twbs:bootstrap][twbs:bootstrap]                     
   * easy styling

### Third party packages
- [danialfarid:ng-file-upload][danialfarid:ng-file-upload]         
   * nicely manages file upload via angular directives
- [cfs:standard-packages][cfs:standard-packages]              
   * CollectionFS used with $meteorCollectionFS (see angular-meteor api)
   * has cfs:gridfs as a dependency
- [alexk111:ng-img-crop][alexk111:ng-img-crop]               
   * a bit of a pain to make it work (really depends on html structure) but nicely crops images
- [fortawesome:fontawesome][fortawesome:fontawesome]            
   * cool icons
- [netanelgilad:ng-infinite-scroll][netanelgilad:ng-infinite-scroll]    
   * angular directive to manage subscribe rerun on scroll
   * it should be pretty easy to make our own using $anchorScroll (but it's badly documented) or probably better using a directive that checks for the actual window.height and scroll via Jqlite

## Loading & structure...

### Client & server : 'model' folder
Declare your databases in there and eventually any schema you wish on applying to them.

### Client Side : 'client & public' folders
- client :
   * The lib folder is loaded first, it contains our angular app definition.
   * The functions folder contains angular custom directive, service and providers.
   * index.html has the basic html structure of the app.
   * main.less does css reset, imports all less files and styles index.html.  
   * routes.js takes care of setting up routes for angular-ui-router.
   * Any other folder represents a part of our website and has its own controllers, styles and views folder.

- public: All assets (images, etc) that need to be available at all time should be placed in there.

### Server Side : 'server' folder
- config:
   * load-db.js populates database on startup
   * settings.js sets Meteor.settings variable and Accounts.config
   * smtp.js setup smtp connection
- hooks:  contains necessary logic if email verification is on.
- The server folder also contains all the logic behind database manipulation. Allow and deny rules as well as custom methods and publish should be in there.

## client/functions
### toggleSidebar.js

 ```
 <div class="gtToggle">
 ```
On click this will target #main-sidebar and applying custom style to make it come and go.

### activeMenu.js
```
<div class="gt-Menu"></div>
```
Applies 'selected-menu' class on click and removes it from same level <li>

### activeSubMenu.js
```
<div class="gt-CloseNav"></div>
```
Applies 'selected-sub-menu' class on click and removes it from same level <li>
Closes #main-sidebar on click if window.width is too small

### draggable.js
implement element drag as shown in angular doc for directive

### getUserPicture.js
```
<div class="gt-UserPicture"></div>
```
Displays user picture.

### notifications.js
Courtesy of <https://github.com/jvandemo/angular-growl-notifications>.
Insert this wherever you want your notifications to show up
 ```
 <gt-Notifications></gt-Notifications>
 ```

Then if you want to create a notification add
```
<gt-Notification [ttl="timeInMilliSec"] [onOpen='function'] [onClose="function"]></gt-Notification>
```
All attributes are optionals. Defaults time of appearance 5s.


## https

This year meteor added ssl support built-in, see the doc [here][ssl] for configuration. 

## Setting up again

```
meteor remove insecure
meteor remove autopublish
meteor remove blaze-html-templates
meteor remove ecmascript
meteor add angular  
meteor add angularui:angular-ui-router
meteor add angularui:angular-ui-bootstrap
meteor add accounts-password
meteor add email
meteor add cfs:standard-packages
meteor add cfs:gridfs
meteor add danialfarid:ng-file-upload
meteor add alexk111:ng-img-crop
meteor add twbs:bootstrap
meteor add less
meteor add fortawesome:fontawesome
```

<!-- meteor add sebastianilves:angular-chart-js -->

[meteor]: http://docs.meteor.com/#/full/
[angular]: http://www.angular-meteor.com/api/meteorCollection
[less]: http://lesscss.org/
[check]: http://docs.meteor.com/#/full/check
[email]: http://docs.meteor.com/#/full/email
[accounts-password]: http://docs.meteor.com/#/full/accounts_passwords
[angularui:angular-ui-router]: https://atmospherejs.com/angularui/angular-ui-router>
[official-angular-doc]: https://docs.angularjs.org/guide
[angularui:angular-ui-bootstrap]: https://github.com/angular-ui/bootstrap/
[danialfarid:ng-file-upload]: https://github.com/danialfarid/ng-file-upload
[cfs:standard-packages]: https://github.com/CollectionFS/Meteor-CollectionFS
[alexk111:ng-img-crop]: https://github.com/alexk111/ngImgCrop
[twbs:bootstrap]: https://github.com/twbs/bootstrap
[fortawesome:fontawesome]: https://fortawesome.github.io/Font-Awesome/icons/
[netanelgilad:ng-infinite-scroll]: https://github.com/netanelgilad/meteor-ng-infinite-scroll/
[ssl]: https://github.com/arunoda/meteor-up#ssl-support
