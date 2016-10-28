<html>

<head>
  <meta charset="UTF-8">
  <title>WiList</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <form action="/new_message.php" method="post">
    <input name="title"type="text" placeholder="Title" maxlength=60 autofocus><br/>
    <input name="name" type="text" placeholder="Your Name" maxlength=30><br/>
    <input name="phone" type="text" placeholder="Your Phone Number" maxlength=14><br/>
    <select name="category" title="Category selection">
      <option>Select Category</option>
      <option value="real_estate">Real Estate</option>
      <option value="advertising">Advertsing</option>
      <option value="events">Events</option>
    </select><br/>
    </select><br/>
    <select name="list" title="WiList selection">
      <option>Select Destination</option>
      <option value="paris">Paris</option>
      <option value="london">London</option>
      <option value="berlin">Berlin</option>
    </select><br/>
    <textarea name="message" placeholder="Message" id="message_body" maxlength=500></textarea><br/>
    <input type="submit">
  </form>
</body>

</html>
