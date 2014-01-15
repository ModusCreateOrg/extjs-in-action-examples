<?

$id = $_REQUEST['id'];
$newName = $_REQUEST['newName'];
if (!$id) {
    $id = date('U');
}
echo "{success:true, node : { id : '$id', text : '$newName'}}";


?>