const mode_time_out = [600, 1200, 1800];
const penalty = [1, 2, 3];

// color
const hue = ['0', '30', '60', '120', '173', '210', '285'];
const color_txt = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple'];
var colors = {};
for (var i = 0; i < 7; i++) {
    colors[i] = {
        txt: color_txt[i],
        dark: `hsl(${hue[i]}, 100%, 20%)`,
        light: `hsl(${hue[i]}, 100%, 95%)`
    };
}
const rank_game_mode = {
    0: 'Easy',
    1: 'Hard',
    2: 'Hell'
}

class Game {

    mode = 0;
    score = 0;
    timer;
    answer;

    color_map;

    dev = false;

    constructor() {
        this.color_map = [0, 1, 2, 3, 4, 5, 6];
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
                // this.display_result();
                this.upload_score();
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
        var choice = method[this.mode]();

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
                ${colors[text]['txt']}
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

    single_digit_multiplication() {
        var x = Randin(9) + 1;
        var y = Randin(9) + 1;
        document.getElementById('game_content_math_question').innerHTML = `${x} × ${y}`;
        return x * y % 2;
    }

    two_digit_addition() {
        var x = Randin(89) + 10;
        var y = Randin(89) + 10;
        var ans = (x + y).toString();
        var r = Randin(ans.length);
        document.getElementById('game_content_math_question').innerHTML = `${nst(r+1)} digit of ${x} + ${y}`;
        return ans[r] % 2;
    }

    two_single_digit_multiplication() {
        var x = Randin(89) + 10;
        var y = Randin(9) + 1;
        var ans = (x * y).toString();
        var r = Randin(ans.length);
        document.getElementById('game_content_math_question').innerHTML = `${nst(r+1)} digit of ${x} × ${y}`;
        return ans[r] % 2;
    }

    upload_score() {
        $('#block_result').show();
        $('#result_score').html(this.score);
        var usn = getCookie('user');
        $.post("sys/func/game/upload_score.php", { 'usn': usn, 'score': this.score, 'mode': this.mode },
            function(data) {
                $('#world_rank_table').empty();
                $('#world_rank_table').html(
                    `<tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>`
                );
                var ranks = JSON.parse(data);
                var rk = 0;
                var pr_scr = 999999999;
                for (var i of ranks) {
                    if (i[1] != pr_scr) {
                        rk++;
                        pr_scr = i[1];
                    }
                    if (i[0] == usn) {
                        var your_rank = rk;
                    }
                    $('#world_rank_table').append(
                        `<tr>
                            <td>${rk}</td>
                            <td>${i[0]}</td>
                            <td>${i[1]}</td>
                        </tr>`
                    );
                }
                if (getCookie('user') == "") {
                    $('#world_rank_position').html(`Login to see your ranking.`);
                } else {
                    $('#world_rank_position').html(`Your are at the ${nst(your_rank)} position.`);
                }

            }
        );
        $('#world_rank_title').html('World Rank·' + rank_game_mode[this.mode]);
    }
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
    n = "" + n;
    if (n.endsWith('2')) {
        return n.slice(0, -1) + '2nd';
    } else if (n.endsWith('3')) {
        return n.slice(0, -1) + '3rd';
    } else {
        return n + 'st';
    }
}

var game = new Game();



function game_mode(mode) {
    touch.play();
    game.display_instruction(mode);
}


function match(key) {
    game.match(key);

}

function game_stop() {
    touch.play();
    game.game_break();;
}