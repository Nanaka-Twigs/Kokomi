<?php

$usn = 'Username';
$psw = 'Password';
$login = 'Log in';
$signup = 'Sign up';

if ($_GET['auth_type'] == 0) {
    echo (<<<str
        <div id="user_panel">
            <div id="user_panel_close" onclick="close_user_panel()"></div>
            <div id="user_panel_form">
                <div class="user_panel_form_label" id="user_panel_form_label1">$usn</div>
                <input type="text" id="user_panel_usn" class="user_panel_form_input" name="sign_in_usn"><br>
                <div class="user_panel_form_label" id="user_panel_form_label2">$psw</div>
                <input type="password" id="user_panel_psw" class="user_panel_form_input" name="sign_in_psw"><br>
                <div id="user_panel_log_in" class="user_panel_submit" onclick="user_form_submit(0)">$login</div>
            </div>
        </div>
        str);
} else if ($_GET['auth_type'] == 1) {
    echo (<<<str
        <div id="user_panel">
            <div id="user_panel_close" onclick="close_user_panel()"></div>
            <div id="user_panel_form">
                <div class="user_panel_form_label" id="user_panel_form_label1">$usn</div>
                <input type="text" id="user_panel_usn" class="user_panel_form_input" name="sign_in_usn"><br>
                <div class="user_panel_form_label" id="user_panel_form_label2">$psw</div>
                <input type="password" id="user_panel_psw" class="user_panel_form_input" name="sign_in_psw"><br>
                <div id="user_panel_sign_up" class="user_panel_submit" onclick="user_form_submit(1)">$signup</div>
            </div>
        </div>
        str);
}
