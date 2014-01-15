<?
if ($_REQUEST['debug']) {
    print_r($_REQUEST);
    exit(0);
}

$records = json_decode(stripslashes($_REQUEST['records']));


echo $_REQUEST['callback'] . "{success:true, records : { id : " . json_encode($records).  "}}";
?>

