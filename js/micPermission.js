
// https://www.npmjs.com/package/cordova-plugin-android-permissions - plugin
// cordova plugin add cordova-plugin-android-permissions - only plugin installed

// https://developer.android.com/reference/android/Manifest.permission.html - list of permissions
// https://developer.android.com/guide/topics/permissions/overview#normal-dangerous - types of permissions

let app = {
    permissions: null,

    init: function () {
        document.addEventListener('deviceready', app.ready);
    },
    ready: function () {
        document.querySelector('#btnMic').addEventListener('click', app.micPerm);
        app.permissions = cordova.plugins.permissions;
    },

    micPerm: function () {
        //plugins ready
        cordova.plugins.permissions.checkPermission("android.permission.RECORD_AUDIO", function (status) {
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'success checking permission';
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'Has MICROFONE: ' + status.hasPermission;
            if (!status.hasPermission) {
                app.permissions.requestPermission("android.permission.RECORD_AUDIO", function (status) {
                    document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'success requesting MICROFONE permission';
                }, function (err) {
                    document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'failed to set permission';
                });
            }
        }, function (err) {
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  err;
        });
    }
}
app.init();