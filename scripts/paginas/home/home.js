angular.module('pokedeck', [])
.controller('homeCtrl', [function () {
    angular.element(document).ready(function () {
        var cookie = getCookie('user');
        var data = { user: cookie }
        if (cookie && cookie != "") {
            if(!sessionStorage.getItem("user")){
            sessionStorage.setItem("user",cookie);
            }
        }
    });
}]);


var app = angular.module('pokedeck', []);
app.controller('homeCtrl', function ($scope, $http, $timeout) {


    var user;

    var userId = sessionStorage.getItem("user");
    $http({
        method: "GET",
        url: '/users/'+userId,
        headers: {
            'Content-Type': "application/json"
          },
        data: {}
    })
        .then(function (success) {
            if (success.data.success) {
                user = success.data.user;
            }
        });


    $scope.form = {
        user: user.user,
        teams:[]
    };
    
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}