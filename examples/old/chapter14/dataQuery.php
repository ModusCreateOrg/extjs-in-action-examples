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
	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$callback = $_REQUEST['callback'];
	$column = $_REQUEST['sort'];
	if (! $limit) {
	    $limit =20;
    }
	$direction = $_REQUEST['dir'];

	if (! $direction) {
		$direction = 'asc';
	}	
	if (! $column) {
		$column = 'lastname';
	}
	$start++;
	$end = $start + limit;
	
	if ($queryText) {
    		$whereClause =  "where upper($column) like upper('$queryText%') ";
	}

	$SQL = "select 
			*		
		from 
			extia	
		$whereClause ";
	
	$numRecords = $wpdb->query($SQL);

	if ($limit) {
		$SQL .= "limit $start, $limit"; 
	}

	$records =  $wpdb->get_results($SQL);
	if ($callback) {
	    print $callback  . "(";
    }
	print     "{ "
		. '"totalCount" : "' . $numRecords . '", '
		. '"records" : [';

	$recordNum = count($records);	

	while (list($num, $record) = each ($records)) {
		$X++;
        $record->fullName = $record->lastname . ", " . $record->firstname;		
		print json_encode($record);
		
		if ($recordNum > $X)  {
			print ",";
		}
		
	}

	print "]}";
	if ($callback) {
		print ");";
	}

#}

?>

