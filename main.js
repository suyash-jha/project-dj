song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreleftWrist= 0;
scorerightWrist= 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music1.mp3");
}

function setup()
{
    canvas =  createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristY = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.y;
        

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
    }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreleftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false)
    {
        song2.play();
        document.getElementById("song").innerHTML="Playing Tom-And-Jerry"
    }
    }

    if(scorerightWrist>0.2)
    {
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(song1_status==false)
    {
        song1.play();
        document.getElementById("song").innerHTML="Playing Harry Potter"
    }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

