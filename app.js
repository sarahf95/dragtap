
//  hide homepage when button pressed
$(document).ready(function () {
    $(".letter").click(function () {
        $('.home, .middle').hide(); //this will hide all the div(s) firstly
    });
});

// keep other screens hidden
$(".af").hide();


// show second screen when clicked
$(document).ready(function () {
    $(".a-f").click(function () {
        $('.af').show();
    });
});

// "typing"

$(function(){
    var $write = $('#write');
     
    $('.af .char').click(function(){
        var $this = $(this),
            character = $this.html(); 
        if ($this.hasClass('space')) character = ' ';

        // Add the character
        $write.html($write.html() + character);
    });
});

