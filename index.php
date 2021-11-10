<!doctype html>
<html>

<head>
    <title>Kokomi</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="sys/img/kokomi.jpg" type="image/jpg">
    <!-- css file -->
    <link rel="stylesheet" href="sys\css\load.css">
    <link rel="stylesheet" href="sys\css\main.css">
    <link rel="stylesheet" href="sys\css\menu.css">
    <link rel="stylesheet" href="sys\css\instruction.css">
    <link rel="stylesheet" href="sys\css\game.css">
    <link rel="stylesheet" href="sys\css\result.css">
    <link rel="stylesheet" href="sys\css\user.css">
    <!-- javascript file -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="sys\js\menu.js" defer></script>
    <script src="sys\js\user.js" defer></script>
    <script src="sys\js\sound.js" defer></script>
    <script src="sys\js\instruction.js" defer></script>
    <script src="sys\js\game.js" defer></script>
    <script src="sys\js\main.js" defer></script>
    <script src="sys\js\load.js" defer></script>
</head>

<body>
    <div id="load">
        <div id="load_title">Kokomi</div>
        <div id="load_monitor">
            <div id="load_txt">...</div>
            <div id="load_end" onclick="loading_finish()">>_<</div>
        </div>
    </div>
    <div id="container">
        <div id="user_panel_container">
            <div id="user_panel">
                <div id="user_panel_close" onclick="close_user_panel()">x</div>

                <div id="user_panel_form">
                    <div class="user_panel_form_label" id="user_panel_form_label1">Username</div>
                    <input type="text" id="user_panel_usn" class="user_panel_form_input" name="sign_in_usn"><br>
                    <div class="user_panel_form_label"  id="user_panel_form_label2">Password</div>
                    <input type="password" id="user_panel_psw" class="user_panel_form_input" name="sign_in_psw"><br>
                    <div id="user_panel_log_in" class="user_panel_submit" onclick="user_form_submit('in')">Log in</div>
                    <div id="user_panel_sign_up" class="user_panel_submit" onclick="user_form_submit('up')">Sign up</div>
                </div>
            </div>
        </div>

        <div class="content" id="block_menu">
            <div id="menu_title">Kokomi</div>

            <div class="menu_main_button" id="menu_main_button_user" onclick="toggle_menu(0)">User</div>
            <div class="menu_sub_menu_container" id="menu_sub_menu_container_user">
                <div class="menu_sub_button" id="menu_sub_button_log_in" onclick="user_log_in()">Log in</div>
                <div class="menu_sub_button" id="menu_sub_button_sign_up" onclick="user_sign_up()">Sign up</div>
            </div>

            <div class="menu_main_button" id="menu_main_button_lang" onclick="toggle_menu(1)">Language</div>
            <div class="menu_sub_menu_container" id="menu_sub_menu_container_lang">
                <div class="menu_sub_button" id="menu_sub_button_en" onclick="switch_language('en')">English</div>
                <div class="menu_sub_button" id="menu_sub_button_cn" onclick="switch_language('cn')">中文</div>
            </div>

            <div class="menu_main_button" id="menu_main_button_mode" onclick="toggle_menu(2)">Mode</div>
            <div class="menu_sub_menu_container" id="menu_sub_menu_container_mode">
                <div class="menu_sub_button" id="menu_sub_button_mode0" onclick="game_mode(0)">Easy</div>
                <div class="menu_sub_button" id="menu_sub_button_mode1" onclick="game_mode(1)">Hard</div>
                <div class="menu_sub_button" id="menu_sub_button_mode2" onclick="game_mode(2)">Hell</div>
            </div>
        </div>
        <div class="content" id="block_instruction">
            <div id="instruction_title">How to Play</div>

            <div id="instruction_frame">
                <div class="instruction_item" id="instruction_item1">
                    <div class="instruction_img" id="instruction_img1">
                        <img src='sys/img/inst1.png'>
                    </div>
                    <div class="instruction_text" id="instruction_text1">
                        <p><strong>「Color Question」</strong></p>
                        <p>The color question is consist of two colors: the Text Color and the Background Color.</p>
                    </div>
                </div>
                <div class="instruction_item" id="instruction_item2">
                    <div class="instruction_img" id="instruction_img2">
                        <img src='sys/img/inst2.png'>
                    </div>
                    <div class="instruction_text" id="instruction_text2">
                        <p><strong>「Math Question」</strong></p>
                        <p>Solve the math question and determine whether the answer is even or odd.</p>
                    </div>
                </div>
                <div class="instruction_item" id="instruction_item3">
                    <div class="instruction_img" id="instruction_img3">
                        <img src='sys/img/inst3.png'>
                    </div>
                    <div class="instruction_text" id="instruction_text3">
                        <p><strong>「Color Block」</strong></p>
                        <p>Pick the correct color block based on the anwser from the math question. Chose Text Color is the answer is even; chose Background Color is the answer is odd. You will lose mark if you select the wrong answer.</p>
                    </div>
                </div>
            </div>
            <div class="eibutton" id="instruction_go_back" onclick="back_to_menu()">Back</div>
            <div class="eibutton" id="instruction_ready" onclick="game_start()">I'm ready!</div>
        </div>
        <div class="content" id="block_game">
            <div id="game_info">
                <div class="eibutton" id="game_info_back" onclick="game_stop()">Back</div>
                <div class="eiblock" id="game_info_score"></div>
                <div class="eiblock" id="game_info_timer"></div>
            </div>
            <div id="game_content">
                <div id="game_content_color_text"></div>
                <div id="game_content_math_question"></div>
            </div>
            <div id="game_hint">
                <p>Even: Text Color</p>
                <p>Odd: Background</p>
            </div>
            <div id="game_answer_container">
                <div id="game_answer"></div>
            </div>


        </div>
        <div class="content" id="block_result">
            <div id="result_score"></div>
            <div class="result_comment" id="result_comment_999">
                It's time to top up your IQ.
            </div>
            <div class="result_comment" id="result_comment_0">
                So so.
            </div>
            <div class="result_comment" id="result_comment_1">
                Good.
            </div>
            <div class="result_comment" id="result_comment_2">
                Faith will move mountains to open.
            </div>
            <div class="result_comment" id="result_comment_3">
                Your wisdom makes the stars tremble.
            </div>
            <div class="result_comment" id="result_comment_4">
                You are an alien, are you!
            </div>
            <div class="eibutton" id="result_go_back" onclick="back_to_menu()">Home</div>
        </div>
    </div>


</body>

</html>