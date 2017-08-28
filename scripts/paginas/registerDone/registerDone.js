angular.module('pokedeck', [])
.controller('registerDoneCtrl', [function () {
    angular.element(document).ready(function () {
            setTimeout(function(){window.location.href ="/home"}, 3000);
    });
}]);