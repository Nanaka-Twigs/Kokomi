$(document).ready(function() {
    setTimeout(function() {
        $("#load_end").show();
        $("#load_txt").hide();
    }, 1000);

});

function loading_finish() {
    $('#container').show();
    $('#load').fadeOut();
}