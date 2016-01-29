/**
 * Created by Witt on 2016/1/29.
 */

$(function () {
    var s = $('#scroller'),
        s1 = $('#scroller1'),
        s2 = $('#scroller2');
    var start,end,move;
    s2.hide();

    s.css({'transition':'transform 0.3s cubic-bezier(0, 0, 0.25, 1) 0ms','transform':'translateY(0)','height':s1.height()});
    var h =  $(document).height() - window.innerHeight;

    $(document).on("touchstart", function(e) {
        start = e.originalEvent.targetTouches[0].clientY;
    });

    var scrollToggle = true;
    $(window).scroll(function (event) {
        var toggle = $ (window).scrollTop () - h;
        $(document).off('touchmove');
        $(document).off('touchend');

        if (scrollToggle) {
            if (toggle >= 0) {
                $(document).on("touchmove", function(e) {
                    end = e.originalEvent.targetTouches[0].clientY;
                    move = (end - start).toFixed(2);
                    if (move < 0) {
                        s.css({'transform':'translateY(-' + 100 +'px)'})
                    }
                });
                $(document).on('touchend', function (e) {
                    if (move < - 250) {
                        s.css({'transition':'transform .8s cubic-bezier(0, 0, 0.25, 1) 0ms','transform':'translateY(-' + s1.height() +'px)','height':s2.height()})
                        s2.slideDown()
                        $(window).scrollTop (0)
                        scrollToggle = false;
                        return;
                    }
                    s.css({'transform':'translateY(0px)'})
                })
                return;
            }
            s.css({'transform':'translateY(0px)'})
        }else{
            if ($ (window).scrollTop () <= 5) {
                $(document).on("touchmove", function(e) {
                    end = e.originalEvent.targetTouches[0].clientY;
                    move = (end - start).toFixed(2);
                    if (move > 0) {
                        s.css({'transition':'transform 0.3s cubic-bezier(0, 0, 0.25, 1) 0ms','transform':'translateY(-' + (parseInt(s1.height()) - 100) +'px)'})
                    }
                });
                $(document).on('touchend', function (e) {
                    if (move > 250) {
                        s.css({'transition':'transform .8s cubic-bezier(0, 0, 0.25, 1) 0ms','transform':'translateY(0px)','height':s1.height()})
                        s2.slideUp()
                        $(window).scrollTop (0)
                        scrollToggle = true;
                        $(document).off('touchmove');
                        $(document).off('touchend');
                        return;
                    }
                    s.css({'transform':'translateY(-' + s1.height() +'px)'})
                })
                return;
            }
            s.css({'transform':'translateY(-' + s1.height() +'px)'})
        }
    })




})