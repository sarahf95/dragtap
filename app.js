//Stores the phrases needed for testing in array
$(".phrases").hide();
var rawText = $(".phrases").text();
var phrases = rawText.split('\n');
for( var i = 0; i < phrases.length; i++) {
    phrases[i] = phrases[i].trim();    
}

//  hide homepage when button pressed
$(document).ready(function () {
    $(".letter").mousedown(function () {
        $('.home, .middle').hide(); //this will hide all the div(s) firstly
    });
});

// keep other screens hidden
$(".af").hide();
$(".gm").hide();
$(".nt").hide();
$(".uz").hide();

//Hides test directions initially
$(".test").hide();

//Hides results section as well in test area
$(".resultssection").hide();

//Used so that the program can tell if a test is active.
var test = false;

//Controls functionality to start test.
$(".starttest").click(function () {
    $(".demo").hide();
    $(".test").show();
    test = true;
    var filename = alert("Click ok to start test");
    textTest();
});

// show second screen when clicked
$(document).ready(function () {
    $(".a-f").mousedown(function () {
        $('.af').show();
    });
});

$(document).ready(function () {
    $(".g-m").mousedown(function () {
        $('.gm').show();
    });
});

$(document).ready(function () {
    $(".n-t").mousedown(function () {
        $('.nt').show();
    });
});

$(document).ready(function () {
    $(".u-z").mousedown(function () {
        $('.uz').show();
    });
});

// "typing" for keyboard
$(function(){
    var $write = $('#write');

    //Typing with drag
    $('.char').mouseup(function(){
        var $this = $(this),
        character = $this.html(); 

        // Add the character
        $write.html($write.html() + character);
            
        $($this.parent().parent()).hide();
        $('.home, .middle').show();
    });
});

//Space bar functionality
$(function(){
    var $write = $('#write');   
    var character = ' ';
    //Typing with click 
    $('#space').mousedown(function(){
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


//Preforms a 45 phrase test for keyboard
function textTest() {
    test = true;
    var results = $(".results");
    results.append(document.createTextNode("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>"));
    $(".resultssection").show();
    test = false;
}



