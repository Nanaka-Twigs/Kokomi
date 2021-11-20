$(document).ready(function() {
    $("#user_panel_container").hide();
});

function user_log_in() {
    touch.play();
    $.get("sys/func/user/user.php", { auth_type: 0 }, function(data) {
        $("#user_panel_container").html(data).fadeIn('fast');
    });

}

function user_sign_up() {
    touch.play();
    $.get("sys/func/user/user.php", { auth_type: 1 }, function(data) {
        $("#user_panel_container").html(data).fadeIn('fast');
    });
}

function user_log_out() {
    touch.play();
    $('#menu_sub_button_log_out').hide();
    $('#menu_sub_button_log_in').show();
    $('#menu_sub_button_sign_up').show();
    setCookie('user', "", 0);
    display_user_data();
}

function close_user_panel() {
    touch.play();
    $("#user_panel_container").fadeOut('fast');
}

function user_form_submit(key) {
    touch.play();
    var usn = $("#user_panel_usn").val();
    var psw = $("#user_panel_psw").val();
    $.post("sys/func/user/user_auth.php", { 'usn': usn, 'psw': psw, 'auth_type': key },
        function(data) {
            var user = JSON.parse(data);
            if (user['msg'] == 'ok') {
                setCookie('user', user['user'], 1);
                $("#user_panel_usn").val("");
                $("#user_panel_psw").val("");
                close_user_panel();
                display_user_data();
            } else {
                msg_pop_up(user['msg']);
            }
        }
    );
}

function display_user_data() {
    var usn = getCookie('user');
    console.log(usn);
    if (!usn == "") {
        $('#menu_main_button_user').html(`你好，${usn}`);
        $('#menu_sub_button_log_out').show();
        $('#menu_sub_button_log_in').hide();
        $('#menu_sub_button_sign_up').hide();
    } else {
        $('#menu_main_button_user').html(`用户`);
    }
}

display_user_data();