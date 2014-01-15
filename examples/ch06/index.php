<?php
$d = dir('.');
while($f = $d->read()){
    if($f == '.' || $f == '..' || substr($f, 0, 1) == '.')continue;
	print "<a href='$f'>$f</a><br />";

}
?>
