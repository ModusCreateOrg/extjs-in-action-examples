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
    $department = $_REQUEST['node'];

	$direction = $_REQUEST['dir'];

	if (! $direction) {
		$direction = 'asc';
	}

	if (! $department) {
		$column = 'column';
	}

	$end = $start + limit;

	if ($department != 'theirCompany') {


        $whereClause =  "where upper(department) like upper('$department') ";

        $SQL = "select
                firstname, lastname, id, department
            from
                extia
            $whereClause";

           // order by upper(lastname) $direction ";

         $textProperty = 'fullName';
         $limit = 5;

    }
    else {
        $SQL = "select distinct department from extia order by department asc";
    }

	if ($limit) {
		$SQL .= " limit $start, $limit";
	}

	$numRecords = $wpdb->query($SQL);

	$records =  $wpdb->get_results($SQL);

	while (list($num, $record) = each ($records)) {
	    if ($department != 'theirCompany') {
            $record->text     = $record->lastname . ", " . $record->firstname;
            $record->leaf     = true;
            //$record->editable = true;
            unset($record->firstname);
            unset($record->lastname);
            if ($record->department == 'Accounting' || $record->department == 'Finances'  || $record->department == 'Payroll') {
                $record->validDropPoints = Array('Accounting', 'Finances', 'Payroll')    ;
            }
            else if ($record->department == 'Customer Relations' || $record->department == 'Customer Service'  || $record->department == 'Media Relations'  || $record->department == 'Public Relations') {
                $record->validDropPoints = Array('Customer Relations', 'Media Relations', 'Customer Service', 'Public Relations')    ;
            }
            else if ($record->department == 'Advertising' || $record->department == 'Sales and Marketing' ) {
                $record->validDropPoints = Array('Advertising', 'Sales and Marketing')    ;
            }
            else if ($record->department == 'Tech Support' || $record->department == 'Quality Assurance'  || $record->department == 'Research and Development') {
               $record->validDropPoints = Array('Tech Support', 'Quality Assurance', 'Research and Development')    ;
            }
            else {
                $record->validDropPoints = Array($record->department)    ;
            }
               $record->qtip = $record->validDropPoints;

        }
        else {

            $record->text     = $record->department;
            $record->id       = $record->department;
            $record->type     = 'department';

        }
	}
    print json_encode($records);

#}

?>

