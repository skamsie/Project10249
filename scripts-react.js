var clickedTime;
var createdTime;
var reactionTime;
var bestTime;
var tries = 0;


function getSessionStorage() {
  document.getElementsByTagName('body')[0].style.backgroundImage=sessionStorage.backgroundImage || '#ffffff';
  document.getElementsByTagName('body')[0].style.color=sessionStorage.color;
}

function getRandomColor() {
  var letters = "0123456789abcdef".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
  color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}
    
function getRandomPosition(element) {
  var x = document.body.offsetHeight-element.clientHeight;
	var y = document.body.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}
    
function makeBox() {
  var time = Math.random();
  time = time * 800;
  var top=Math.random();
  var left=Math.random();
  var currentColor = getRandomColor();
  
  setTimeout(function() {
    if (Math.random()>0.5) {
      document.getElementById("box").style.borderRadius = "50%";
    } else {
      document.getElementById("box").style.borderRadius = "3%";
    }
    var myDiv = document.getElementById("box");
	  document.body.appendChild(myDiv);
	  var xy = getRandomPosition(myDiv);
	  myDiv.style.top = xy[0] + 'px';
	  myDiv.style.left = xy[1] + 'px';
    document.getElementById("box").style.backgroundColor = currentColor;
    document.getElementById("color").innerHTML = currentColor;
    document.getElementById("box").style.display="block";
    createdTime=Date.now(); 
  }, time);
}
    
document.getElementById("box").onclick=function() {
  tries++;
  clickedTime = Date.now();
  reactionTime = (clickedTime - createdTime) / 1000;
  document.getElementById("time").innerHTML = reactionTime + " s";
  if (bestTime == undefined || bestTime > reactionTime) {
    bestTime = reactionTime;
  }
  document.getElementById("best").innerHTML = bestTime + " s";
  document.getElementById("tries").innerHTML = tries;
  this.style.display="none";
  makeBox();
}
    
getSessionStorage();
makeBox();