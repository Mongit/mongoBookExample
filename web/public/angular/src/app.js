(function () {
    var app = angular.module('app', ['ngRoute']);
    
    app.config(["$routeProvider", function ($router){
        //CHAPTER 9
        $router.when("/", 
                     { templateUrl: "angular/validatorsViews/index.html" })
        $router.when("/email", 
                     { templateUrl: "angular/validatorsViews/email.html" })
        $router.when("/number", 
                     { templateUrl: "angular/validatorsViews/number.html" })
        $router.when("/string", 
                     { templateUrl: "angular/validatorsViews/string.html" })
        $router.when("/error", 
                     { templateUrl: "angular/validatorsViews/error.html" })
        $router.when("/asynch", 
                     { templateUrl: "angular/validatorsViews/asynch.html" })
        $router.when("/ch9/example", 
                     { templateUrl: "angular/validatorsViews/example.html" })
        
        //CHAPTER 10
        $router.when("/index", { templateUrl:                     "angular/complexSchemasViews/index.html" })
        $router.when("/population", { templateUrl: "angular/complexSchemasViews/population.html" })
        
        
        
        $router.when("/todos", { templateUrl: "angular/src/todos.html" })
        .otherwise({ redirectTo: "/todos" });
    
    }]);
     
})();