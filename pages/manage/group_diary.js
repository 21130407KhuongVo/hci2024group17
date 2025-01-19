async function setHeader() {
    $('#navigation').load('../../components/header.html', function () {
        const selected = "nav_group_diary"
        setHeader(selected)
    })
}

async function setFooter() {
    $('footer').load('../../components/footer.html')
}

async function setDiaries() {
    $.getJSON("../../data/information.json", function (data) {

        let users = data.users;

        // Tạo tab tuần
        createWeekTabs(users);

        // Hiển thị dữ liệu tuần đầu tiên
        renderGroupDiaryTable(users, 1);

        // Thiết lập sự kiện click cho các tab
        setupTabClickHandler(users);
    });
}

async function createWeekTabs(users) {
    // Tìm tuần cao nhất có trong group_diary
    let maxWeek = users.reduce((max, user) => {
        // Kiểm tra nếu group_diary là mảng, nếu không, trả về max hiện tại
        if (Array.isArray(user.group_diary)) {
            return Math.max(max, user.group_diary.length);
        }
        return max;
    }, 1);

    // Tạo các tab tuần
    let tabList = "";
    for (let i = 1; i <= maxWeek; i++) {
        tabList += `<li class="nav-item">
        <a class="nav-link ${i === 1 ? "active" : ""
            }" href="#" data-week="${i}">Tuần ${i}</a>
    </li>`;
    }

    // Chỉ gắn vào HTML của `weekTabs`
    $("#weekTabs").html(tabList);
}

async function setupTabClickHandler(users) {
    // Sử dụng selector đặc biệt để chỉ chọn các tab trong `weekTabs`
    $("#weekTabs").on("click", ".nav-link", function (event) {
        event.preventDefault();

        // Bỏ class 'active' khỏi tất cả các tab trong `weekTabs` và thêm vào tab được chọn
        $("#weekTabs .nav-link").removeClass("active");
        $(this).addClass("active");

        // Lấy tuần hiện tại từ tab
        let selectedWeek = parseInt($(this).data("week"));

        // Cập nhật bảng theo tuần được chọn
        renderGroupDiaryTable(users, selectedWeek);
    });
}

async function renderGroupDiaryTable(users, week) {
    let tableContent = "";

    users.forEach((user) => {
        // Nếu không có `group_diary` hoặc tuần yêu cầu không có dữ liệu, dùng giá trị mặc định
        let diaryEntry = (user.group_diary &&
            user.group_diary[week - 1]) || { description: "", assessment: 0 };
        console.log(
            `user: ${user.id}, name: ${user.fullname}, diaryEntry: `,
            diaryEntry
        ); // Log thông tin từng user

        tableContent += `<tr>
                        <td>${user.id}</td>
                        <td>${user.fullname}</td>
                        <td>${!diaryEntry.description
                ? ""
                : diaryEntry.description
            }</td>
                        <td>
                          <div class="progress" role="progressbar" aria-valuenow="${diaryEntry.assessment
            }" aria-valuemin="0" aria-valuemax="100" style="height: 10px">
                              <div class="progress-bar" style="width: ${diaryEntry.assessment
            }%"></div>
                          </div>
                      </td>
                    </tr>`;
    });

    // Gắn vào HTML của bảng
    $("#groupDiaryTable tbody").html(tableContent);
}