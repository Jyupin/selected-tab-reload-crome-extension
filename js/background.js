function getSelectedTabIds(vm, callback) {
    var tabIds = [];
    chrome.windows.getAll({populate: true}, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                if(!vm.setting.url_list){
                    var urls = [];
                    vm.setting.urls.forEach(function (url) {
                        urls.push(url.tag);
                    });
                    vm.setting.url_list = urls;
                }
                if (vm.setting.url_list.indexOf(tab.url) > -1) {
                    tabIds.push(tab.id);
                }
            });
        });
    });
    setTimeout(function () {
        if (callback) callback(tabIds);
    }, 0);
}

function reloadTab(vm) {
    vm.setting = localStorage.getItem('autoReloadSetting');
    if (vm.setting) {
        vm.setting = JSON.parse(vm.setting);
        if (vm.setting.flag) {
            var reloadType, time, min, max, timeInMinutes, timeInMillisecond;
            reloadType = parseInt(vm.setting.reloadType);
            time = parseInt(vm.setting.time);
            min = parseInt(vm.setting.min_time);
            max = parseInt(vm.setting.max_time);
            if (reloadType == 1)
                timeInMinutes = time;
            else if (reloadType == 2)
                timeInMinutes = Math.floor(Math.random() * (max - min + 1) + min);
            else
                timeInMinutes = 5;
            timeInMillisecond = timeInMinutes * 60 * 1000;
            setTimeout(function () {
                getSelectedTabIds(vm, function (tabIds) {
                    tabIds.forEach(function (tabId) {
                        chrome.tabs.reload(tabId);
                    });
                });
                reloadTab(vm);
            }, timeInMillisecond);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var vm = this;
    vm.setting = localStorage.getItem('autoReloadSetting');
    if (vm.setting) vm.setting = JSON.parse(vm.setting);
    if (vm.setting.flag) {
        var urls = [];
        vm.setting.urls.forEach(function (url) {
            urls.push(url.tag);
        });
        vm.setting.url_list = urls;
        reloadTab(vm);
    }
});