(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.emails = [];
        ctrl.number = [];
        ctrl.string = [];
        ctrl.errores = [];
        
        $http.get('/api/chapter/'). success(function(data) {
            ctrl.emails = data;
        }).error(function(data, status, headers, config) {
            console.log('%s %s %s', config.method, config.url, status);
        });
        $http.get('/api/chapter/number'). success(function(data) {
            ctrl.number = data;
        }).error(function(data, status, headers, config) {
            console.log('%s %s %s', config.method, config.url, status);
        });
        $http.get('/api/chapter/string'). success(function(data) {
            ctrl.string = data;
        }).error(function(data, status, headers, config) {
            console.log('%s %s %s', config.method, config.url, status);
        });
        $http.get('/api/chapter/error'). success(function(data) {
            console.log(data);
            ctrl.errores = data;
        }).error(function(data, status, headers, config) {
            console.log('%s %s %s', config.method, config.url, status);
        });
        
        ctrl.delete = function(id) {
            $http({
                url: '/api/chapter/' + id,
                method: "DELETE",
            }).success(function (data, status, headers, config) {
                $location.path('/');
            }).error(function (data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);                
            });
        }
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('EmailController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.email = '';
        
        ctrl.save = function(){
            $http({
                url: '/api/chapter',
                method: "POST",
                data: ctrl,
            }).success(function(data, status, headers, config) {
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('NumberController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.age = '';
        
        ctrl.save = function(){
            $http({
                url: '/api/chapter/number',
                method: "POST",
                data: ctrl,
            }).success(function(data, status, headers, config) {
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('StringController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.day = '';
        
        ctrl.save = function(){
            $http({
                url: '/api/chapter/string',
                method: "POST",
                data: ctrl,
            }).success(function(data, status, headers, config) {
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('ErrorController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.name = '';
        ctrl.email = '';
        
        ctrl.save = function(){
            $http({
                url: '/api/chapter/error',
                method: "POST",
                data: ctrl,
            }).success(function(data, status, headers, config) {
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();