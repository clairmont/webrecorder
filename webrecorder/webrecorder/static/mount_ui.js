
// TODO: Patch in full list of archives
var ia = {"url":"https://web-beta.archive.org/web/", "name": "Internet Archive"};

var recorderUI;
var sourcesDropdown;
var sourceTs;
var sourceTarget;
var sourceArchive;

function renderExtractWidget(ts, source) {
    recorderUI.querySelector(".sources-widget .ts").innerHTML = ts;
    recorderUI.querySelector(".sources-widget .mnt-label").innerHTML = source;
}

function renderExtractDropdown() {
    sourcesDropdown.querySelector(".ra-source").innerHTML = sourceTarget;
    sourcesDropdown.querySelector(".ra-source-name").innerHTML = sourceArchive.name;
    sourcesDropdown.querySelector(".ra-ts").innerHTML = sourceTs;
    sourcesDropdown.querySelector(".ra-collection").innerHTML = getStorage("__wr_currCollTitle");
}

function urlEntry() {
    var val = recorderUI.querySelector("input[name='url']").value;

    if (val.startsWith(ia.url)) {
        var ts = "Most recent";
        var tsMatch = val.match(/\/(\d{8,14})\//);
        if (tsMatch) {
            ts = TimesAndSizesFormatter.ts_to_date(tsMatch[1]);
        }

        sourceTs = ts;
        sourceArchive = ia;
        sourceTarget = val.replace(ia.url, "").replace(/\d+\//, "");
        renderExtractWidget(ts, ia.name);

        recorderUI.querySelector(".input-group").classList.add("remote-archive");
    } else {
        recorderUI.querySelector(".input-group").classList.remove("remote-archive");
    }
}

$(function () {
    sourcesDropdown = document.querySelector(".sources-dropdown");
    recorderUI = document.querySelector(".new-recording-ui");
    if (recorderUI) {
        var input = recorderUI.querySelector("input[name='url']");
        input.addEventListener("keyup", urlEntry);
        urlEntry();

        recorderUI.querySelector(".sources-widget").addEventListener("click", renderExtractDropdown);
        sourcesDropdown.addEventListener("click", function (evt) { evt.stopPropagation(); });
    }
});
