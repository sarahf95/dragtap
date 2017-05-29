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
$(".prompt").hide();

//Used so that the program can tell if a test is active.
var test = false;

//Counts trials
var count = 0;

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

//Swipe right to enter text (temporary)
var enterText = new Hammer(textbox);
enterText.on("swiperight", function() {
    //While test is still running
    if(test) {
        showNextQuestion();
    }
    
    //When test is finished
    if(count == 6) {
        $(".prompt").hide();
        $(".resultssection").show();
        test = false;      
    }
});


//Starts a 45 phrase test for keyboard
function textTest() {
    $(".prompt").show();
    test = true;
    var results = $(".results");
    results.append(document.createTextNode("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>"));
    showNextQuestion();
}

//Shows a new phrase
function showNextQuestion() {
        $(".input").empty();
        var singlePhrase = phrases[Math.floor((Math.random() * phrases.length))]
        $(".promptText").text(singlePhrase);  
        count++;
}



