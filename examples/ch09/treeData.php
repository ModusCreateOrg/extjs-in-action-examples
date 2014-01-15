<?
#if ($_REQUEST['query']) {
/* WP LIBS */
if ($_SERVER["HTTP_HOST"] == "ext2play") {
    $root = "../../../tdgi";
} else {
    $root = ".";
}
require_once("$root/wp-config.php");
require_once("$root/wp-includes/wp-db.php");
require_once("$root/wp-includes/functions.php");

$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$queryText = $_REQUEST['query'];
$start = 0;
$column = $_REQUEST['sort'];
$department = $_REQUEST['node'];
$callback = $_REQUEST['callback'];

$direction = $_REQUEST['dir'];

if (!$direction) {
    $direction = 'asc';
}

if (!$department) {
    $column = 'column';
}

$end = $start + limit;


if (!$department || $department == 'root') {
    $SQL = "select id, name from departments order by name asc";
    $numRecords = $wpdb->query($SQL);
    $records = $wpdb->get_results($SQL);
    while (list($num, $record) = each($records)) {
        $SQL = "select count(id) count from employees where departmentId = " . $record->id;
        $wpdb->query($SQL);
        $rows = $wpdb->get_results($SQL);
        $record->numEmployees = $rows[0]->count;
    }
    #$records = array( 'text' => '', children => $records);
} else {
    $SQL = "select * from employees where departmentId = $department";
    $records = $wpdb->get_results($SQL);
    while (list($num, $record) = each($records)) {
        $record->id = 'employee-' . $record->id;
        $record->leaf = true;
        $record->text = $record->lastName . ',' . $record->firstName;
        $record->name = $record->lastName . ',' . $record->firstName;
    }
}


if ($callback) {
    print     "$callback(";
}

print json_encode($records);

if ($callback) {
    print ");";
}