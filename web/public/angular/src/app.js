(function () {
    var app = angular.module('app', ['ngRoute']);
    
    app.config(["$routeProvider", function ($router){
        $router.when("/", { templateUrl: "angular/views/index.html" })
        $router.when("/email", { templateUrl: "angular/views/email.html" })
        $router.when("/number", { templateUrl: "angular/views/number.html" })
        .otherwise({ redirectTo: "/" });
    
    }]);
     
})();