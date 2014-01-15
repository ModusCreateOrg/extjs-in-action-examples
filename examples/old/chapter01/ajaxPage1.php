<?
$date = date("m/d/Y");
$time = date("h:j:s A");
$server = $_SERVER['HTTP_HOST'];
$server = "extweb";
echo "<div>Hello from server <b>$server</b>.</div>";
echo "<div> This is my first ajax page, which was served on $date at $time.</div>";
?>
