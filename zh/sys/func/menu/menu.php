<div class="content" id="block_menu">
    <div id="menu_title">Kokomi</div>

    <div class="menu_main_button" id="menu_main_button_user" onclick="toggle_menu(0)">用户</div>
    <div class="menu_sub_menu_container" id="menu_sub_menu_container_user">
        <div class="menu_sub_button" id="menu_sub_button_log_in" onclick="user_log_in()">登录</div>
        <div class="menu_sub_button" id="menu_sub_button_sign_up" onclick="user_sign_up()">注册</div>
        <div class="menu_sub_button" id="menu_sub_button_log_out" onclick="user_log_out()">登出</div>
    </div>

    <div class="menu_main_button" id="menu_main_button_mode" onclick="toggle_menu(1)">模式</div>
    <div class="menu_sub_menu_container" id="menu_sub_menu_container_mode">
        <div class="menu_sub_button" id="menu_sub_button_mode0" onclick="game_mode(0)">简单</div>
        <div class="menu_sub_button" id="menu_sub_button_mode1" onclick="game_mode(1)">苦难</div>
        <div class="menu_sub_button" id="menu_sub_button_mode2" onclick="game_mode(2)">噩梦</div>
    </div>
</div>