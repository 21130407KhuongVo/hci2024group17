async function setHeader() {
    $('#navigation').load('../../components/header.html', function () {
        const selected = "nav_projects"
        setHeader(selected)
    })
}

async function setFooter() {
    $('footer').load('../../components/footer.html')
}

async function setProjects() {
    $.getJSON("../../data/information.json", function (data) {
        const users = data.users;
        const requirements = data.requirements;

        setRequirements(requirements, users);
        loadDesignTab(requirements);

        setupTabClickHandler(requirements);
    });
}

// Hàm để xử lý việc chuyển đổi nội dung cho các tab
function setupTabClickHandler(requirements) {
    // Biến kiểm tra xem đã load tab implementation chưa
    let implementationLoaded = false;

    // Lắng nghe sự kiện click vào các tab
    $("#taskTabs").on("click", ".nav-link", function (event) {
        event.preventDefault();

        // Bỏ class 'active' khỏi tất cả các tab và thêm vào tab được chọn
        $("#taskTabs .nav-link").removeClass("active");
        $(this).addClass("active");

        // Lấy id của tab được chọn
        let selectedTab = $(this).attr("href").substring(1); // Lấy phần tử id từ href

        // Ẩn tất cả các nội dung tab
        $(".tab-pane").removeClass("show active");

        // Hiển thị nội dung của tab được chọn
        $("#" + selectedTab).addClass("show active");

        // Nếu tab Implementation được chọn và chưa load lần nào, thực hiện load các liên kết
        if (selectedTab === "implementation" && !implementationLoaded) {
            loadImplementationTab(requirements);
            implementationLoaded = true; // Đánh dấu đã load
        }
    });
}

// Hàm để render nội dung cho tab Implementation
function loadImplementationTab(requirements) {
    let implementationLinksHTML = "";

    // Duyệt qua các yêu cầu để tạo danh sách button
    requirements.forEach((requirement) => {
        if (requirement.implement_src) {
            implementationLinksHTML += `
              <div class="mb-3">
                <button 
                  class="btn btn-link" 
                  data-bs-toggle="modal" 
                  data-bs-target="#codeModal" 
                  onclick="loadCodeForModal('${requirement.implement_src}')">
                  ${requirement.function} - Show Code
                </button>
              </div>
            `;
        }
    });

    // Gắn danh sách button vào phần tử #implementationContent
    $("#implementationContent").html(implementationLinksHTML);
}

// Hàm để thêm yêu cầu vào bảng
function setRequirements(requirements, users) {
    requirements.forEach((requirement, index) => {
        let proposerFullname = getUserFullname(requirement.proposer, users);
        let designerFullname = getUserFullname(requirement.designer, users);
        let implementerFullname = getUserFullname(
            requirement.implementer,
            users
        );

        let row = `<tr>
                        <td>${index + 1}</td>
                        <td>${requirement.function}</td>
                        <td>${proposerFullname}</td>
                        <td>${designerFullname}</td>
                        <td>${implementerFullname}</td>
                        <td>${requirement.estimated_time}</td>
                        <td>${requirement.status}</td>
                    </tr>`;
        $("#projectRequirementsTable tbody").append(row);
    });
}

let reqImages = []; // Khai báo biến để lưu trữ đường dẫn hình ảnh

// Hàm để load các tab Design
function loadDesignTab(requirements) {
    let accordionHTML = "";
    requirements.forEach((requirement) => {
        if (requirement.design_src && Array.isArray(requirement.design_src)) {

            // Thêm các đường dẫn hình ảnh vào reqImages
            reqImages.push(...requirement.design_src.map(src => `../../assets/images/requirements/${src}`));

            accordionHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${requirement.id_requirement}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${requirement.id_requirement}" aria-expanded="true" aria-controls="collapse${requirement.id_requirement}">
                            ${requirement.function}
                        </button>
                    </h2>
                    <div id="collapse${requirement.id_requirement}" class="accordion-collapse collapse" data-bs-parent="#accordionDesign">
                        <div class="accordion-body">
                            ${requirement.design_src.map(src => `
                                <img src="../../assets/images/requirements/${src}" alt="${requirement.function} Design" loading="lazy" class="img-fluid">
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    });
    $("#accordionDesign").html(accordionHTML);
}

// Hàm lấy fullname từ mã số sinh viên (id)
function getUserFullname(studentId, users) {
    let user = users.find((user) => user.id === parseInt(studentId)); // Tìm user theo id
    return user ? user.fullname : "(anyone)"; // Trả về fullname nếu tìm thấy, ngược lại trả về 'Không có tên'
}

window.loadCodeForModal = function (src) {
    $.get(src)
        .done(function (data) {
            // Chuyển đổi data thành chuỗi nếu cần
            const stringData = typeof data === "string" ? data : new XMLSerializer().serializeToString(data);

            // Escape nội dung HTML
            const escapedContent = stringData
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

            // Hiển thị nội dung
            $("#modalCodeContent").html(`<pre>${escapedContent}</pre>`);
            console.log("File đã được tải thành công:", src);
        })
        .fail(function () {
            $("#modalCodeContent").text("Failed to load the file.");
            console.log("Lỗi khi tải file:", src);
        });
};

// Hàm để tải xuống tất cả các file ảnh
async function downloadImages() {
    const zip = new JSZip();
    const folder = zip.folder("design_images"); // Tạo một thư mục trong ZIP

    // Lặp qua từng đường dẫn hình ảnh trong reqImages
    for (const imgSrc of reqImages) {
        const imgName = imgSrc.split('/').pop(); // Lấy tên file ảnh

        // Fetch ảnh và thêm vào ZIP
        await fetch(imgSrc)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                folder.file(imgName, blob); // Thêm file vào thư mục
            })
            .catch(error => console.error('Error fetching image:', error));
    }

    // Đợi cho tất cả các ảnh được thêm vào ZIP
    const zipContent = await zip.generateAsync({ type: "blob" });

    // Tải xuống file ZIP
    saveAs(zipContent, "design_images.zip");
}
