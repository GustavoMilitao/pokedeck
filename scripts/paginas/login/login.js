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
    $scope.data = {
        login: "",
        senha: "",
        keeploggedin: false,
    };
    $scope.submitForm = function () {
        console.log("posting data....");
        $http.post('/',
            JSON.stringify($scope.data))
            .success(function () {
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