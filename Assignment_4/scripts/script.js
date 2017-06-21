$(document).ready(function() {

    var count = 2,
        prev = 0,
        next = 1;

    // Resets count, prev, next, and image properties to default values
    function reset() {
        count = 2;
        prev = 0;
        next = 1;
        resetImageProps();
    }

    // Removes all classes, tags etc. from images
    function resetImageProps() {
        for (var i = 1; i <= 10; i++) {
            $("#img" + i).removeClass("active").hide();
            $("#img" + i).css("position", "");
        }
    }

    // Method that enables or disables navigation icons based on certain conditions
    function enableOrDisable() {
        if (prev < count) {
            $(".prev").hide();
        }
        if (prev >= count) {
            $(".prev").show();
        }
        if (next > 10) {
            $(".next").hide();
        }
        if (next <= 10) {
            $(".next").show();
        }
    }

    // Validates whether count entered is within the range 2-10
    // Throw an alert to the user if the number is out of range
    function validateCount(count) {
        var retVal = true;
        if (count < 2 || count > 10) {
            retVal = false;
        }
        return retVal;
    }

    // jQuery function that runs on #btnSubmit click event
    $("#btnSubmit").click(function(e) {
        e.preventDefault();
        reset();
        count = $("#imageCount").val();
        if (!validateCount(count)) {
            alert("Please enter a number in the range: [2-10]");
        } else {
            $("#jquery-carousel").css("width", count * 400 + "px");
            var init = next;
            var final = +next + +count;

            for (var i = init; i < final; i++) {
                $("#img" + i).addClass("active").show();
                if (i == final - 1) {
                    $("#img" + i).css("position", "absolute");
                }
                next++;
            }

            enableOrDisable();
        }
    });


    // jQuery function that runs on next button click
    $("#jquery-carousel .next a").click(function(e) {
        e.preventDefault();
        resetImageProps();
        var init = next;
        var final = +next + +count;

        for (var i = init; i < final; i++) {
            $("#img" + i).addClass("active").show();
            if (i == final - 1) {
                $("#img" + i).css("position", "absolute");
            }
            prev++;
            next++;
        }
        enableOrDisable();
    });


    // jQuery function that runs on previous button click
    $("#jquery-carousel .prev a").click(function(e) {
        e.preventDefault();
        resetImageProps();
        var init = (+prev - +count) + 1;
        var final = +next - +count;
        for (var i = init; i < final; i++) {
            $("#img" + i).addClass("active").show();
            if (i == final - 1) {
                $("#img" + i).css("position", "absolute");
            }
            prev--;
            next--;
        }
        enableOrDisable();
    });
});