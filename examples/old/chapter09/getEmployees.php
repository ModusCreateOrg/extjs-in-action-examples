<?
#if ($_REQUEST['query']) {
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
	$queryText = $_REQUEST['query'];
	$start    = 0;
	$column   = $_REQUEST['sort'];
    $department = $_REQUEST['department'];

	$direction = $_REQUEST['dir'];

	if (! $direction) {
		$direction = 'asc';
	}

	if ($department) {
        $SQL = "select *  from extia where department = '$department' order by lastname, firstname asc";

	}
    else {
        $SQL = "select *  from extia order by lastname, firstname asc";    
    }
	$end = $start + limit;



	$numRecords = $wpdb->query($SQL);

	$records =  $wpdb->get_results($SQL);

        while (list($num, $record) = each ($records)) {
            $record->email = strtolower($record->firstname) . "." . strtolower($record->lastname) . "@mycompany.com";
            $record->dob =  date("m/d/Y", strtotime($record->dob));
            $record->datehired =  date("m/d/Y", strtotime($record->datehired));

        }
    print json_encode($records);

#}

?>

