$(document).ready(function () {
    let currentSongIndex = 0;
    let songs = [];
    let audio = new Audio(); // Audio object for playback

    // Fetch data from information.json
    $.getJSON('information.json', function (data) {
        songs = data.medias;
        console.log(songs);

        // Get songIndex from the URL (if it exists)
        const urlParams = new URLSearchParams(window.location.search);
        const songIndexFromURL = urlParams.get('songIndex');
        console.log(songIndexFromURL);

        // If songIndex exists in the URL, use it. Otherwise, default to the first song (index 0)
        if (songIndexFromURL !== null) {
            currentSongIndex = parseInt(songIndexFromURL, 10);
        }
        // Initialize the song (update the media bar and start the song)
        setSong(currentSongIndex);
    });

    // Function to set song details and load audio
    window.setSong = function setSong(index) {
        song = songs[index];

        // Update song details in the media bar
        $('#poster_master_play').attr('src', '../../assets/images/covers/' + song.cover_image);
        $('#title').html(`${song.title}<br><div id="artist" class="subtitle">${song.artist}</div>`);

        // Set audio source and load the audio
        audio.src = 'medias/' + song.preview_url;
        audio.load();
        audio.play();

        // Update duration
        const duration = formatTime(song.duration);
        $('#currentEnd').text(duration);

        // Reset progress
        $('#seek').val(0);
        $('#seek').attr('max', song.duration);
        $('#currentStart').text('0:00');
        $('#bar2').css('width', '0%');
        $('.dot').css('left', '0%');
        $('#play').removeClass('d-none');
    }

    // Format time from seconds to minutes:seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Play and Pause toggle
    $('#play').click(function () {
        audio.play();
        $('#play').addClass('d-none');
        $('#pause').removeClass('d-none');
    });

    $('#pause').click(function () {
        audio.pause();
        $('#pause').addClass('d-none');
        $('#play').removeClass('d-none');
    });

    // Next song
    $('#forward').click(function () {
        audio.pause(); // Stop the current song before moving to the next
        audio.currentTime = 0; // Reset to the start of the song
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        setSong(currentSongIndex);
        audio.play(); // Play the next song
        $('#play').addClass('d-none');
        $('#pause').removeClass('d-none');
    });

    // Previous song
    $('#rewind').click(function () {
        audio.pause(); // Stop the current song before moving to the previous
        audio.currentTime = 0; // Reset to the start of the song
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setSong(currentSongIndex);
        audio.play(); // Play the previous song
        $('#play').addClass('d-none');
        $('#pause').removeClass('d-none');
    });

    // Update seek bar and progress dynamically
    audio.addEventListener('timeupdate', function () {
        const currentTime = Math.floor(audio.currentTime);
        const duration = Math.floor(audio.duration) || 1; // Avoid division by zero

        // Update current time display
        $('#currentStart').text(formatTime(currentTime));

        // Update seek bar
        const progress = (currentTime / duration) * 100;
        $('#seek').val(currentTime);
        $('#bar2').css('width', `${progress}%`);
        $('.dot').css('left', `${progress}%`);
    });

    // Seek bar interaction
    $('#seek').on('input', function () {
        const seekTime = $(this).val();
        audio.currentTime = seekTime;
    });

    // Volume control
    $('#vol').on('input', function () {
        const volume = $(this).val() / 100;
        audio.volume = volume;

        // Update volume icon
        if (volume == 0) {
            $('#vol_icon').removeClass('bi-volume-down-fill').addClass('bi-volume-mute-fill');
        } else if (volume < 0.5) {
            $('#vol_icon').removeClass('bi-volume-mute-fill').addClass('bi-volume-down-fill');
        } else {
            $('#vol_icon').removeClass('bi-volume-down-fill').addClass('bi-volume-up-fill');
        }

        // Update the volume bar's width
        $('.vol_bar').css('width', `${volume * 100}%`);
        $('#vol_dot').css('left', `${volume * 100}%`); // Update the dot position on the volume bar
    });

    // Reset song when it ends
    audio.addEventListener('ended', function () {
        $('#pause').addClass('d-none');
        $('#play').removeClass('d-none');
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        setSong(currentSongIndex);
        audio.play();
        $('#play').addClass('d-none');
        $('#pause').removeClass('d-none');
    });
});
