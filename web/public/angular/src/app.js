(function () {
    var app = angular.module('app', ['ngRoute']);
    
    app.config(["$routeProvider", function ($router){
        $router.when("/", { templateUrl: "angular/views/index.html" })
        $router.when("/email", { templateUrl: "angular/views/email.html" })
        $router.when("/number", { templateUrl: "angular/views/number.html" })
        $router.when("/string", { templateUrl: "angular/views/string.html" })
        $router.when("/error", { templateUrl: "angular/views/error.html" })
        $router.when("/asynch", { templateUrl: "angular/views/asynch.html" })
        $router.when("/ch9/example", { templateUrl: "angular/views/example.html" })
        .otherwise({ redirectTo: "/" });
    
    }]);
     
})();