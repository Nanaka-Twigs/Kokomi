function user_log_in() {
    touch.play();
    $("#user_panel_container").fadeIn('fast');
    $(".user_panel_submit").hide();
    $("#user_panel_log_in").show();

}

function user_sign_up() {
    touch.play();
    $("#user_panel_container").fadeIn('fast');
    $(".user_panel_submit").hide();
    $("#user_panel_sign_up").show();
}

function close_user_panel() {
    touch.play();
    $("#user_panel_container").fadeOut('fast');
}

function user_form_submit(key) {
    touch.play();
    var usn = $("#user_panel_usn").val();
    var psw = $("#user_panel_psw").val();
    $.post("sys/func/user_auth.php", { "usn": usn, "psw": psw },
        function(data) {
            console.log(data);
            var user = JSON.parse(data);
            console.log(user);
            $("#user_panel_usn").val("");
            $("#user_panel_psw").val("");
        }
    );

}