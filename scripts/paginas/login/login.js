angular.module('pokedeck', [])
    .controller('loginCtrl', [function () {
        angular.element(document).ready(function () {
            var cookie = getCookie('user');
            if(cookie){
                window.location.href = "/home";
            }
        });
    }]);


var app = angular.module('pokedeck', []);
app.controller('loginCtrl', function ($scope, $http, $timeout) {
    $scope.form = {
        email: "",
        password: ""
    };
    $scope.shown = false;
    $scope.showAlert = function () {
        $scope.shown = true;
    };
    $scope.hideAlert = function () {
        $scope.shown = false;
    };
    $scope.submitForm = function () {
        $http({
            method: "POST",
            url: '/login',
            headers: {
                'Content-Type': "application/json"
              },
            data: {
                email: $scope.form.email,
                password: $scope.form.password
            }
        })
            .then(function (success) {
                if (success.data.success) {
                    setCookie("user",success.data.user,365);
                    window.location.href = "/home";
                } else {
                    $scope.showAlert();
                    $timeout(function () { 
                        $scope.hideAlert(); 
                    }, 3000);
                }
            }, function (error) {
                alert(error);
            });
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