<?php


  $params = file_get_contents('php://input');
  $message_file = fopen("data/cache/reportstest.json", "w") or die("Unable to open file!");
  fwrite($message_file,$params);
  fclose($message_file);

  $json = file_get_contents("data/cache/reportstest.json");
  if ($json === false) {
      $json = json_encode(array("jsonError", json_last_error_msg()));
      if ($json === false) {
          $json = '{"jsonError": "unknown"}';
      }
      http_response_code(500);
  }
  echo $json;
?>
