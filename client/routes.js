angular
   .module('app')
   .config(config);

angular
   .module('app')
   .run(run);

function config($urlRouterProvider, $stateProvider, $locationProvider) {

   var requireAuthentication = function() {
      return {
         "currentUser": function($meteor){
            return $meteor.requireUser();
         }
      };
   }

   var logout = function() {
      return {
         "logout": function($meteor, $state) {
            return $meteor.logout().then(function(){
               console.log('See ya later alligator');
               $state.go('login');
            }, function(err){
               console.log('logout error - ', err);
            });
         }
      }
   }

   $locationProvider
      .html5Mode(true);

   $stateProvider
      .state('dashboardUpdate', {
         url: '/dashboard/update',
         templateUrl: 'client/layout/dashboard/views/update.html',
         controller: 'UpdateCtrl',
         resolve: requireAuthentication()
      })
      .state('dashboard', {
         url: '/dashboard',
         templateUrl: 'client/layout/dashboard/views/dashboard.html',
         controller: 'DashboardCtrl',
         resolve: requireAuthentication()
      })
      .state('users', {
         url: '/users',
         templateUrl: 'client/layout/users/views/users-list.html',
         controller: 'UsersListCtrl'
      })
      .state('userDetails', {
         url: '/users/:userId',
         templateUrl: 'client/layout/users/views/user-details.html',
         controller: 'UserDetailsCtrl',
      })
      .state('infinite', {
         url: '/infinite',
         templateUrl: 'client/layout/infinite-scroll/views/infinite-scroll.html',
         controller: 'InfiniteScrollCtrl'
      })
      .state('draggable', {
         url: '/draggable',
         templateUrl: 'client/layout/draggable/views/draggable.html'
      })
      .state('login', {
         url: '/login',
         templateUrl: 'client/layout/users/views/login.html',
         controller: 'LoginCtrl',
         controllerAs: 'lc'
      })
      .state('register', {
         url: '/register',
         templateUrl: 'client/layout/users/views/register.html',
         controller: 'RegisterCtrl',
         controllerAs: 'rc'
      })
      .state('resetpw', {
         url: '/resetpw',
         templateUrl: 'client/layout/users/views/reset-password.html',
         controller: 'ResetCtrl',
         controllerAs: 'rpc'
      })
      .state('resetpwtoken', {
         url: '/reset-password/:token',
         templateUrl: 'client/layout/users/views/reset-pw-token.html',
         controller: 'ResetPwToken',
         controllerAs: 'rpt'
      })
      .state('verifyEmail', {
         url: '/verify-email/:token',
         templateUrl: 'client/layout/users/views/verify-email.html',
         controller: 'VerifyEmail'
      })
      .state('logout', {
         url: '/logout',
         resolve: logout()
      });

   $urlRouterProvider
      .otherwise("/users");
}

function run($rootScope, $state) {
   $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireUser promise is rejected
      // and redirect the user back to the main page
      if (error === 'AUTH_REQUIRED') {
         $state.go('login');
      }
   });
}
