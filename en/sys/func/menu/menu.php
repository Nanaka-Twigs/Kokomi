<div class="content" id="block_menu">
    <div id="menu_title">Kokomi</div>

    <div class="menu_main_button" id="menu_main_button_user" onclick="toggle_menu(0)">User</div>
    <div class="menu_sub_menu_container" id="menu_sub_menu_container_user">
        <div class="menu_sub_button" id="menu_sub_button_log_in" onclick="user_log_in()">Log in</div>
        <div class="menu_sub_button" id="menu_sub_button_sign_up" onclick="user_sign_up()">Sign up</div>
        <div class="menu_sub_button" id="menu_sub_button_log_out" onclick="user_log_out()">Log out</div>
    </div>

    <div class="menu_main_button" id="menu_main_button_mode" onclick="toggle_menu(1)">Mode</div>
    <div class="menu_sub_menu_container" id="menu_sub_menu_container_mode">
        <div class="menu_sub_button" id="menu_sub_button_mode0" onclick="game_mode(0)">Easy</div>
        <div class="menu_sub_button" id="menu_sub_button_mode1" onclick="game_mode(1)">Hard</div>
        <div class="menu_sub_button" id="menu_sub_button_mode2" onclick="game_mode(2)">Hell</div>
    </div>
</div>