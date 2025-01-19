/**
 * 
 * @param {*} baseURL 
 * @param {*} selected 
 */
async function setHeader(baseURL, selected) {
    // Tạo nội dung HTML cho header
    const header = `
        <header class="d-flex justify-content-between align-items-center py-3">
            <div class="w-25">
                <a href="${baseURL}index.html" class="d-flex align-items-center">
                    <img src="${baseURL}assets/images/FIT_logo.png" alt="Logo" width="50">
                </a>
            </div>

            <ul id="headerTabs" class="nav nav-pills mx-auto">
                <li class="nav-item"><a href="${baseURL}index.html" id="nav_home" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="#" id="nav_about" class="nav-link disabled">About</a></li>
                <li class="nav-item"><a href="${baseURL}groupDiary.html" id="nav_group_diary" class="nav-link">Group diary</a></li>
                <li class="nav-item"><a href="${baseURL}project.html" id="nav_projects" class="nav-link">Projects</a></li>
                <li class="nav-item"><a href="${baseURL}style_guide.html" id="nav_style_guide" class="nav-link">Style guide</a></li>
                <li class="nav-item"><a href="${baseURL}resutl.html" id="nav_result" class="nav-link">Result</a></li>
            </ul>

            <div class="d-flex align-items-center justify-content-between w-25">
                <div class="input-group w-75">
                    <input type="text" class="form-control" placeholder="What do you want to play?" aria-label="Username"
                        aria-describedby="basic-addon1">
                    <button class="input-group-text" id="basic-addon1">
                        <iconify-icon icon="iconamoon:search" width="1.2em" height="1.2em"
                            style="color: #000000"></iconify-icon>
                    </button>
                </div>

                <a class="" href="#">
                    <iconify-icon class="text-dark" icon="ci:bell" width="1.5em" height="1.5em"></iconify-icon>
                </a>

                <!-- Account managers -->
                <div class="dropdown">
                    <button type="button" class="btn rounded-circle border overflow-hidden dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false" style="width: 40px; height: 40px; padding: 0;">
                        <img class="img-fluid rounded-circle" src="${baseURL}images/NhatKhuong.jpg" alt="my avatar"
                            style="width: 100%; height: 100%; object-fit: cover;">
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Account</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><a id="settings" href="${baseURL}settings.html" class="dropdown-item">Settings</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item text-danger" href="#">Log out</a></li>
                    </ul>
                </div>

                
            </div>
        </header>
    `;

    // Thêm header vào DOM
    $("#navigation").html(header);

    // Thêm class active vào đúng thẻ li.nav-item
    $("#headerTabs .nav-link").each(function () {
        if ($(this).attr("id") === selected) $(this).addClass("active");
        else $(this).removeClass("active");
    });
}

/**
 * 
 * @returns 
 */
function getBaseURL() {
    const href = window.location.href;
    const lastSlashIndex = href.lastIndexOf("/");
    return href.substring(0, lastSlashIndex + 1);
}

function setFooter() {
    $("#footer").load("footer.html");
}