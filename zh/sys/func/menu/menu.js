const slide_list = ["#menu_sub_menu_container_user", "#menu_sub_menu_container_mode"];

function toggle_menu(key) {
    touch.play();
    for (var i = 0; i < 2; i++) {
        if (key != i) {
            $(slide_list[i]).slideUp();
        } else {
            $(slide_list[key]).slideToggle();
        }
    }
}

$(document).ready(function() {
    $('#menu_sub_button_log_out').hide();
});