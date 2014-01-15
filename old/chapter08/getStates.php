<?
#if ($_REQUEST['query']) {

if ($_SERVER["HTTP_HOST"] == "ext2play") {
    $root = "../../../extjsinaction.com";
}
else {
      $root = "../../";
}
$root = "../../../extjsinaction.com";
require_once( "$root/wp-config.php");
require_once( "$root/wp-includes/wp-db.php");
require_once( "$root/wp-includes/functions.php");


$wpdb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
$callback = $_REQUEST['callback'];

$SQL = "select
        distinct state
    from
        extia
    order by upper(state) asc";

$numRecords = $wpdb->query($SQL);

if ($limit) {
    $SQL .= "limit $start, $limit";
}

$records =  $wpdb->get_results($SQL);

print     "{ "
    . '"totalCount" : "' . $numRecords . '", '
    . '"records" : [';

$recordNum = count($records);

while (list($num, $record) = each ($records)) {
    $X++;
    print json_encode($record);

    if ($recordNum > $X)  {
        print ",";
    }

}

print "]}";
if ($callback) {
    print ";";
}

#}

?>

