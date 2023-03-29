console.log("Accessibility Rocks!");

$(document).ready(function() { //all code inside will not run until the whole web page has loaded. 
    //CODE GOES HERE
    document.addEventListener('keydown', function(e) {
        if (e.code == '' || e.code == 'Unidentified' || e.code == 'Space') {
            e.preventDefault(); // prevent the default behavior of the spacebar key press event

            // Only run the code below if the spacebar is pressed down
            $("*:not(body)").hover(
                function(ev) {
                    //EXECUTED WHEN MOUSE ENTERS AN ELEMENT
                    $(this).addClass("highlight")
                    ev.stopPropagation();

                    // Check if the element is an image
                    var tagname = this.tagName;
                    if (tagname == "IMG") {
                        var alttext = $(this).attr("alt");
                        var srcofimg = $(this).attr("src");

                        // Use the alt text if available, otherwise use the file name
                        if (alttext) {
                            speechSynthesis.speak(new SpeechSynthesisUtterance(alttext));
                        } else {
                            var filename = srcofimg.split('/').pop();
                            speechSynthesis.speak(new SpeechSynthesisUtterance(filename));
                        }
                    } else {
                      //if it's not an image then read text element
                        speechSynthesis.speak(new SpeechSynthesisUtterance($(this).text()));
                    }

                    // speechSynthesis.speak(new SpeechSynthesisUtterance($(this).text()));

                    $(this).text()
                },
                function(ev) {
                    //EXECUTED WHEN MOUSE EXITS AN ELEMENT
                    //$(this).removeClass("highlight")
                    $(".highlight").removeClass('highlight')
                    speechSynthesis.cancel();
                }
            )
        } else {
            // Remove the highlight and stop speaking when a key other than the spacebar is pressed
            $(".highlight").removeClass('highlight')
            speechSynthesis.cancel();
        }
    });
});