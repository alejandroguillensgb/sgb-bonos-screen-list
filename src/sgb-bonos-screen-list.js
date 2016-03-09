'use strict';

angular.module('sgb-bonos-screen-list', ['megazord'])
    .controller('sgb-bonos-screen-list-controller', ['$scope', '_router', '_screen', '_screenParams', '$http', '$appLoader', 'lodash', '$ionicPopup',
        function ($scope, _router, _screen, _screenParams, $http, $appLoader, _, $ionicPopup) {
        _screen.initialize($scope, _screenParams);

        $scope.params = _screenParams;

        function getData(){
            $appLoader.show();
            $http
                .get($scope.params.url)
                .success(function(data){
                    $appLoader.hide();
                    if(data.data){
                        var confirmPopup = $ionicPopup.confirm({
                            template: 'Algo ha ido mal',
                                buttons: [
                                    {text: 'OK'}
                                ]
                        });
                    }else{
                        filterResults(data.results);
                    }
                })
                .error(function(){
                    $appLoader.hide();
                    var confirmPopup = $ionicPopup.confirm({
                        template: 'Compruebe su conexión',
                            buttons: [
                                {text: 'OK'}
                            ]
                    });
                })
        };

        getData();

        $scope.update = function(){
            $http
                .get($scope.params.url)
                .success(function(data){
                    $scope.data = data;
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .error(function(err){
                    $scope.$broadcast('scroll.refreshComplete');
                    alert("Something wrong!");
                })
        };

        //Filter for venezuelan results
        function filterResults(results){
            $scope.filtered = _.filter(results, function(item){
                return (item['lightbox_link/_text'].indexOf('VENZ') != -1) ||
                        (item['lightbox_link/_text'].indexOf('PDVSA') != -1) ||
                        (item['lightbox_link/_text'].indexOf('ELECAR') != -1)
            });
            $scope.filteredItems = $scope.filtered;
        }

        $scope.searchQuery =  {
            value: ''
        }

        $scope.filterItems = function(searchQuery){
            var search = searchQuery.toLowerCase();
            $scope.filteredItems = _.filter($scope.filtered, function(item){
                return (item['lightbox_link/_text'] && item['lightbox_link/_text'].toLowerCase().indexOf(search) != -1);
            });
        };

        $scope.cancelSearch = function(){
            $scope.searchQuery.value = "";
            $scope.filteredItems = $scope.filtered;
        };

        $scope.goTo = function(event, item){
            //Nothing to do but fire the event
            _router.fireEvent({
                 name: event,
                 params: {
                   data: item
                 }
            })
        };
    }]);