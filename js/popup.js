function eventListener(vm) {
    /*
     * On/Off Switch
     * */
    $("#auto-reload-flag").change(function () {
        vm.setting.flag = $(this).prop('checked');
        updateSettingStorage(vm);
    });

    /*
     * Reload Type Option
     * */
    $("#reload-type").change(function () {
        vm.setting.reloadType = $(this).val();
        if (vm.setting.reloadType && vm.setting.reloadType == 1) {
            $('#fixed-time-type').removeClass('hide');
            $('#random-time-type').addClass('hide');
        }
        else if (vm.setting.reloadType && vm.setting.reloadType == 2) {
            $('#random-time-type').removeClass('hide');
            $('#fixed-time-type').addClass('hide');
        }
        updateSettingStorage(vm);
    });

    /*
     * Update Url Listing
     * */
    $('#url-chips').on('chip.add', function (e, chip) {
        vm.setting.urls = $(this).material_chip('data');
        updateSettingStorage(vm);
    });

    $('#url-chips').on('chip.delete', function (e, chip) {
        vm.setting.urls = $(this).material_chip('data');
        updateSettingStorage(vm);
    });

    /*
     * Time/Min/Max Time change
     * */
    $("#time").change(function () {
        vm.setting.time = $(this).val();
        updateSettingStorage(vm);
    });
    $("#min_time").change(function () {
        vm.setting.min_time = $(this).val();
        updateSettingStorage(vm);
    });
    $("#max_time").change(function () {
        vm.setting.max_time = $(this).val();
        updateSettingStorage(vm);
    });
}

function updateSettingStorage(vm) {
    localStorage.setItem('autoReloadSetting', JSON.stringify(vm.setting));
}

function initialization(vm) {
    $('#auto-reload-flag').prop('checked', vm.setting.flag);
    $('#url-chips').material_chip({
        placeholder: 'Enter a url',
        secondaryPlaceholder: '+URL',
        data: vm.setting.urls
    });
    $('#reload-type option[value=' + vm.setting.reloadType + ']').prop('selected', true);
    if (vm.setting.reloadType && vm.setting.reloadType == 1) {
        $('#fixed-time-type').removeClass('hide');
        $('#random-time-type').addClass('hide');
    }
    else if (vm.setting.reloadType && vm.setting.reloadType == 2) {
        $('#random-time-type').removeClass('hide');
        $('#fixed-time-type').addClass('hide');
    }
    $('#reload-type').material_select();

    $('#time').val(vm.setting.time);
    $('#min_time').val(vm.setting.min_time);
    $('#max_time').val(vm.setting.max_time);
}

document.addEventListener('DOMContentLoaded', function () {
    var vm = this;
    vm.setting = localStorage.getItem('autoReloadSetting');
    if (vm.setting) vm.setting = JSON.parse(vm.setting);
    else {
        vm.setting = {
            flag: true, urls: [{tag: 'https://www.google.com/'}], reloadType: 1, time: 5, min_time: 5, max_time: 10
        };
        updateSettingStorage(vm);
    }
    initialization(vm);
    eventListener(vm);
});
