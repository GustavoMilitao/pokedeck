$(document).ready(function () {
    var cookie = getCookie('IDrinkSessionID');
    if (cookie && cookie != "") {
        $.ajax({
            type: 'GET',
            url: '/Login/Recover',
            async: false,
            data: {
                sessionID: cookie
            },
            success: function (data) {

            }
        });
    }
});


$('#login-form').submit(function (e) {
    $.ajax({
        type: 'POST',
        url: '/Login',
        async: false, 
        data: {
            user: $('#user').val(),
            senha: $('#password').val(),
            keepLogged: $('#keep-logged').prop('checked') 
        }, 
        success: function (data){
            if (data.success) {
                setCookie("IDrinkSessionID", data.sessionID, data.days);
                // Store cookie
                //Redirect to page
            } else {
                alert(data.message);
            }
        },
        error: function (data){
            alert(data.message);
        }
    });
    e.preventDefault();
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