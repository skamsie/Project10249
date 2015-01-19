if (sessionStorage.backgroundImage) {
    var backgroundMode = sessionStorage.getItem("var-mode");
    document.getElementById('change-background').innerHTML = sessionStorage.getItem("time-mode");
    document.getElementsByTagName('body')[0].style.backgroundImage = sessionStorage.backgroundImage;
    document.getElementsByTagName('body')[0].style.color = sessionStorage.color;

  } else { var backgroundMode = "0";
           document.getElementsByTagName('body')[0].style.backgroundImage = "url('images/squairy_light.png')";
           document.getElementById('change-background').innerHTML = "Night Mode";
  }

  document.getElementsByTagName('button')[0].onclick = function() {
    if (backgroundMode == "0") {
      sessionStorage.backgroundImage = "url('images/stardust.png')";
      sessionStorage.color = "#ffffff";
      sessionStorage.setItem("time-mode", "Day Mode");
      sessionStorage.setItem("var-mode", "1");

    } else {
      sessionStorage.backgroundImage = "url('images/squairy_light.png')";
      sessionStorage.color = "#000000";
      sessionStorage.setItem("time-mode", "Night Mode");    
      sessionStorage.setItem("var-mode", "0");

    }
    document.getElementById('change-background').innerHTML=sessionStorage.getItem("time-mode");
    document.getElementsByTagName('body')[0].style.backgroundImage=sessionStorage.backgroundImage;
    document.getElementsByTagName('body')[0].style.color=sessionStorage.color;
    backgroundMode = sessionStorage.getItem("var-mode");
  }