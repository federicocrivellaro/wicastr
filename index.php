<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-Equiv="Pragma" Content="no-cache">
    <meta http-Equiv="Expires" Content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--320-->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Gather Report</title>
    <?PHP   include_once ("server.php");?>

   
</head>

<body>
    <form href="#" id="message_sending_form">      
  <input name="user_id" id="message_user_id" type="text" hidden>
  <input name="id" id="message_id" type="text" hidden>
  <input class="stack" name="title" id="message_title" type="text" placeholder="Title" maxlength=60 autofocus>
  <input class="stack" name="name" id="message_name" type="text" placeholder="Your Name" maxlength=30>
  <input class="stack" name="phone" id="message_phone" type="text" placeholder="Your Phone Number" maxlength=14>
  <select class="stack" name="category" id="message_category" title="Category selection"></select>
  <select class="stack" name="list" id="message_list" title="WiList selection"></select>
  <textarea class="stack" name="message" placeholder="Message" id="message_body" maxlength=500></textarea>
  <button class="submit">Submit</button>
</form>
</body>

</html>
