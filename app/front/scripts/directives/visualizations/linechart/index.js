'use strict';

var angular = require('angular');
var template = require('./template.html');
var visualizationsService = require('../../../services/visualizations');

angular.module('Application')
  .directive('lineChartVisualization', [
    '$timeout',
    function($timeout) {
      return {
        template: template,
        replace: false,
        restrict: 'E',
        scope: {
          params: '='
        },
        link: function($scope) {
          $scope.isVisible = true;
          $scope.state = visualizationsService
            .paramsToBabbageStateTimeSeries($scope.params);

          $scope.$watch('params', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              $scope.state = visualizationsService
                .paramsToBabbageStateTimeSeries($scope.params);
              $timeout(function() {
                $scope.isVisible = false;
                $timeout(function() {
                  $scope.isVisible = true;
                });
              });
            }
          }, true);
        }
      };
    }
  ]);
