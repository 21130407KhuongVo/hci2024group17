function setHeader() {
    $("#navigation").load("../header.html");
}

function setFooter() {
    $("#footer").load("../footer.html");
}

function loadYourLibrary() {
    $('#your_library').load('../homepage/your_library.html')
}

function renderSelect(title, subTitle, options) {
    // Tạo chuỗi HTML cho select
    let optionsHtml = options.map(option => `<option value="">${option}</option>`).join('');
    return `
        <div class="mb-3">
            <p class="text-start fs-5 mb-1">${title}</p>
            <div class="row align-items-center">
                <p class="text-start fs-6 col-md-6 col-12 mb-0 opacity-75">${subTitle}</p>
                <div class="col-md-6 col-12">
                    <select class="form-select" aria-label="Default select example">
                        <option selected value="">${options[0]}</option>
                        ${optionsHtml}
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderToggle(title, subTitle) {
    // Tạo chuỗi HTML cho toggle
    return `
        <div class="mb-3">
            <p class="text-start fs-5 mb-1">${title}</p>
            <div class="row align-items-center">
                <p class="text-start fs-6 col-md-6 col-12 mb-0 opacity-75">${subTitle}</p>
                <div class="col-md-6 col-12">
                    <div class="form-check d-flex justify-content-end align-items-center">
                        <label class="form-check-label form-check-toggle">
                            <input class="form-check-input" type="checkbox" />
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSettingLayout() {

    const languageOptions = [
        "English (US)",
        "Spanish (Español)",
        "French (Français)",
        "German (Deutsch)",
        "Portuguese (Português)",
        "Italian (Italiano)",
        "Russian (Русский)",
        "Japanese (日本語)",
        "Korean (한국어)",
        "Chinese (Simplified) (简体中文)",
        "Chinese (Traditional) (繁體中文)",
        "Arabic (العربية)",
        "Hindi (हिंदी)",
        "Bengali (বাংলা)",
        "Indonesian (Bahasa Indonesia)",
        "Turkish (Türkçe)",
        "Vietnamese (Tiếng Việt)",
        "Thai (ไทย)",
        "Polish (Polski)",
        "Dutch (Nederlands)"
    ];

    const streamingQualities = ["Low", "Medium", "High", "Very high"]

    const downloades = ["Low", "Medium", "High", "Very high"]

    const audioEffects = ["Loud", "Normal", "Quiet"]

    const parent = $('#content-midle .container')
    parent.append(renderSelect("Language", "Choose language - Changes will be applied after restarting the app", languageOptions))
    parent.append(renderToggle("Explicit content", "Allow playback of explicit-rated content"))
    parent.append(renderToggle("Auto play", "Enjoy nonstop listening. When your audio ends, we'll play you something similar"))    
    parent.append(`<h4 class="text-start mb-3">Audio quality</h4>`)
    parent.append(renderSelect("", "Streaming quality", streamingQualities))
    parent.append(renderSelect("", "Download", downloades))
    parent.append(renderToggle('','Auto adjust quality - Recommended setting: On'))
    parent.append(renderToggle('','Normalize volume - Set the same volume level for all songs and podcasts'))
    parent.append(renderSelect('','Volume level - Adjust the volume for your environment. Loud may diminish audio quality. No effect on audio quality in Normal or Quiet', audioEffects))
    parent.append(`<h4 class="text-start mb-3">Your Library</h4>`)
    parent.append(renderToggle('','Show Local Files'))
    parent.append(`<h4 class="text-start mb-3">Display</h4>`)
    parent.append(renderToggle('','Show the now-playing panel on click of play'))
    parent.append(renderToggle('','Display short, looping visuals on tracks (Canvas)'))
    parent.append(renderToggle('','Show announcements about new releases'))
    parent.append(renderToggle('','Show desktop notifications when the song changes'))
    parent.append(renderToggle('','See what your friends are playing'))
    // bla..bla..
}