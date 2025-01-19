$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const albumName = urlParams.get("album");
  let currentSongIndex = parseInt(urlParams.get("songIndex")) || 0; // Default to 0 if no songIndex is provided

  // Set album name on the page
  if (albumName) {
    const decodedAlbumName = decodeURIComponent(albumName.replace(/\+/g, " "));

    // Set the album name in the UI
    $("h2.text-start.mb-1").text(decodedAlbumName);
    $("#playlist-name").text(decodedAlbumName);
  }

  // Fetch the songs from information.json and filter by the album name
  function getSongsFromAlbum(albumName) {
    $.getJSON("information.json", function (data) {
      // Filter songs based on the album name
      const albumSongs = data.medias.filter((song) => song.album === albumName);

      renderPlaylist(albumSongs); // Call renderPlaylist with the filtered songs
      setSong(currentSongIndex); // Set the song based on the current song index
    }).fail(function () {
      console.error("Error loading the JSON file");
    });
  }

  // Render the playlist of songs
  function renderPlaylist(songs) {
    const contentPlaylist = $("#content_playlist");
    contentPlaylist.empty(); // Clear any previous content

    if (songs.length > 0) {
      songs.forEach((song, index) => {
        const songCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-3 song-item" data-index="${song.id_media}">
                        <div class="card">
                            <img src="../images/Covers/${song.cover_image}" class="card-img-top" alt="Cover" loading="lazy">
                            <div class="card-body d-flex flex-column">
                                <a href="#" class="card-title link-underline link-underline-dark">${song.title}</a>
                                <a href="#" class="card-text">${song.artist}</a>
                            </div>
                        </div>
                    </div>
                `;
        contentPlaylist.append(songCard);
      });

      // Add event listeners for song clicks
      $(".song-item").click(function () {
        const songIndex = $(this).data("index");

        // Set song index in the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("songIndex", songIndex); // Add songIndex parameter to URL
        window.history.pushState({}, "", newUrl); // Update the URL without reloading the page

        // Play the selected song
        setSong(songIndex - 1);
      });
    } else {
      contentPlaylist.append("<p>No songs found in this album.</p>");
    }
  }

  // If album name exists, fetch songs and render the playlist
  if (albumName) {
    getSongsFromAlbum(albumName);
  }
});
