async function setHeader() {
    $('#navigation').load('../../components/header.html', function () {
        const selected = "nav_result"
        setHeader(selected)
    })
}

async function setFooter() {
    $('footer').load('../../components/footer.html')
}

const insights = [
    {
        "id": "21130407",
        "task": [
            { "title": "Home ", "link": "../homepage/home.html" },
            { "title": "Group diary ", "link": "../manage/groupDiary.html" },
            { "title": "Projects ", "link": "../manage/project.html" },
            { "title": "Settings ", "link": "../setting/settings.html" },
            { "title": "About us ", "link": "../about_us/about.html" },
            { "title": "Style guide ", "link": "../style_guide/style_guide.html" },
            { "title": "Result", "link": "../manage/result.html" }
        ],
        "completion": 100,
        "contribution": 54.55
    },
    {
        "id": "21130425",
        "task": [
            { "title": "Trang quản lý bài hát", "link": "" }
        ],
        "completion": 0,
        "contribution": 0
    },
    {
        "id": "21130459",
        "task": [
            { "title": "Register ", "link": "" },
            { "title": "Trang quản lý người dùng", "link": "" }
        ],
        "completion": 50,
        "contribution": 0
    },
    {
        "id": "21130572",
        "task": [
            { "title": "Playlist page ", "link": "" },
            { "title": "Trang chi tiết bài hát", "link": "" }
        ],
        "completion": 100,
        "contribution": 18.18
    },
    {
        "id": "23130348",
        "task": [
            {"title": "Notification", "link":"../notification/notification.html"}
        ],
        "completion": 100,
        "contribution": 9.1
    },
    {
        "id": "20130356",
        "task": [
            { "title": "Sign in", "link": "../../components/logout.html" },
            { "title": "Trang tổng quan Admin", "link": "../admin/dashboard.html" },
            { "title": "Trang quản lý người dùng", "link": "../admin/users-manager.html" },
            { "title": "Trang quản lý bài hát", "link": "../admin/songs.html" },
        ],
        "completion": 100,
        "contribution": 36.36
    },
]

async function setInsights() {
    try {
        const usersData = await fetchUsersData();
        const insightsData = insights.map(insight => enrichInsight(insight, usersData));
        renderInsights(insightsData);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function fetchUsersData() {
    const response = await fetch('../../data/information.json'); // Đường dẫn đến file JSON
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.users;
}

function enrichInsight(insight, usersData) {
    const user = usersData.find(user => user.id === parseInt(insight.id));
    if (user) {
        return {
            ...insight,
            fullname: user.fullname,
            avatar: user.avatar,
            context: user.context
        };
    }
    return insight; // Trả về insight gốc nếu không tìm thấy user
}

function renderInsights(insightsData) {
    const insightContainer = $('#insight');
    insightContainer.empty(); // Xóa nội dung cũ

    insightsData.forEach(insight => {
        const html = createInsightHTML(insight);
        insightContainer.append(html);
    });
}

function createInsightHTML(insight) {
    const tasksList = insight.task.map(task =>
        `<li><a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="${task.link}">${task.title}</a></li>`
    ).join('');

    return `
        <div class="col-lg-2 col-md-3 col-sm-4 my-3 d-flex flex-column align-items-center border rounded-4 py-3">
            <div class="avatar-container mb-3">
                <img src="../../assets/images/members/${insight.avatar}" alt="${insight.fullname} avatar" class="avatar">
            </div>
            <h4 class="">${insight.fullname}</h4>
            <div class="d-flex align-items-center justify-content-evenly">
                
                <h5 class="text-secondary">${insight.context}</h5>
            </div>
            <p class="mb-0">${insight.id}</p>
            <hr class="w-50 border border-primary border-1 opacity-75">
            <h5>Nhiệm vụ</h5>
            <div class="my-task">
                <ul>
                    ${tasksList}
                </ul>
            </div>
            <hr class="w-50 border border-primary border-1 opacity-75">
            <h5>Đánh giá</h5>
            <p class="mb-0">Hoàn thành: ${insight.completion}%</p>
            <p class="mb-0">Đánh giá: ${insight.contribution}%</p>
        </div>
    `;
}