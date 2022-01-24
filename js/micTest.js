
// https://www.npmjs.com/package/cordova-plugin-android-permissions - plugin
// cordova plugin add cordova-plugin-android-permissions - only plugin installed

// https://developer.android.com/reference/android/Manifest.permission.html - list of permissions
// https://developer.android.com/guide/topics/permissions/overview#normal-dangerous - types of permissions

let app = {
    media:null,
    permissions: null,
    track: {
        src: {
            '0':'file:///android_asset/www/bleed_it_out.mp3',
            '1':'file:///android_asset/www/audio/8d_nightcore_yasuo.mp3',
            '2':'file:///android_asset/www/audio/lost_in_the_rhythm.mp3'
        },
        file:0,
        volume: 0.5
    },
    status:{
        '0':'MEDIA_NONE',
        '1':'MEDIA_STARTING',
        '2':'MEDIA_RUNNING',
        '3':'MEDIA_PAUSED',
        '4':'MEDIA_STOPPED'
    },
    mError:{
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED'
    },
    init: function () {
        document.addEventListener('deviceready', app.ready);
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'init';
    },
    ready: function () {
        //plugins ready
        app.permissions = cordova.plugins.permissions;
        // console.log(app.permissions);
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  app.permissions;
        app.addListeners();
        let src = app.track.src[0];
    },
    addListeners: function(){
        //add button listeners
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'adding listeners';
        document.querySelector('#btnMic').addEventListener('click', app.micPerm);
        document.querySelector('#rec-start-btn').addEventListener('click', app.recStart);
        document.querySelector('#rec-pause-btn').addEventListener('click', app.recPause);
        document.querySelector('#rec-resume-btn').addEventListener('click', app.recResume);
        document.querySelector('#break-btn').addEventListener('click', app.recStop);
        document.querySelector('#play-btn').addEventListener('click', app.play);
        document.querySelector('#pause-btn').addEventListener('click', app.pause);
        document.querySelector('#stop-btn').addEventListener('click', app.stop);
        document.querySelector('#up-btn').addEventListener('click', app.volumeUp);
        document.querySelector('#down-btn').addEventListener('click', app.volumeDown);
        document.querySelector('#ff-btn').addEventListener('click', app.ff);
        document.querySelector('#rew-btn').addEventListener('click', app.rew);
        document.querySelector('#next-btn').addEventListener('click', app.next);
        document.querySelector('#prev-btn').addEventListener('click', app.prev);
        document.addEventListener('pause', ()=>{
            app.media.release();
        });
        document.addEventListener('menubutton', ()=>{
            console.log('clicked the menu button');
        });
        document.addEventListener('resume', ()=>{
            app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        })
    },
    micPerm: function () {
        permissions.checkPermission("android.permission.RECORD_AUDIO", function (status) {
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'success checking permission';
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'Has MICROFONE: ' + status.hasPermission;
            if (!status.hasPermission) {
                permissions.requestPermission("android.permission.RECORD_AUDIO", function (status) {
                    document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'success requesting MICROFONE permission';
                }, function (err) {
                    document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'failed to set permission';
                });
            }
        }, function (err) {
            document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  err;
        });
    },
    ftw: function(){
        //success creating the media object and playing, stopping, or recording
        console.log('success doing something');
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  "success doing something!";
    },
    wtf: function(mError){
        //failure of playback of media object
        console.warn('failure');
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  "failure!";
        console.error(mError);
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  mError;
    },
    statusChange: function(status){
        console.log('media status is now ' + app.status[status] );
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'media status is now ' + app.status[status];
    },
    play: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  "play clicked!";
        app.media.play();
    },
    pause: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "pause clicked!";
        app.media.pause();
    },
    pause: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "stoped playing!";
        app.media.stop();
    },
    recStart: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "Started recording!";
        app.media.startRecord();
    },
    recPause: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "Paused recording!";
        app.media.pauseRecord();
    },
    recResume: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "Resumed recording!";
        app.media.resumeRecord();
    },
    recStop: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "Stoped recording!";
        app.media.stopRecord();
    },
    volumeUp: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  "up clicked!";
        vol = parseFloat(app.track.volume);
        vol += 0.1;
        if(vol > 1){
            vol = 1.0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
        document.getElementById('msgDisplay').innerHTML = this.innerHTML + 'current volume: ' + vol;
    },
    volumeDown: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "down clicked!";
        vol = app.track.volume;
        vol -= 0.1;
        if(vol < 0){
            vol = 0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' +  'current volume: ' + vol;
    },
    ff: function(){
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + "fast forward clicked!";
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            pos += 10;
            if(pos < dur){
                app.media.seekTo( pos * 1000 );
            }
        });
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + 'current position: ' + pos;
        document.getElementById('msgDisplay').innerHTML = this.innerHTML  +  '<br>' + 'duration: ' + dur;
    },
    rew: function(){
        document.getElementById('msgDisplay').innerHTML = "rewind clicked!";
        app.media.getCurrentPosition((pos)=>{
            pos -= 10;
            if( pos > 0){
                app.media.seekTo( pos * 1000 );
            }else{
                app.media.seekTo(0);
            }
        });
        document.getElementById('msgDisplay').innerHTML = this.innerHTML +  '<br>' + 'current position: ' + pos;
        document.getElementById('msgDisplay').innerHTML = this.innerHTML  +  '<br>' + 'duration: ' + dur;
    }

}
app.init();