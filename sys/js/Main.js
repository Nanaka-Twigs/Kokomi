var game = new Game();

var touch = new Sound("sys/sound/touch.mp3");

$("#user_panel_container").hide();

const translation_key = [
    // user_panel_container
    'user_panel_form_label1',
    'user_panel_form_label2',
    'user_panel_log_in',
    'user_panel_sign_up',
    // block_menu
    //
    'menu_main_button_user',
    'menu_sub_button_log_in',
    'menu_sub_button_sign_up',
    // 
    'menu_main_button_lang',
    //
    'menu_main_button_mode',
    'menu_sub_button_mode0',
    'menu_sub_button_mode1',
    'menu_sub_button_mode2',
    // block_instruction
    'instruction_title',
    'instruction_text1',
    'instruction_text2',
    'instruction_text3',
    'instruction_go_back',
    'instruction_ready',
    // block_game
    'game_info_back',
    'game_hint',
    // result
    'result_comment_999',
    'result_comment_0',
    'result_comment_1',
    'result_comment_2',
    'result_comment_3',
    'result_comment_4',
    'result_go_back',
];
const translation = {
    en: {
        // user_panel_container
        'user_panel_form_label1': 'Username',
        'user_panel_form_label2': 'Password',
        'user_panel_log_in': 'Log in',
        'user_panel_sign_up': 'Sign up',
        //
        'menu_main_button_user': 'User',
        'menu_sub_button_log_in': 'Log in',
        'menu_sub_button_sign_up': 'Sign up',
        // 
        'menu_main_button_lang': 'Language',
        //
        'menu_main_button_mode': 'Mode',
        'menu_sub_button_mode0': 'Easy',
        'menu_sub_button_mode1': 'Hard',
        'menu_sub_button_mode2': 'Hard',
        //
        // block_instruction
        'instruction_title': 'How to Play',
        'instruction_text1': `<p><strong>「Color Question」</strong></p>
        <p>The color question is consist of two colors: the Text Color and the Background Color.</p>
        `,
        'instruction_text2': `<p><strong>「Math Question」</strong></p>
        <p>Solve the math question and determine whether the answer is even or odd.</p>
        `,
        'instruction_text3': `<p><strong>「Color Block」</strong></p>
        <p>Pick the correct color block based on the anwser from the math question. Chose Text Color is the answer is even; chose Background Color is the answer is odd. You will lose mark if you select the wrong answer.</p>
        `,
        'instruction_go_back': 'Back',
        'instruction_ready': `I'm ready!`,
        // block_game
        'game_info_back': 'Back',
        'game_hint': `<p>Even: Text Color</p>
        <p>Odd: Background</p>`,
        // result
        result_comment_999: `It's time to top up your IQ.`,
        result_comment_0: `So so.`,
        result_comment_1: `Good.`,
        result_comment_2: `Faith will move mountains to open.`,
        result_comment_3: `Your wisdom makes the stars tremble.`,
        result_comment_4: `You are an alien, are you!`,
        result_go_back: 'Home'
    },
    cn: {
        // user_panel_container
        'user_panel_form_label1': '用户名称',
        'user_panel_form_label2': '用户密码',
        'user_panel_log_in': '登录',
        'user_panel_sign_up': '注册',
        //
        //
        'menu_main_button_user': '用户',
        'menu_sub_button_log_in': '登录',
        'menu_sub_button_sign_up': '注册',
        // 
        'menu_main_button_lang': '语言',
        //
        'menu_main_button_mode': '模式',
        'menu_sub_button_mode0': '简单',
        'menu_sub_button_mode1': '困难',
        'menu_sub_button_mode2': '噩梦',
        //
        // block_instruction
        'instruction_title': '游戏规则',
        'instruction_text1': `<p><strong>「颜色题」</strong></p>
        <p>颜色题由两种颜色构成：文字颜色，以及背景颜色</p>
        `,
        'instruction_text2': `<p><strong>「数学题」</strong></p>
        <p>演算数学题的答案，判断其实偶数还是奇数。</p>
        `,
        'instruction_text3': `<p><strong>「色块」</strong></p>
        <p>根据数学题的答案选择正确的色块。偶数选择文字颜色，奇书选择背景颜色。选错会受到惩罚。</p>
        `,
        'instruction_go_back': '菜单',
        'instruction_ready': `准备好了`,
        // block_game
        'game_info_back': '菜单',
        'game_hint': `
        <p>偶数：文字颜色</p>
        <p>奇数：背景颜色</p>
        `,
        // result
        result_comment_999: `你的智商该充值了。`,
        result_comment_0: `一般般。`,
        result_comment_1: `不错。`,
        result_comment_2: `精诚所至，金石为开。`,
        result_comment_3: `你的智慧令群星颤抖。`,
        result_comment_4: `你是外星人吧，是吧！`,
        result_go_back: '菜单'
    }
}

// Hach mode
var str = "";
document.addEventListener('keypress', hackcode);

function hackcode(e) {
    var key = e.code.slice(-1);
    str += key;
    if (str.slice(-3, -1) == "DE" && key == "V") {
        console.log('Dev mode is on!');
        game.dev = true;
    }
}

// Toggle bind



function switch_language(lang) {
    touch.play();
    game.switch_language(lang);
    for (var key of translation_key) {
        document.getElementById(key).innerHTML = translation[lang][key];

    }

}

function back_to_menu() {
    touch.play();
    game.back_to_menu();
}

function game_mode(mode) {
    touch.play();
    game.display_instruction(mode);
}

function game_start() {
    touch.play();
    game.game_start();
}

function match(key) {
    game.match(key);

}

function game_stop() {
    touch.play();
    game.game_break();;
}