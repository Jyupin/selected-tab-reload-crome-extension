var urls = ['https://www.fiverr.com/', 'https://www.upwork.com/ab/find-work/'];

function getSelectedTabIds(callback) {
    var tabIds = [];
    var html = '<h3 style="color: green;">Reload all following Selective tabs</h3>';
    chrome.windows.getAll({populate: true}, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                if (urls.indexOf(tab.url) > -1) {
                    html += '<p>' + tab.url + '</p>';
                    tabIds.push(tab.id);
                }
            });
        });
    });
    setTimeout(function () {
        if (callback) callback(html, tabIds);
    }, 0);
}

function reloadTab() {
    getSelectedTabIds(function (html, tabIds) {
        if (tabIds.length)
            document.getElementById('status').innerHTML = html;
        $.each(tabIds, function (index, tabId) {
            chrome.tabs.reload(tabId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    reloadTab();
});
