async function setHeader() {
    $('#navigation').load('../../components/header.html', function () {
        const selected = "nav_home"
        setHeader(selected)
    })
}

async function setFooter() {
    $('footer').load('../../components/footer.html')
}

async function setPlaylist() {
    $('#content-midle').load('playlist.html')
}

async function setPanel() {
    $('#panel').load('panel.html')
}

function loadRecommendPlaylist() {
    $('#recommend_playlist').load('homepage/recommend_playlist.html')
}

function loadContentRecommendPlaylist() {
    $.getJSON('information.json', function (data) {
        // Lặp qua mảng medias
        $.each(data.medias, function (index, media) {
            // Tạo thẻ HTML cho mỗi bài hát
            let mediaCard = `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-3 song-item" data-index="${media.id_media}">
                <div class="card">
                    <img src="images/Covers/${media.cover_image}" class="card-img-top" alt="${media.title}" loading="lazy">
                    <div class="card-body d-flex flex-column">
                        <a href="${media.spotify_url}" class="card-title link-underline link-underline-dark">${media.title}</a>
                        <a href="#" class="card-text">${media.artist}</a>
                    </div>
                </div>
            </div>
        `;
            // Thêm thẻ HTML vào phần tử chứa
            $('#content_recommend_playlist').append(mediaCard);

            // Add event listeners for song clicks
            $('.song-item').click(function () {
                const songIndex = $(this).data('index');

                // Set song index in the URL
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('songIndex', songIndex); // Add songIndex parameter to URL
                window.history.pushState({}, '', newUrl); // Update the URL without reloading the page

                // Play the selected song
                setSong(songIndex - 1);
            });
        });
    });
}

function loadYourLibrary() {
    $('#your_library').load('homepage/your_library.html')
}