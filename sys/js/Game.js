const mode_time_out = [600, 1200, 1800];
const penalty = [1, 2, 3];
const comment_for_score = [
    [60, 120, 180],
    [35, 50, 60],
    [25, 35, 40],
    [15, 20, 20],
    [5, 5, 5]
];

var yes = new Sound("sys/sound/yes.mp3");
var no = new Sound("sys/sound/no.mp3");
var end = new Sound("sys/sound/end.mp3");


// color
const hue = ['0', '30', '60', '120', '173', '210', '285'];
const color_en = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple'];
const color_cn = ['赤', '橙', '黄', '绿', '青', '蓝', '紫'];
var colors = {};
for (var i = 0; i < 7; i++) {
    colors[i] = {
        en: color_en[i],
        cn: color_cn[i],
        dark: `hsl(${hue[i]}, 100%, 20%)`,
        light: `hsl(${hue[i]}, 100%, 95%)`
    };
}

const score_mark = {
    en: 'Score: ',
    cn: '得分：'
}



class Game {

    language = 'en';

    mode = 0;
    score = 0;
    timer;
    answer;

    color_map;

    dev = false;

    constructor() {
        this.color_map = [0, 1, 2, 3, 4, 5, 6];
    }

    switch_language(key) {
        this.language = key;
    }

    display_instruction(mode) {
        this.mode = mode;
        document.getElementById('block_menu').style.display = 'none';
        document.getElementById('block_instruction').style.display = 'block';

    }

    game_start() {
        // display the game block
        document.getElementById('block_instruction').style.display = 'none';
        document.getElementById('block_game').style.display = 'block';

        // determine time based on mode
        var time_out = mode_time_out[this.mode];
        this.timer = setInterval(() => {
            document.getElementById("game_info_timer").innerHTML = time_out;
            if (time_out <= 0) {
                end.play();
                this.game_finish();
                this.display_result();
                clearInterval(this.timer);
            }
            time_out--;
        }, 100);
        this.score = 0;
        this.update_score();
        this.produce();
    }

    back_to_menu() {
        document.getElementById('block_instruction').style.display = 'none';
        document.getElementById('block_result').style.display = 'none';
        document.getElementById('block_game').style.display = 'none';
        document.getElementById('block_menu').style.display = 'block';
    }

    update_score() {
        document.getElementById("game_info_score").innerHTML = this.score;
    }

    produce() {
        // a list of 7 random color, we only wnat 6
        var random_colors = this.color_map.sort(() => Math.random() - 0.5).slice(0, -1);
        // a random color
        var fake_color = Randin(6);
        // the actual color
        var actual_color = Randin(6);
        while (fake_color == actual_color) {
            actual_color = Randin(6);
        }
        this.answer = actual_color;
        fake_color = random_colors[fake_color];
        actual_color = random_colors[actual_color];

        // start making the multiple choice answer
        document.getElementById("game_answer").innerHTML = "";
        for (var i = 0; i < 6; i++) {
            var col = colors[random_colors[i]];
            document.getElementById("game_answer").innerHTML += `
                <div class="multiple_choice" onclick="match(${i})" style="color: ${col.light}; background-color: ${col.light}; border: 1px solid ${col.dark}">
                    X
                </div>
            `;
        }

        var method = [this.single_digit_multiplication, this.two_digit_addition, this.two_single_digit_multiplication];
        var choice = method[this.mode](this.language);

        // 0: background; 1: text
        if (choice == 0) {
            var col = colors[fake_color];
            var text = actual_color;
        } else if (choice == 1) {
            var col = colors[actual_color];
            var text = fake_color;
        }
        document.getElementById("game_content_color_text").innerHTML = `
            <div style="color: ${col.dark}; background-color: ${col.light}; border: 1px solid ${col.dark}">
                ${colors[text][this.language]}
            </div>`;
    }

    match(key) {
        if (key == this.answer || this.dev) {
            this.score += 1;
            yes.play();
        } else {
            this.score -= penalty[this.mode];
            no.play();
        }
        this.update_score();
        this.produce();
    }

    game_break() {
        this.game_finish();
        this.back_to_menu();
    }

    game_finish() {
        document.getElementById('block_game').style.display = 'none';
        clearInterval(this.timer);
    }

    display_result() {
        document.getElementById('block_result').style.display = 'block';

        document.getElementById('result_score').innerHTML = `${score_mark[this.language]}${this.score}`;

        var comments = document.getElementsByClassName('result_comment');
        for (var i of comments) {
            i.style.display = 'none';
        }
        if (this.score > comment_for_score[0][this.mode]) {
            document.getElementById('result_comment_4').style.display = 'block';
        } else if (this.score > comment_for_score[1][this.mode]) {
            document.getElementById('result_comment_3').style.display = 'block';
        } else if (this.score > comment_for_score[2][this.mode]) {
            document.getElementById('result_comment_2').style.display = 'block';
        } else if (this.score > comment_for_score[3][this.mode]) {
            document.getElementById('result_comment_1').style.display = 'block';
        } else if (this.score > comment_for_score[4][this.mode]) {
            document.getElementById('result_comment_0').style.display = 'block';
        } else {
            document.getElementById('result_comment_999').style.display = 'block';
        }

    }

    single_digit_multiplication(lg) {
        var x = Randin(9) + 1;
        var y = Randin(9) + 1;
        document.getElementById('game_content_math_question').innerHTML = `${x} × ${y}`;
        return x * y % 2;
    }

    two_digit_addition(lg) {
        var x = Randin(89) + 10;
        var y = Randin(89) + 10;
        var ans = (x + y).toString();
        var r = Randin(ans.length);
        if (lg == 'en') {
            document.getElementById('game_content_math_question').innerHTML = `${nst(r+1)} digit of ${x} + ${y}`;
        } else if (lg == 'cn') {
            document.getElementById('game_content_math_question').innerHTML = `${x} + ${y} 的第${(r+1)}位数`;
        }

        return ans[r] % 2;
    }

    two_single_digit_multiplication(lg) {
        var x = Randin(89) + 10;
        var y = Randin(9) + 1;
        var ans = (x * y).toString();
        var r = Randin(ans.length);
        if (lg == 'en') {
            document.getElementById('game_content_math_question').innerHTML = `${nst(r+1)} digit of ${x} × ${y}`;
        } else if (lg == 'cn') {
            document.getElementById('game_content_math_question').innerHTML = `${x} × ${y} 的第${(r+1)}位数`;
        }
        return ans[r] % 2;
    }


    // back() {
    //     document.getElementById('game').style.display = 'none';
    //     this.audio.pause();
    //     this.audio.currentTime = 0;
    //     clearInterval(this.bgm);
    //     document.getElementById('menu').style.display = 'block';
    // }

    // end() {
    //     document.getElementById('game').style.display = 'none';
    //     this.audio.pause();
    //     this.audio.currentTime = 0;
    //     clearInterval(this.bgm);
    //     this.display_score();
    // }

    // update_score() {
    //     document.getElementById("game_info_score").innerHTML = this.score;
    // }

    // produce() {
    //     // a list a 6 random letter
    //     var letters = Random(26, 6);
    //     // a random selection out of 7 letter
    //     var current_letter = Randin(6);

    //     // a list of 7 random color, we on
    //     var random_colors = this.color.sort(() => Math.random() - 0.5).slice(0, -1);
    //     // a random color
    //     var fake_color = random_colors[Randin(6)];
    //     // the actual color
    //     var actual_color;

    //     // start mapping the questions
    //     document.getElementById("selection").innerHTML = "";
    //     for (var i = 0; i < 6; i++) {
    //         var col = this.colors[random_colors[i]];
    //         var ltr = this.letters[letters[i]];
    //         document.getElementById("selection").innerHTML += `
    //             <div class="multiple_choice" style="color: ${col.dark}; background-color: ${col.light}; border: 1px solid ${col.dark}">
    //                 ${ltr}
    //             </div>
    //         `;
    //         if (i == current_letter) {
    //             actual_color = random_colors[i];
    //             current_letter = letters[i];
    //         }
    //     }

    //     // little math question
    //     var x = Randin(9) + 1;
    //     var y = Randin(9) + 1;
    //     var choice = x * y % 2;
    //     document.getElementById("math_question").innerHTML = `${x} x ${y}`;

    //     // choice = 0 : the text is the color; choice = 1 : the color of text is the color
    //     if (choice == 0) {
    //         var col = this.colors[fake_color];
    //         var text = actual_color;
    //     } else if (choice == 1) {
    //         var col = this.colors[actual_color];
    //         var text = fake_color;
    //     }
    //     document.getElementById("color_question").innerHTML = `
    //         <div style="color: ${col.dark}; background-color: ${col.light}; border: 1px solid ${col.dark}">
    //             ${text}
    //         </div>`;

    //     this.current_letter = this.letters[current_letter];
    // }

    // display_score() {
    //     document.getElementById('result').style.display = 'block';
    //     this.score = document.getElementById("score").innerHTML;
    //     document.getElementById("final").innerHTML = `${this.score}`;
    //     if (this.score > 120) {
    //         document.getElementById("comment").innerHTML = `At least one question per second ... Are you alien?`;
    //     } else if (this.score > 100) {
    //         document.getElementById("comment").innerHTML = `How many years have you been single?`;
    //     } else if (this.score > 80) {
    //         document.getElementById("comment").innerHTML = `You are the fastest man alive!`;
    //     } else if (this.score > 60) {
    //         document.getElementById("comment").innerHTML = `Excenlent!`;
    //     } else if (this.score > 40) {
    //         document.getElementById("comment").innerHTML = `Keep going! You can do it!`;
    //     } else if (this.score > 20) {
    //         document.getElementById("comment").innerHTML = `Practive makes perfect!`;
    //     } else {
    //         document.getElementById("comment").innerHTML = `It's time to top up your IQ.`;
    //     }

    // }
}

function Random(length, num) {
    var result = [];
    var rand = Randin(length);
    while (true) {
        if (!result.includes(rand)) {
            result.push(rand);
        }
        if (result.length == num) {
            return result;
        }
        var rand = Randin(length);
    }
}

function Randin(length) {
    return Math.floor(Math.random() * length);
}

function nst(n) {
    if (n == 1) {
        return '1st';
    } else if (n == 2) {
        return '2nd';
    } else if (n == 3) {
        return '3rd';
    } else {
        return n + 'st';
    }
}