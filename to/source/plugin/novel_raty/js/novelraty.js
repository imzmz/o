jQ(function() {
    var url = 'source/plugin/novel_raty/images'
    jQ('#noraty').raty({
        hints: ['', '', '', '', ''],
        half:true,
        precision: false,
        starHalf    : url+'/star-half.png',
        starOff     : url+'/star-off.png',
        starOn      : url+'/star-on.png',
        score: function() {
            return jQ(this).attr('data-score');
        },
        click: function(score, evt) { 
            if (discuz_uid == 0) {
                showWindow('login', 'member.php?mod=logging&action=login')
                return
            }
            score = Math.ceil(score*2);
            var url = 'plugin.php?id=novel_raty:raty_process&tid='+tid+'&fid='+fid+'&score='+score+'&handlekey=raty';
            var cont = ajaxget(url, '');
        }
    });
    jQ('#avgrate').raty({
        hints: ['', '', '', '', ''],
        half: true,
        precision: false,
        readOnly: true,
        starHalf    : url+'/star-half.png',
        starOff     : url+'/star-off.png',
        starOn      : url+'/star-on.png',
        score: function() {
            return jQ(this).attr('data-score');
        },
    })
})