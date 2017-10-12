(function() {
    'use strict';

    // Set first and last slides
    var firstSlide = 1;
    var lastSlide = 85;

    // Set slides director
    var dir = 'slides';

    // Set image extension
    var ext = 'jpg';

    // Get the hash
    var hash = parseInt(window.location.hash.substring(1));

    // Get the slide element
    var $slide = $('.js-slide');

    // Set slide
    var setSlide = function(num) {
        // Save the int for the new hash
        var newHash = parseInt(num);

        // Make sure num is an int
        num = parseInt(num);

        // Now parse the num as a string
        num = String(num);

        // If length is only 1, add two leading zeroes
        if (num.length == 1) {
            num = '00' + num;
        }

        // If length is 2, add 1 leading zero
        if (num.length == 2) {
            num = '0' + num;
        }

        // Set the slide background
        $slide.css(
            'background-image',
            'url(' + dir + '/' + num + '.' + ext + ')'
        );

        // Set the location hash
        window.location.hash = num;

        // Update the hash variable
        hash = newHash;
    };

    // Var prev function
    var prev = function() {
        // Set the previous slide
        var slide = hash - 1;

        // Make sure the slide is not out of range
        if (slide >= firstSlide) {
            // Set the slide
            setSlide(slide);
        }
    };

    // Var advance function
    var advance = function() {
        // Set the next slide
        var slide = hash + 1;

        // Make sure the slide is not out of range
        if (slide <= lastSlide) {
            // Set the slide
            setSlide(slide);
        }
    };

    // Make sure there is a hash
    if (! hash) {
        hash = firstSlide;
    }

    // Make sure hash is not less than first slide
    if (hash < firstSlide) {
        hash = firstSlide;
    }

    // Make sure hash is not greater than last slide
    if (hash > lastSlide) {
        hash = lastSlide;
    }

    // Set slide background
    setSlide(hash);

    // Watch for previous click
    $('.js-slide-prev').on('click', function() {
        prev();
    });

    // Watch for next click
    $('.js-slide-advance').on('click', function() {
        advance();
    });

    // Watch for keyup
    $('body').on('keyup', function(e) {
        if (e.keyCode === 39) { // advance (right arrow)
            advance();
        } else if (e.keyCode === 40) { // advance (down arrow)
            advance();
        } else if (e.keyCode === 37) { // prev (left arrow)
            prev();
        } else if (e.keyCode === 38) { // prev (up arrow)
            prev();
        }
    });
})();
