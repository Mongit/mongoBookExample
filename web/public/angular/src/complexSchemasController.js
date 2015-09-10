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
                console.log("CREO QUE SE GUARDO EXITOSAMENTE");
                $location.path('/todos');
            }).error(function(data, status, headers, config) {
                console.log('%s %s %s', config.method, config.url, status);
            });
        }
        
    }]);
})();
