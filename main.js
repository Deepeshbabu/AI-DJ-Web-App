lwY = 0 ;
lwX = 0 ;
rwX = 0 ;
rwY = 0 ;
song = "" ;
slw = 0 ;
srw = 0 ;

function preload() 
{
    song = loadSound("music.mp3") ;
}

function setup() 
{
    canvas = createCanvas(600,500) ;
    canvas.center() ;

    video = createCapture(VIDEO) ;
    video.hide() ;

    poseNet  = ml5.poseNet(video, modelLoaded) ;
    poseNet.on('pose', gotPoses) ;
}

function gotPoses(results) 
{
    if(results.length>0)
    {
        console.log(results);
        slw = results[0].pose.keypoints[9].score ;
        srw = results[0].pose.keypoints[10].score ;
        console.log("score lw = " + slw + "score rw = " + srw);

        lwX = results[0].pose.leftWrist.x ;
        lwY = results[0].pose.leftWrist.y ;
        console.log(lwX,lwY);

        rwX = results[0].pose.rightWrist.x ;
        rwY = results[0].pose.rightWrist.y ;
        console.log(rwX,rwY);
    }
}

function modelLoaded() 
{
    console.log("PoseNet Is Initialized!");    
}

function draw() 
{
    image(video,0,0,600,500) ;

    fill("FF0000") ;
    stroke("FF0000") ;

    if(srw>0.2)
    {
        circle(rwX,rwY,20) ;
        if(rwY > 0 && rwY <= 100) 
        {
            document.getElementById("speed").innerHTML = "Speed : 0.5x" ;
            song.rate(0.5) ;
        }
        if(rwY > 100 && rwY <= 200) 
        {
            document.getElementById("speed").innerHTML = "Speed : 1x" ;
            song.rate(1) ;
        }
        if(rwY > 200 && rwY <= 300) 
        {
            document.getElementById("speed").innerHTML = "Speed : 1.5x" ;
            song.rate(1.5) ;
        }
        if(rwY > 300 && rwY <= 400) 
        {
            document.getElementById("speed").innerHTML = "Speed : 2x" ;
            song.rate(2) ;
        }
        if(rwY > 400 && rwY <= 500) 
        {
            document.getElementById("speed").innerHTML = "Speed : 2.5x" ;
            song.rate(2.5) ;
        }
    }

    if(slw>0.2)
    {
        circle(lwX,lwY,20) ;
        vn = Number(lwY) ;
        v = floor(vn) ;
        volume = v/500 ;
        document.getElementById("volume").innerHTML = "Volume : " + volume ;
        song.setVolume(volume) ;
    }
}

function play() 
{
    song.play() ;
    song.setVolume(1) ;
    song.rate(1) ;
}