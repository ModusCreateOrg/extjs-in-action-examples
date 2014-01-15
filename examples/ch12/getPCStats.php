<?
mysql_connect("localhost", "extjsinaction", "extjsinaction") or die("could not connect:".mysql_error());
mysql_select_db("extjsinaction");

$callback = $_REQUEST['callback'];
$SQL = "select d.id,d.name as departmentName , count(e.id) as workStationCount from departments d, employees e where d.id=e.departmentId group by d.id";

$res = mysql_query($SQL) or die("data read failed:". mysql_error());
$records = array();
while($row = mysql_fetch_array($res)) {
  $obj = new StdClass();
  $obj->departmentName    = $row['departmentName'];
  $obj->workstationCount  = $row['workStationCount'];
  array_push($records, $obj);
}

if ($callback) {
	print $callback . "(";
}
print json_encode($records);
if ($callback) {
    print ");";
}

?>
