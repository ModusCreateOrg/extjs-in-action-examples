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
	$limit    = 15;
	$column   = $_REQUEST['sort'];
    $department = $_REQUEST['node'];

	$direction = $_REQUEST['dir'];

	if (! $direction) {
		$direction = 'asc';
	}

	if (! $department) {
		$column = 'column';
	}

	$end = $start + limit;

	if ($department != 'myCompany') {


        $whereClause =  "where upper(department) like upper('$department')";

        $SQL = "select
                firstname, lastname, id
            from
                extia
            $whereClause";
           // order by upper(lastname) $direction ";

         $textProperty = 'fullName';
         
    }
    else {
        $SQL = "select distinct department from extia order by department asc";
    }

	$numRecords = $wpdb->query($SQL);

	if ($limit) {
		$SQL .= " limit $start, $limit";
	}

	$records =  $wpdb->get_results($SQL);

	while (list($num, $record) = each ($records)) {
	    if ($department != 'myCompany') {
            $record->text     = $record->lastname . ", " . $record->firstname;
            $record->leaf     = true;
            //$record->editable = true;
            unset($record->firstname);
            unset($record->lastname);
        }
        else {
            $record->text     = $record->department;
            $record->id       = $record->department;
            unset($record->department);
        }
	}
    print json_encode($records);

#}

?>

