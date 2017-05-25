
//  hide homepage when button pressed
$(document).ready(function () {
    $(".letter").click(function () {
        $('.home, .middle').hide(); //this will hide all the div(s) firstly
    });
});

// keep other screens hidden
$(".af").hide();
$(".gm").hide();
$(".nt").hide();
$(".uz").hide();



// show second screen when clicked
$(document).ready(function () {
    $(".a-f").click(function () {
        $('.af').show();
    });
});

$(document).ready(function () {
    $(".g-m").click(function () {
        $('.gm').show();
    });
});

$(document).ready(function () {
    $(".n-t").click(function () {
        $('.nt').show();
    });
});

$(document).ready(function () {
    $(".u-z").click(function () {
        $('.uz').show();
    });
});

// "typing"

$(function(){
    var $write = $('#write');
     
    $(' .char').click(function(){
        var $this = $(this),
            character = $this.html(); 
        if ($this.hasClass('space')) character = ' ';

        // Add the character
        $write.html($write.html() + character);
    });
});

//Backspace functionality: swipe left to backspace
var textbox = document.getElementById("write");
var backspace = new Hammer(textbox);
backspace.on("swipeleft", function() {
    var temp = textbox.innerHTML;
    var length = temp.length -  1;
    textbox.innerHTML = temp.substring(0, length);
});

