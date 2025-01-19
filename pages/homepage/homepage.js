async function setHeader() {
    $('#navigation').load('../../components/header.html', function () {
        const selected = "nav_home"
        setHeader(selected)
    })
}

async function setFooter() {
    $('footer').load('../../components/footer.html')
}

async function setPanel() {
    $('#panel').load('panel.html')
}

function loadRecommendPlaylist() {
    $('#recommend_playlist').load('homepage/recommend_playlist.html')
}

function loadYourLibrary() {
    $('#your_library').load('homepage/your_library.html')
}