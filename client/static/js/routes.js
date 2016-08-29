//  use the config method to set up routing:
futgame_app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/login.html'
    })
    .when('/main',{
        templateUrl: 'partials/dashboard.html'
    })

    .otherwise({
      redirectTo: '/'
    });
});