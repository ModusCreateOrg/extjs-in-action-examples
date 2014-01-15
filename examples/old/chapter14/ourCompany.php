<?
	/* WP LIBS */
    if ($_SERVER["HTTP_HOST"] == "ext2play") {
        $root = "../../../tdgi";
    }
    else {
          $root = "../../";
    }
	require_once( "$root/wp-config.php");
	require_once( "$root/wp-includes/wp-db.php");
	require_once( "$root/wp-includes/functions.php");

	$wpdb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);
	$queryText  = $_REQUEST['query'];
	$start      = 0;
	$column     = $_REQUEST['sort'];
    $department = $_REQUEST['node'];

	$direction = $_REQUEST['dir'];

	if (! $direction) {
		$direction = 'asc';
	}

	if (! $department) {
		$column = 'column';
	}

	$end = $start + limit;


    $SQL = "select distinct department from extia order by department asc";
	if ($limit) {
		$SQL .= " limit $start, $limit";
	}

	$numRecords = $wpdb->query($SQL);

	$records =  $wpdb->get_results($SQL);

	while (list($num, $record) = each ($records)) {

        $record->text     = $record->department;
        $record->id       = $record->department;
        $record->type     = 'department';
        $record->children = Array();
	}
    print json_encode($records);


?>

