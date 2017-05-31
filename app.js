var test = false; //Used so that the program can tell if a test is active.
var keystrokes = false; //Used so that Program can tell if it should record keystrokes.
var count = 0; //Counts trials.
var numTrials = 0; //Number of reals trials as specified by user.
var trialData = []; //Stores data for a trial before it is written to output

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
$(".numbers").hide();
$(".symbols1").hide();
$(".symbols2").hide();

//Hides all cap keyboards initially
$(".AF").hide();
$(".GM").hide();
$(".NT").hide();
$(".UZ").hide();

//Hides test directions initially
$(".test").hide();

//Hides results section as well in test area
$(".resultssection").hide();
$(".prompt").hide();

//Controls functionality to start test.
$(".starttest").click(function () {
    $(".demo").hide();
    $(".test").show();
    test = true;
    numTrials = prompt("How many trials do you want this test to contain (In addition to five practice trials) Enter a number");
    numTrials = parseInt(numTrials);
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
/*Capital Letters Functionality*/
$('.lowercase').hide(); //Hides lowercase letters initially

//Toggles caps and nomal keyboard
$('#write').toggle(function() {
    $('.home, .middle').hide();
    $('.caps').show();
}, function() {
    $('.home, .middle').show();
    $('.caps').hide();
});

//Opens capital keyboards when clicked
$(document).ready(function () {
    $(".A-F").mousedown(function () {
        $('.AF').show();
        $('.caps').hide();
    });
});

$(document).ready(function () {
    $(".G-M").mousedown(function () {
        $('.GM').show();
        $('.caps').hide();
    });
});

$(document).ready(function () {
    $(".N-T").mousedown(function () {
        $('.NT').show();
        $('.caps').hide();
    });
});

$(document).ready(function () {
    $(".U-Z").mousedown(function () {
        $('.UZ').show();
        $('.caps').hide();
    });
});



// "typing" for keyboard
$(function(){
    var $write = $('#write');

    //Typing with drag
    $('.char').mouseup(function(){
        var $this = $(this),
        character = $this.html(); 
        $(".lowercase").show();

        // Add the character
        $write.html($write.html() + character);
            
        $($this.parent().parent()).hide();
        $('.home, .middle').show();

        //records data if after practice trials
        if(keystrokes) {
            recordKeyData(character);
        }
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
    
    //Records data if after practice trials
    if(keystrokes) {
        recordKeyData(character);
    }
});

//Backspace functionality: swipe left to backspace
var textbox = document.getElementById("write");
var inputbox = new Hammer(textbox);
inputbox.on("swipeleft", function() {
    var temp = textbox.innerHTML;
    var length = temp.length -  1;
    textbox.innerHTML = temp.substring(0, length);
    if(keystrokes) {
        recordKeyData("&#x8");
    }
});


// Access numbers: swipe right
var homepage = document.getElementsByClassName("homepage");
var numbers = document.getElementsByClassName("numbers");
var mainpage = new Hammer(homepage);
mainpage.on("swiperight", function() {
    mainpage.hide();
    numbers.show();
});

// Access symbols: swipe left
var homepage = document.getElementsByClassName("homepage");
var punctuation1 = document.getElementsByClassName("symbols1");
var mainpage = new Hammer(homepage);
mainpage.on("swipeleft", function() {
    mainpage.hide();
    punctuation1.show();
});

// Access symbols: swipe left
var symbols = document.getElementsByClassName("symbols1");
var punctuation2 = document.getElementsByClassName("symbols2");
var mainpage = new Hammer(symbols);
mainpage.on("swipeleft", function() {
    punctuation1.hide();
    punctuation2.show();
});




//Swipe right on input box to enter text
inputbox.on("swiperight", function() {     
    count++;

    //Records data at the end of a trial     
    if(keystrokes && count > 5) {
        var transcribed = $(".input").text();      
        var results = $(".results");
        results.append(document.createTextNode("<Trial number=\"" + (count - 5) + "\" testing=\"false\" entries=\"" + (trialData.length - 1) + "\">"));
        results.append('</br>');  
        for (var i = 0; i < trialData.length; i++) {
            results.append(document.createTextNode(trialData[i]));
            results.append('</br>');              
        }
        results.append(document.createTextNode("<Transcribed>" + transcribed + "</Transcribed>"));
        results.append('</br>');  
        results.append(document.createTextNode("</Trial>"));
        results.append('</br>'); 
        trialData = [];
    }

    if(test) {       
        
        //Creates testing information once practice trials have been completed
        if(count == 5) {
            var d = new Date();
            var date = d.toLocaleString();
            var ticks = ((d.getTime() * 10000) + 621355968000000000);
            var seconds = ticks / 10000000;      
            var results = $(".results");
            results.append(document.createTextNode("<TextTest version=\"2.7.2\" trials=\"" + numTrials + "\" ticks=\"" + ticks + "\" seconds=\"" + seconds + "\" date=\"" + date + "\">"));    
            results.append('</br>');
            keystrokes = true;        
        } 
        
        //If test is finished
        if(count >= (numTrials + 5)) {
            var results = $(".results");
            results.append(document.createTextNode("</TextTest>"));
            $(".prompt").hide();
            $(".resultssection").show();
            test = false;
            keystrokes = false; 
            $(".input").empty();     
        } else {
            showNextQuestion();
        }

    }
});


//Starts a test for keyboard
function textTest() {
    $(".prompt").show();
    test = true;
    var results = $(".results");
    results.append(document.createTextNode("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>"));
    results.append('</br>');
    showNextQuestion();
}

//Shows a new phrase
function showNextQuestion() {
                
        $(".input").empty();
        var singlePhrase = phrases[Math.floor((Math.random() * phrases.length))]
        $(".promptText").text(singlePhrase); 
        
        //records data at beginning of trial
        if(keystrokes) {
            trialData.push("<Presented>" + singlePhrase + "</Presented>");           
        } 
}

//Records keystroke data about a given character
function recordKeyData(key) {
            var d = new Date();
            var ticks = ((d.getTime() * 10000) + 621355968000000000);
            var seconds = ticks / 10000000;               
            var ascii = key.charCodeAt(0)
            if(key == "&#x8") {
                acii = 8;
            }
            trialData.push("<Entry char=\"" + key + "\" value=\"" + ascii + "\" ticks=\"" + ticks + "\" seconds=\"" + seconds + "\" />");      
}

