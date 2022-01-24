
var app = {
    track: {
        src: 'file:///android_asset/www/audio/bleed_it_out.mp3',
        title: 'Fight Club Rules',
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
    err:{
        '0':'EVERYTHING OK',
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED'
    }
};

    function init() {
        document.addEventListener('load', app.ready, false);
    };
    function ready() {
        app.addListeners();
        let src = app.track.src;
        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
    };
    function ftw(){
        //success creating the media object and playing, stopping, or recording
        console.log('success doing something');
    };
    function wtf(err){
        //failure of playback of media object
        console.warn('failure');
        console.error(err);
    };
    function statusChange(status){
        console.log('media status is now ' + app.status[status] );
    };
    function addListeners(){
    	alert("ALO");

        document.getElementById('play-btn').addEventListener('click', play());
        document.getElementById('pause-btn').addEventListener('click', pause());
        document.getElementById('up-btn').addEventListener('click', volumeUp());
        document.getElementById('down-btn').addEventListener('click', volumeDown());
        document.getElementById('ff-btn').addEventListener('click', ff());
        document.getElementById('rew-btn').addEventListener('click', rew)();
        document.addEventListener('pause', ()=>{
            app.media.release();
        });
        document.addEventListener('menubutton', ()=>{
            console.log('clicked the menu button');
        });
        document.addEventListener('resume', ()=>{
            app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        })
    };
    function play(){
        app.media.play();
    };
    function pause(){
        app.media.pause();
    };
    function volumeUp(){
        vol = parseFloat(app.track.volume);
        console.log('current volume', vol);
        vol += 0.1;
        if(vol > 1){
            vol = 1.0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
    };
    function volumeDown(){
        vol = app.track.volume;
        console.log('current volume', vol);
        vol -= 0.1;
        if(vol < 0){
            vol = 0;
        }
        console.log(vol);
        app.media.setVolume(vol);
        app.track.volume = vol;
    };
    function ff(){
        let pos = app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos += 10;
            if(pos < dur){
                app.media.seekTo( pos * 1000 );
            }
        });
    };
    function rew(){
        let pos = app.media.getCurrentPosition((pos)=>{
            pos -= 10;
            if( pos > 0){
                app.media.seekTo( pos * 1000 );
            }else{
                app.media.seekTo(0);
            }
        });
    };

init(); 