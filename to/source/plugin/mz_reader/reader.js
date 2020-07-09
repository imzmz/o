document.write('<div id="tip" align="center"></div>');

(function (window, document, undefined) {


    var o        = function (p) {
        return document.getElementById(p);
    }
    var replaces = [
        [String.fromCharCode(1), ';&#x'],
        [String.fromCharCode(2), '&#x'],
        [String.fromCharCode(3), ';&#'],
        [String.fromCharCode(4), '&gt'],
        [String.fromCharCode(5), '&lt'],
        [String.fromCharCode(6), '</p><p>'],
        [String.fromCharCode(7), '<p>'],
        [String.fromCharCode(8), '</p>'],
        ['&nbsp;;', ' '],
        ['<p>&nbsp;</p>', '']
    ];
    var
      contentId  = o('content') ? 'content' : 'txt_content',
      originHTML = o(contentId).innerHTML;
    for (var i = 0; i < replaces.length; i++) {
        var re     = new RegExp(replaces[i][0], 'ig');
        originHTML = originHTML.replace(re, replaces[i][1]);
    }
    o(contentId).innerHTML = originHTML;
    if (o('loading')) {
        o('loading').style.display = 'none';
    }
    if (!_attachEvent) {
        function _attachEvent(obj, evt, func, eventobj) {
            eventobj = !eventobj ? obj : eventobj;
            if (obj.addEventListener) {
                obj.addEventListener(evt, func, false);
            } else if (eventobj.attachEvent) {
                obj.attachEvent('on' + evt, func);
            }
        }
    }
    _attachEvent(document, 'keydown', function (event) {
        if (!$('txt_content')) return;
        if (!event) event = window.event;
        switch (event.keyCode) {
            case 39://next
                if (event.ctrlKey) {
                    if ($('startpage') != null) {
                        location.href = o('startpage').getAttribute('href');
                    }
                } else {
                    if ($('nextpage') != null) {
                        location.href = o('nextpage').getAttribute('href');
                    }
                }
                break;
            case 37://prev
                if (event.ctrlKey) {
                    if ($('overpage') != null) {
                        location.href = o('overpage').getAttribute('href');
                    }
                } else {
                    if ($('prevpage') != null) {
                        location.href = o('prevpage').getAttribute('href');
                    }
                }
                break;
            case 13://enter
                if ($('listpage') != null) {
                    location.href = o('listpage').getAttribute('href');
                }
                break;
        }
    });

    window.readPage = function (goPage, currPage) {
        var regStatic = new RegExp('(\\d+)-(\\d+)-' + currPage, 'ig'),
            regPage   = new RegExp('page=' + currPage, 'ig');
        location.href = location.href.replace(regStatic, '$1-$2-' + goPage).replace(regPage, 'page=' + goPage);
    }
    //for select
    setTimeout(function () {
        var selects = document.getElementsByTagName('select');
        for (var k = 0; k < selects.length; k++) {
            var selectObj                                            = selects[k],
                page                                                 = selectObj.getAttribute('page'),
                maxPage = selectObj.getAttribute('maxpage'), options = '';
            if (page && maxPage) {
                page = parseInt(page, 10);
                for (var i = 1; i <= maxPage; i++) {
                    options += '<option' + (i == page ? ' selected' : '') + '>' + i + '</option>';
                    //links += '<a href="'++'"></a>';
                }
                selectObj.innerHTML = options;
            }
        }
    }, 1000);
    setTimeout(function () {
        var nextUrl = document.getElementById('nextpage') ? document.getElementById('nextpage').getAttribute('href') : '';
        if (nextUrl) {
            var fetchLink  = document.createElement('link');
            fetchLink.rel  = 'prefetch';
            fetchLink.href = nextUrl;
            (document.getElementsByTagName('head')[0] || document.body).appendChild(fetchLink);
        }
    }, 1000);
    //for go top and go bottom
    if (!$ || !$('.go').length) {
        return;
    }

    var offset              = 300,
        offset_opacity      = 800,
        scroll_top_duration = 700,
        _go                 = $('.go');
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? _go.show('slow') : _go.hide('slow');
        if ($(this).scrollTop() > offset_opacity) {
            _go.show('slow');
        }
    });
    $('.go-top').on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
              scrollTop: 0,
          }, scroll_top_duration
        );
    });
    $('.go-bottom').on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
              scrollTop: 99999999,
          }, scroll_top_duration
        );
    });

})(window, document);
