<?
mysql_connect("localhost", "extjsinaction", "extjsinaction") or die("could not connect:".mysql_error());
mysql_select_db("extjsinaction");

$queryText  = $_REQUEST['query'];
$start      = 0;
$column     = $_REQUEST['sort'];
$department = $_REQUEST['node'];
$direction  = $_REQUEST['dir'];

if (! $direction) { $direction = 'asc'; }
if (! $department) { $column = 'column'; }

$end = $start + limit;

$SQL = "select name from departments order by name asc";

$res = mysql_query($SQL) or die("data read failed:".mysql_error());
$records = array();

while($row = mysql_fetch_array($res)) {
    $obj = new stdClass();
    $obj->text = $row['name'];
    $obj->id   = $row['name'];
    $obj->children = Array();
    array_push($records, $obj);
}


print json_encode($records);
?>
