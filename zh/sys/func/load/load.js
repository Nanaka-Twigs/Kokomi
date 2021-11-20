$(document).ready(function() {

    // change load text
    var ct = 0;
    var load_text = setInterval(() => {
        if (ct == 0) {
            $('#load_text').html('.....');
            ct = 1;
        } else {
            ct = 0;
            $('#load_text').html('...');
        }
    }, 1000);

    // moniter height change of load text
    var ph = $('#load_monitor').innerHeight();
    var font_check = setInterval(() => {
        var h = $('#load_monitor').innerHeight();
        console.log(h);
        if (ph != h) {
            clearInterval(font_check);
            clearInterval(load_text);
            clearTimeout(time_out);
            load_finish();
        }
    }, 10);

    // timelimit exceed
    var time_out = setTimeout(() => {
        clearInterval(font_check);
        clearInterval(load_text);
        load_finish();
    }, 5000);

});



function load_finish() {
    $("#load_text").html(">_<");
    $("#load_text").click(function() {
        yes.play();
        $("#load_text")
            .off('click')
            .css({
                color: 'rgb(90, 90, 90)'
            })
            .animate({
                fontSize: '800px'
            }, 1500);
        $("#load").animate({
            opacity: '0'
        }, 1500, () => {
            $("#load").remove();
        });
        $("#container").animate({
            display: 'show'
        }, 1500);
    });
}