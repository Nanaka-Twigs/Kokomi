$(document).ready(function() {
    $('#msg').hide();
});

function close_msg() {
    $('#msg').fadeOut();
}

function msg_pop_up(txt) {
    $('#msg_txt').html(txt);
    $('#msg').fadeIn();
}