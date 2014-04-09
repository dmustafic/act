angular.module('act', ['ui.bootstrap', 'ngTouch'], function($httpProvider){
  FastClick.attach(document.body);
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).run(['$location', function($location){
  //Allows us to navigate to the correct element on initialization
  if ($location.path() !== '' && $location.path() !== '/') {
    smoothScroll(document.getElementById($location.path().substring(1)), 500, function(el) {
      location.replace(el.id);
    });
  }
}]);


function MainCtrl($scope, $http, $document, $modal, orderByFilter) {
  $scope.showBuildModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'buildModal.html',
      controller: 'SelectModulesCtrl',
      resolve: {
        modules: function() {
          return $http.get(builderUrl + "/api/bootstrap").then(function(response) {
            return response.data.modules;
          });
        }
      }
    });
  };


  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}
