var test = false; //Used so that the program can tell if a test is active.
var count = 0; //Counts trials.
var numTrials = 0; //Number of reals trials as specified by user.
var trialData = []; //Stores data for a trial before it is written to output
var userData = document.implementation.createDocument(null, "TextTest"); //Creates xml object to be used for output document

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
$('.caps').hide();

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
        if(test) {
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
    if(test) {
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
    if(test) {
        recordKeyData("&#x8");
    }
});


//Something about this code causes hammer to fail
/*
// Access numbers: swipe right
var homepage = document.getElementsByClassName("homepage");
var numbers = document.getElementsByClassName("numbers");
var mainpage = new Hammer(homepage);
mainpage.on("swiperight", function() {
    mainpage.hide();
    numbers.show();
});

// Access symbols: swipe left
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
}); */


//Controls functionality to start test.
$(".starttest").click(function () {
    $(".demo").hide();
    $(".test").show();
    test = true;
    numTrials = prompt("How many trials do you want this test to contain (In addition to five practice trials) Enter a number");
    numTrials = parseInt(numTrials);   
 
    //From Jimmy
    var ticks = ((new Date().getTime() * 10000) + 621355968000000000);
    var seconds = ticks / 10000000;
    var root = userData.documentElement;
    root.setAttribute("version", "2.7.2");
    root.setAttribute("trials", numTrials); 
    root.setAttribute("ticks", ticks);  
    root.setAttribute("seconds", seconds);

    //From Jimmy
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
    var currentDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + date.getHours()  + ':' + date.getMinutes() + ':' + date.getSeconds();
    currentDate = formatDate(currentDate);
    
    // https://stackoverflow.com/questions/4898574/converting-24-hour-time-to-12-hour-time-w-am-pm-using-javascript
    function formatDate(date) {
        var d = new Date(date);
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }
        m = m < 10 ? "0" + m : m;

        s = s < 10 ? "0" + s : s;

        /* if you want 2 digit hours:
        h = h<10?"0"+h:h; */

        var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

        var replacement = h + ":" + m;
        replacement += ":"+s; 
        replacement += " " + dd;

        return date.replace(pattern, replacement);
    }       
    var currentDate = days[date.getDay()] + ', ' + currentDate;
    root.setAttribute("date", currentDate);

    console.log(userData);
   
    //Starts test and starts count
    test = true;
    count++;

    //Shows first question    
    $(".prompt").show();
    showNextQuestion();
});

// Click on send button to input text
$(".send").click(function() {  
    
    if(test) {       
        
        //Records data at the end of a trial (from Jimmy)    
        //Adds trial node
        var singleTrial = userData.createElement("Trial");		
        singleTrial.setAttribute("number", count); 
        if(count <= 5) {
            singleTrial.setAttribute("testing", "true");	            
        } else {
            singleTrial.setAttribute("testing", "false");
        }		
        singleTrial.setAttribute("entries", trialData.length);
        userData.getElementsByTagName("TextTest")[0].appendChild(singleTrial);
        
        //Adds presented node
        var presented = userData.createElement("Presented");
        presented.textContent = $(".promptText").text();
        userData.getElementsByTagName("Trial")[count - 1].appendChild(presented);   	       

        //Loops through key entries
        for(var i = 0; i < trialData.length; i++) {
            var entryElement = userData.createElement("Entry");
            entryElement.setAttribute("char", trialData[i][1]);
            entryElement.setAttribute("value", trialData[i][2]);
            entryElement.setAttribute("ticks", trialData[i][0]);		
            entryElement.setAttribute("seconds", trialData[i][0] / 10000000);
            userData.getElementsByTagName("Trial")[count - 1].appendChild(entryElement);  
        }

        //Adds transcribed node
        var transcribed = userData.createElement("Transcribed");
        transcribed.textContent = $(".input").text();
        userData.getElementsByTagName("Trial")[count - 1].appendChild(transcribed);       

        console.log(userData); //delete later

        trialData = [];

        //If test is finished, results can be downloaded
        if(count >= (numTrials + 5)) {
            $(".prompt").hide();
            $(".resultssection").show();
            test = false;
            $(".input").empty();   
      
        //Shows the next question if the test is not finished
        } else {
            showNextQuestion();
        }
        count++;
    
    //Empties input if not testing
    } else {
        $(".input").empty();
    }
});


//Starts a test for keyboard
function textTest() {

}

//Shows a new phrase
function showNextQuestion() {               
        $(".input").empty();
        var singlePhrase = phrases[Math.floor((Math.random() * phrases.length))]
        $(".promptText").text(singlePhrase); 
}

//Records keystroke data about a given character
function recordKeyData(key) {
    var d = new Date();
    var data = [3];
    data[0] = ((d.getTime() * 10000) + 621355968000000000);             
    var ascii = key.charCodeAt(0)
    if(key == "&#x8") {
        acii = 8;
    } else if (key == " ") {
        ascii = 32;
    }
    data[1] = key;
    data[2] = ascii;         
    trialData.push(data);
}


//Downloads file (from jimmy)
$('.download').click(function() {
    var a = document.createElement('a'), xml, ev;
    a.download = 'Test_Result.xml'; // file name
    xml = (new XMLSerializer()).serializeToString(userData).replace(/&amp;#x8;/gi, "&#x8;"); // convert node to xml string
    var xmlNode = '<?xml version = "1.0" encoding="utf-8" standalone="yes"?>';
    xml = xmlNode + xml;
    a.href = 'data:application/octet-stream;base64,' + btoa(xml); // create data uri
    // <a> constructed, simulate mouse click on it
    ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(ev);
});