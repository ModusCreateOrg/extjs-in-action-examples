<?

	/* WP LIBS */
	$root = "../../tdgi";
	require_once( "$root/wp-config.php");
	require_once( "$root/wp-includes/wp-db.php");
	require_once( "$root/wp-includes/functions.php");

	$wpdb = new wpdb(DB_USER,DB_PASSWORD,DB_NAME,DB_HOST);



	$SQL = "select id from extia";

	$wpdb->query($SQL);

	$records =  $wpdb->get_results($SQL);

	while (list($num, $record) = each ($records)) {
	    $id = $record->id;
		$salary = rand(20000, 60000);
		$salary = number_format($salary);

        $SQL = "update extia set salary=$salary where id = $id";

        $wpdb->query($SQL);

        $r =  $wpdb->get_results($SQL);

        print "<br />";
		print $record->id . " - $salary<br />";



	}




?>

