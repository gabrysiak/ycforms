    var myApp = angular.module('ycforms',[]);

    //myApp.directive('myDirective', function() {});
    //myApp.factory('myService', function() {});

    function ContentCtrl($scope) {
      $scope.sizes = [ {value: "text", text: "Input Text"}, {value: "button", text: "Button"}, {value: "popUpButton", text: "Selectbox"}];
      $scope.update = function() {
        console.log($scope.item.value, $scope.item.text)
      }
    }