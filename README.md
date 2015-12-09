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

### Officialy maintained packages
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

### Third party packages
- [danialfarid:ng-file-upload][danialfarid:ng-file-upload]         
   * nicely manages file upload via angular directives
- [cfs:standard-packages][cfs:standard-packages]              
   * CollectionFS used with $meteorCollectionFS (see angular-meteor api)
- cfs:gridfs                         
   * dependency of cfs-standart-packages
- [alexk111:ng-img-crop][alexk111:ng-img-crop]               
   * a bit of a pain to make it work (really depends on html structure) but nicely crops images
- [twbs:bootstrap][twbs:bootstrap]                     
   * easy styling
- [fortawesome:fontawesome][fortawesome:fontawesome]            
   * cool icons
- [netanelgilad:ng-infinite-scroll][netanelgilad:ng-infinite-scroll]    
   * angular directive to manage subscribe rerun on scroll
   * it should be pretty easy to make our own using $anchorScroll (but it's badly documented) or probably better using a directive that checks for the actual window.height and scroll via Jqlite

## Loading & structure...

### Client & server : 'model' folder
Declare your databases in there and eventually any schema you wish on applying to them.

### Client Side : 'client & public' folders
* The lib folder is loaded first, it contains our angular app definition.
The functions folder contains angular custom directive, service and providers.
index.html has the basic html structure of the app.
main.less does css reset, imports all less files and styles index.html.  
routes.js takes care of setting up routes for angular-ui-router.
Any other folder represents a part of our website and has its own controllers, styles and views folder.

* All assets (images, etc) that need to be available at all time should be placed in the public folder.

### Server Side : 'server' folder
The config folder contains everything that needs to be done on.. startup. Use it to populate your database
on first launch
Hook folder contains Meteor.users modification on creation on check on login if Meteor.settings.public.verify == true and accounts-password is configured to send verification link on creation.
The server folder also contains all the logic behind database manipulation. Allow an deny rules as well as custom methods and publish should be in there.

## Setting up again
Angular comes bundled with its version of ecmascript so we need to remove it.

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

<!-- meteor add sebastianilves:angular-chart-js -->
```


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
