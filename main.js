song="";

function preload(){
song=loadSound("music.mp3");
}
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scorerightwrist=0;
scoreleftwrist=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modalloaded);
poseNet.on('pose',gotposes);
}
function modalloaded(){
console.log('posenet modal is loaded');
}
function draw(){
image(video,0,0,600,500);
fill("red");
stroke("red");

if(scorerightwrist>0.2)
{
circle(rightwristX,rightwristY,20);
if(rightwristY>0 && rightwristY<=100)
{
document.getElementById("speed").innerHTML="speed=0.5x";
song.rate(0.5);
}
else if(rightwristY>100 && rightwristY<=200)
{
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
}
else if(rightwristY>200 && rightwristY<=300)
{
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
}
else if(rightwristY>300 && rightwristY<=400)
{
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}
else if(rightwristY>400 )
{
    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);
}
}

if(scoreleftwrist>0.2)
{
circle(leftwristX,leftwristY,20);
InNumberleftWristY=Number(leftwristY);
remove_decimals=floor(InNumberleftWristY);
volume=remove_decimals/500;
document.getElementById("volume").innerHTML="volume= "+ volume;
song.setVolume(volume);
}
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function gotposes(results){
if(results.length>0){
 console.log(results);
scorerightwrist=results[0].pose.keypoints[10].score;
scoreleftwrist=results[0].pose.keypoints[9].score;
console.log("scorerightwrist="+scorerightwrist+" scoreleftwrrist= "+scoreleftwrist);

 leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
console.log("leftwristX="+leftwristX);
console.log("leftwristY=" +leftwristY);


rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("rightwristX="+rightwristX);
console.log("rightwristY="+rightwristY);
}

}