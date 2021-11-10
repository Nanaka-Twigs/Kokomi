const slide_list = ["#menu_sub_menu_container_user", "#menu_sub_menu_container_lang", "#menu_sub_menu_container_mode"];

function toggle_menu(key) {
    touch.play();
    for (var i = 0; i < 3; i++) {
        if (key != i) {
            $(slide_list[i]).slideUp();
        } else {
            $(slide_list[key]).slideToggle();
        }
    }
}