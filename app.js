
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

// "typing" for a-f keyboard
$(function(){
    var $write = $('#write');
    
    //This variable is used to make sure that only one letter is input when clicking a key
    var once = true;

    //Typing with click 
    $('.af .char').mousedown(function(){
        once = false;
        var $this = $(this),
            character = $this.html(); 

        // Add the character
        $write.html($write.html() + character);
        
        $('.af').hide();
        $('.home, .middle').show();
    });

    //Typing with drag
    $('.af .char').mouseup(function(){
        if(once) {
            var $this = $(this),
                character = $this.html(); 

            // Add the character
            $write.html($write.html() + character);
            
            $('.af').hide();
            $('.home, .middle').show();
        }
    });
});

// "typing" for g-m keyboard
$(function(){
    var $write = $('#write');
    
    //This variable is used to make sure that only one letter is input when clicking a key
    var once = true;

    //Typing with click 
    $('.gm .char').mousedown(function(){
        once = false;
        var $this = $(this),
            character = $this.html(); 

        // Add the character
        $write.html($write.html() + character);
        
        $('.gm').hide();
        $('.home, .middle').show();
    });

    //Typing with drag
    $('.gm .char').mouseup(function(){
        if(once) {
            var $this = $(this),
                character = $this.html(); 

            // Add the character
            $write.html($write.html() + character);
            
            $('.gm').hide();
            $('.home, .middle').show();
        }
    });
});

//Typing for n-t keyboard
$(function(){
    var $write = $('#write');
    
    //This variable is used to make sure that only one letter is input when clicking a key
    var once = true;

    //Typing with click 
    $('.nt .char').mousedown(function(){
        once = false;
        var $this = $(this),
            character = $this.html(); 

        // Add the character
        $write.html($write.html() + character);
        
        $('.nt').hide();
        $('.home, .middle').show();
    });

    //Typing with drag
    $('.nt .char').mouseup(function(){
        if(once) {
            var $this = $(this),
                character = $this.html(); 

            // Add the character
            $write.html($write.html() + character);
            
            $('.nt').hide();
            $('.home, .middle').show();
        }
    });
});

//Typing for u-z keyboard
$(function(){
    var $write = $('#write');
    
    //This variable is used to make sure that only one letter is input when clicking a key
    var once = true;

    //Typing with click 
    $('.uz .char').mousedown(function(){
        once = false;
        var $this = $(this),
            character = $this.html(); 

        // Add the character
        $write.html($write.html() + character);
        
        $('.uz').hide();
        $('.home, .middle').show();
    });

    //Typing with drag
    $('.uz .char').mouseup(function(){
        if(once) {
            var $this = $(this),
                character = $this.html(); 

            // Add the character
            $write.html($write.html() + character);
            
            $('.uz').hide();
            $('.home, .middle').show();
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
});

//Backspace functionality: swipe left to backspace
var textbox = document.getElementById("write");
var backspace = new Hammer(textbox);
backspace.on("swipeleft", function() {
    var temp = textbox.innerHTML;
    var length = temp.length -  1;
    textbox.innerHTML = temp.substring(0, length);
});



