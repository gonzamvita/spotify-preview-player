$(document).on('ready', function () {
    $('.widget').hide();
})

$('#js-search-artist').on('submit', function (event) {
    var req = $('#searchargument').val().replace(" ", "%20");
    var url = 'https://api.spotify.com/v1/search?type=track&q='+ req;
    $.get(url).done(function (data) {
        var result = data.tracks.items[0];
        var track = {
            'song': result.name,
            'artist': result.artists[0].name,
            'cover': result.album.images[0].url,
            'preview': result.preview_url
        };
        wakePlayer(track);
    });
    event.preventDefault();
})

function wakePlayer(track) {
    $('.cover img').attr('src', track['cover']);
    $('.title').text(track['song']);
    $('.author').text(track['artist']);
    $('audio').attr('src', track['preview'])
    $('.widget').show();
}

$('.btn-play').on('click', function (event) {
    var audioPlayer = audioPlayer;
    // audioPlayer.addEventListener('timeupdate', onTimeUpdate, useCapture);
    $(event.currentTarget).removeClass('disabled')
    if ($(event.currentTarget).hasClass('playing')) {
        audioPlayer.trigger('pause');
        $(event.currentTarget).toggleClass('playing')
    } else {
        audioPlayer.trigger('play');
        audioPlayer.bind('timeupdate', updateTime);
        $(event.currentTarget).toggleClass('playing')
    }
})
