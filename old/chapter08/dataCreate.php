<?
if ($_REQUEST['debug']) {
    print_r($_REQUEST);
    exit(0);
}

$records = json_decode(stripslashes($_REQUEST['records']));

$date = date('U');
if (is_array($records)) {
    foreach ($records as $ref => $record) {
        $date++;
        $record->id = $date;
    }


}
else {
    $records->id = date('U');
}

echo $_REQUEST['callback'] . "{success:true, records : " . json_encode($records).  "}";
?>
