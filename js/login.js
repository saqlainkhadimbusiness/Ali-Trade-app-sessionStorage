$(document).ready(function() {
    $("#login").click(function() {
        if ($("#email").val() == "1122@trade.com" && $("#password").val() == "1122") {
            window.location.replace("market.html");

        } else {
            alert("Email or password is inccorect.");
        }


    });
});