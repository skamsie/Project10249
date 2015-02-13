<?php
  // Save GET requests for temperature and humidity to json file 
  $status['temperature'] = $_GET["temperature"];
  $status['humidity'] = $_GET["humidity"];
  $status['localtime'] = date('j F Y h:i:s A', strtotime ("+1 hour"));
    
  $fh = fopen("data.json", 'w')
    or die("Error opening output file");
  fwrite($fh, json_encode($status));
  fclose($fh);
?>