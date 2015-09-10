(function() {
    var app = angular.module('app');
    
    app.controller('ComplexSchemasController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.schemas = [];
        
        $http.get('/api/complexSchemas/population'). success(function(data) {
            console.dir(data);
            ctrl.schemas = data;
        }).error(function(data, status, headers, config) {
            console.log('%s %s %s', config.method, config.url, status);
        });
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('PopulationController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl._id = undefined;
        ctrl.name = undefined;
        ctrl.age = undefined;
        
        ctrl.title = undefined;
        
        ctrl.save = function(){
            $http({
                url: '/api/complexSchemas/population',
                method: "POST",
                data: ctrl,
            }).success(function(data, status, headers, config) {
                $location.path('/todos');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();
