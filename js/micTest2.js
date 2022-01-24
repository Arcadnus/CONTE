//

let app = {
    track: {
        src: {
        	'0':'file:///android_asset/www/audio/8d_nightcore_yasuo.mp3',
        	'1':'file:///android_asset/www/audio/bleed_it_out.mp3',
        	'2':'file:///android_asset/www/audio/lost_in_the_rhythm.mp3'
    	},
    	file:0,
        volume: 0.5
    },
    media:null,
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
    init: function() {
        document.addEventListener('deviceready', app.ready, false);
    },
    ready: function() {
        app.addListeners();
        let src = app.track.src[0];
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
    },
    ftw: function(){
        //success creating the media object and playing, stopping, or recording
        console.log('success doing something');
    },
    wtf: function(mError){
        //failure of playback of media object
        console.warn('failure');
        console.error(mError);
    },
    statusChange: function(status){
        console.log('media status is now ' + app.status[status] );
    },
    addListeners: function(){
        document.querySelector('#play-btn').addEventListener('click', app.play);
        document.querySelector('#pause-btn').addEventListener('click', app.pause);
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
    play: function(){
    	document.getElementById('msgDisplay').innerHTML = "play clicked!";
        app.media.play();
    },
    pause: function(){
    	document.getElementById('msgDisplay').innerHTML = "pause clicked!";
        app.media.pause();
    },
    volumeUp: function(){
    	document.getElementById('msgDisplay').innerHTML = "up clicked!";
        vol = parseFloat(app.track.volume);
        console.log('current volume', vol);
        vol += 0.1;
        if(vol > 1){
            vol = 1.0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
    },
    volumeDown: function(){
    	document.getElementById('msgDisplay').innerHTML = "down clicked!";
        vol = app.track.volume;
        console.log('current volume', vol);
        vol -= 0.1;
        if(vol < 0){
            vol = 0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
    },
    ff: function(){
    	document.getElementById('msgDisplay').innerHTML = "fast forward clicked!";
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos += 10;
            if(pos < dur){
                app.media.seekTo( pos * 1000 );
            }
        });
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
    },
    next: function(){
    	document.getElementById('msgDisplay').innerHTML = "next clicked!";
        app.media.release();
        file = app.media.file;
        file + 1;
        if (file>3) {
        	file = 3;
        }
        let src = app.track.src[file];
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
    },
    prev: function(){
    	document.getElementById('msgDisplay').innerHTML = "previous clicked!";
        app.media.release();
        file = app.media.file;
        file - 1;
        if (file<0) {
        	file = 0;
        }
        let src = app.track.src[file];
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
    },
};

app.init();