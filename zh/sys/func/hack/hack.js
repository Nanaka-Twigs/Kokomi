var hack_str = "";
document.addEventListener('keypress', hackcode);

function hackcode(e) {
    var key = e.code.slice(-1);
    hack_str += key;
    if (hack_str.slice(-3, hack_str.length) == "DEV") {
        game.dev = true;
    }
    if (hack_str.slice(-3, hack_str.length) == "MSG") {
        msg_pop_up("?????");
    }
}