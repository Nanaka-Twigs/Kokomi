var game = new Game();

var touch = new Sound("sys/sound/touch.mp3");


const langs = ['en', 'cn'];
const lang_num = 2;
var current_lang = 0;

const translation_key = [
    'menu_switch_language',
    'menu_game_start_easy',
    'menu_game_start_hard',
    'menu_game_start_hell',
    'instruction_title',
    'instruction_go_back',
    'instruction_math_question',
    'instruction_color_question',
    'instruction_color_block',
    'instruction_ready',
    'game_hint',
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
        menu_switch_language: 'English',
        menu_game_start_easy: 'EASY',
        menu_game_start_hard: 'HARD',
        menu_game_start_hell: 'HELL',
        instruction_title: 'How to Play?',
        instruction_go_back: 'Back',
        instruction_math_question: `
            <p><strong>「Math Question」</strong></p>
            <p>Fistly, solve the math question and determine whether the answer is even or odd.</p>
        `,
        instruction_color_question: `
            <p><strong>「Color Question」</strong></p>
            <p>Secondly, look at the color question. If the answer from math question is even, focus on the Text Color; Otherwize, focus on the Background Color.</p>
        `,
        instruction_color_block: `
            <p><strong>「Color Block」</strong></p>
            <p>Finaly, Pick the correct color block. You will lose mark if you select the wrong answer.</p>
        `,
        instruction_ready: `I'm ready!`,
        game_hint: `
            <p>Even: Text Color</p>
            <p>Odd: Background</p>
        `,
        result_comment_999: `It's time to top up your IQ.`,
        result_comment_0: `So so.`,
        result_comment_1: `Good.`,
        result_comment_2: `Faith will move mountains to open.`,
        result_comment_3: `Your wisdom makes the stars tremble.`,
        result_comment_4: `You are an alien, are you!`,
        result_go_back: 'Home'
    },
    cn: {
        menu_switch_language: '中文',
        menu_game_start_easy: '简单模式',
        menu_game_start_hard: '困难模式',
        menu_game_start_hell: '地狱模式',
        instruction_title: '游戏规则',
        instruction_go_back: '选择模式',
        instruction_math_question: `
            <p><strong>「数学题」</strong></p>
            <p>首先，演算数学题的答案，判断其实偶数还是奇数。</p>
        `,
        instruction_color_question: `
            <p><strong>「颜色题」</strong></p>
            <p>随后，观察颜色题。假如数学题的答案为偶数，则选择文字颜色；反之则选择背景的颜色。</p>
        `,
        instruction_color_block: `
            <p><strong>「色块」</strong></p>
            <p>最后，选择正确的色块。假如选错，则会受到惩罚。</p>
        `,
        instruction_ready: `准备好了`,
        game_hint: `
            <p>偶数：文字颜色</p>
            <p>奇数：背景颜色</p>
        `,
        result_comment_999: `你的智商该充值了。`,
        result_comment_0: `一般般。`,
        result_comment_1: `不错。`,
        result_comment_2: `精诚所至，金石为开。`,
        result_comment_3: `你的智慧令群星颤抖。`,
        result_comment_4: `你是外星人吧，是吧！`,
        result_go_back: '菜单'
    }
}


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

function switch_language() {
    touch.play();
    current_lang++;
    if (current_lang >= lang_num) {
        current_lang = 0;
    }
    game.switch_language(langs[current_lang]);
    for (var key of translation_key) {
        document.getElementById(key).innerHTML = translation[langs[current_lang]][key];

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