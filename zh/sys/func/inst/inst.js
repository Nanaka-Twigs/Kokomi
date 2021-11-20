$('#instruction_item1').hover(function() {
    $('#instruction_text1').fadeIn();
}, function() {
    $('#instruction_text1').fadeOut();
});

$('#instruction_item2').hover(function() {
    $('#instruction_text2').fadeIn();
}, function() {
    $('#instruction_text2').fadeOut();
});

$('#instruction_item3').hover(function() {
    $('#instruction_text3').fadeIn();
}, function() {
    $('#instruction_text3').fadeOut();
});

function back_to_menu() {
    touch.play();
    game.back_to_menu();
}

function game_start() {
    touch.play();
    game.game_start();
}