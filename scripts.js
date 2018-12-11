
// var beginnings = [0,21,38,59,80,101,122,143,164,181,202,211,219,239,253,273,293,313,333,355,366,387,408,429,450,471,491];
// var ends = [20,37,58,79,100,121,142,163,180,201,210,218,238,252,272,292,312,332,354,365,386,407,428,449,470,490,530];
var beginnings = [0, 19, 37, 52, 75, 93, 112, 130, 150, 168, 183];
var ends = [18, 36, 51, 74, 92, 111, 129, 149, 167, 182];
var track = document.getElementsByTagName('audio')[0];
track.load();
var soundIsOn = false;

 $( window ).on('load',function() {
    $( '#toggle-sound' ).click(() => {
        soundIsOn = !soundIsOn;
        soundIsOn ? track.play() : track.pause();
    });
    var tempo = 0;
    var currentBlockIndex = 0;
    var soundBlocks = $('son');
    
    track.ontimeupdate = function(){
        if(track.currentTime > ends[tempo]){
            // console.log('track current time', track.currentTime);
            // console.log('tempo', tempo);
            // console.log('ends[tempo]', ends[tempo]);
            // console.log('beginnings[tempo]', beginnings[tempo]);
            // console.log("finboucle : " + tempo);
            track.currentTime = beginnings[tempo] + 0.5;
        }
    };
    
    $(window).scroll(function() {
        currentBlockIndex = 0;
        var windowToTop = $(window).scrollTop();
        soundBlocks.each(function() {
            var blockToTop = $(this).offset().top;
            var blockHeight = $(this).height();            
            if(blockToTop < windowToTop && windowToTop > blockToTop + blockHeight) {
                currentBlockIndex = soundBlocks.index(this);
            }
        });
        
        if(currentBlockIndex == tempo) {
            return false;
        }

        else {
            tempo = currentBlockIndex;
            console.log('currentBlockIndex', currentBlockIndex);
            track.currentTime = beginnings[currentBlockIndex];
            if(soundIsOn){
                track.play();
            }
        }
    });
 
});
