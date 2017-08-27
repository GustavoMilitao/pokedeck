angular.module('pokedeck', [])
    .controller('loginCtrl', [function () {
        angular.element(document).ready(function () {
            var cookie = getCookie('user');
            var data = { user: cookie }
            if (cookie && cookie != "") {
                $http.get('/Login/Recover',
                    JSON.stringify(data))
                    .success(function () {
                        // redirect to home page
                    });
            }
        });
    }]);


var app = angular.module('pokedeck', []);
app.controller('loginCtrl', function ($scope, $http) {
    $scope.form = {
        login: "",
        senha: "",
        keeploggedin: false,
    };
    $scope.showAlert = function () {
        $scope.myvalue = true;
    };
    $scope.hideAlert = function () {
        $scope.myvalue = false;
    };
    $scope.submitForm = function () {
        $http({
            method: "POST",
            url: '/login',
            headers: {
                'Content-Type': "application/json"
              },
            data: {
                user: $scope.form.user,
                senha: $scope.form.senha
            }
        })
            .then(function (success) {
                if (success.data.success) {
                    res.redirect('/home');
                } else {
                    showAlert();
                    setTimeout(function () { hideAlert(); }, 3000);
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