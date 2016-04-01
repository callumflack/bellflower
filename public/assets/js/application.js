$(document).ready(function() {

    // Detect CSS transition/animation completion
    // ==========================================
    // Full example: http://jsfiddle.net/maccman/YUuQU/

    // 1. Sniff 'transition' across browsers
    // -------------------------------------
    // From Modernizr: gist.github.com/maccman/4414792
    function whichTransitionEvent(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    // 2. Transition end callback
    // --------------------------
    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false,
            $el = this;
        $(this).one('webkitTransitionEnd', function() { called = true; });
        var callback = function() {
            if (!called)
            $($el).trigger('webkitTransitionEnd');
        };
        setTimeout(callback, duration);
    };


    // Trigger Treatment/Condition tabs
    // ================================
    function tabbedInfo(){

        // Open Treatment/Condition tabs
        // --------------------------------
        $(".Expand-menu a").on("click", function(e) {
            e.preventDefault();

            var thisBtn = $(this),
                tabGroup = thisBtn.parents(".Expand"),
                thisTabContent = thisBtn.attr("href"),
                thisTabIndex = thisBtn.parent().index(),
                thisTab = tabGroup.find(".Tabs-menu .Grid-cell").eq(thisTabIndex).find("a");

            // find divs to flatten and expand
            tabGroup.find(".Expand-menu").addClass("is-flat");
            tabGroup.find(".Tabs").addClass("is-expanded");

            // set the selected tab to active state
            thisTab.addClass("is-active");

            // set the selected tab content to be visible
            $(thisTabContent).addClass("is-active is-opaque");
        });


        // Trigger Treatment/Condition tabs
        // --------------------------------
        $(".Tabs-menu a").on("click", function(e) {
            e.preventDefault();

            var thisTabBtn = $(this),
                tabGroup = thisTabBtn.parents(".Expand"),
                tabGroupBtns = tabGroup.find(".Tabs-menu a"),
                thisTabContent = $(thisTabBtn.attr("href")),
                allTabContent = thisTabContent.siblings();

            // toggle active state of selected tab
            tabGroupBtns.removeClass("is-active");
            thisTabBtn.addClass("is-active");

            // hide all tab content areas except that clicked
            allTabContent.removeClass("is-active is-opaque");
            thisTabContent.addClass("is-active is-opaque");
        });


        // Close tabs via h2
        // --------------------------------
        $(".Expand > h2 > a").on("click", function(e) {
            e.preventDefault();

            var thisCloseBtn = $(this),
                tabGroup = thisCloseBtn.parents(".Expand");

            console.log(tabGroup);

            // find divs to toggle
            tabGroup.find(".Tabs").removeClass("is-expanded");
            tabGroup.find(".Expand-menu").delay(500).removeClass("is-flat");
            $(".is-active").removeClass("is-active is-opaque");
            // return false;
        });
    }

    tabbedInfo();


    // init Stellar parallax
    // ================================
    // don't init if mobile
    // if(!Modernizr.touch){
    //     $.stellar({
    //         horizontalScrolling: false,
    //         verticalOffset: 50,
    //         responsive: true
    //     });
    // }
});
