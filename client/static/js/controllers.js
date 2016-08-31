futgame_app.controller('loginController', function($scope, $cookies, $location, loginFactory) {

    $scope.login = function() {
        console.log('loginController - login');
        loginFactory.login($scope.loginUser, function(response) {
            console.log('loginController - login', response);
            $cookies.put('id', response.id);
            $cookies.put('username', response.username);
            console.log('cookies all', $cookies.getAll());
            $scope.currentUser = {
                id: $cookies.get('id'),
                username: $cookies.get('username'),
            };
            console.log('currentUser', $scope.currentUser);
            $location.url('/dashboard');
        });
    };

    $scope.register = function() {
        loginFactory.register($scope.newUser, function(response) {
            console.log('loginController - register - ', response);
            if (!response.success) {
                $scope.errors = response.msg;
            } else {
                $scope.loginUser.email = $scope.newUser.email;
                $scope.loginUser.password = $scope.newUser.password;
                loginFactory.login($scope.loginUser, function(response) {
                    $location.url('/dashboard');
                });
            }
        });
    };

    $scope.logout = function() {
        console.log('hi cont');
        loginFactory.logout(function(data) {
            $cookies.remove('id');
            $cookies.remove('username');
            console.log('cookies cleared on logout - ', $cookies.getAll());
            $location.path('/login');
        });
    };


});



//deleteme after we create dashboard
futgame_app.controller('dashboardController', function($scope, $cookies, $location, loginFactory, dashboardFactory) {
    $scope.currentUser = {
        id: $cookies.get('id'),
        username: $cookies.get('username'),
    };
    console.log('currentUser', $scope.currentUser);
    $location.url('/dashboard');


    dashboardFactory.index(function(data) {
        $scope.personList = data;
    });

    $scope.addPerson = function() {
        namesFactory.create($scope.newPerson, function(data) {
            $scope.personList = data;
            $scope.newPerson = {};
        });
    };

    $scope.removePerson = function(person) {
        namesFactory.delete(person, function(data) {
            $scope.personList = data;
        });
    };

    $scope.logout = function() {
        console.log('hi cont');
        loginFactory.logout(function(data) {
            $cookies.remove('id');
            $cookies.remove('username');
            console.log('cookies cleared on logout - ', $cookies.getAll());
            $location.path('/login');
        });
    };



});
