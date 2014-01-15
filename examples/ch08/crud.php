<?php
mysql_connect("localhost", "root", "") or die ("could not connect:".mysql_error());
mysql_select_db("extjsinaction");

require_once("employee.php");
require_once("state.php");

class Meta {
  public $success = false;
  public $msg = "";
};

class Response {
  public $data;
  public $meta;
};

$param = array();
$param["model"]     = $_REQUEST['model'];
$param["id"]        = $_REQUEST['id'];
$param["detail"]    = $_REQUEST['detail'];
$param["parent"]    = $_REQUEST['parent'];
$param["callback"]  = $_REQUEST['callback'];
$param["start"]     = $_REQUEST['start'];
$param["limit"]     = $_REQUEST['limit'];
$param["sort"]      = $_REQUEST['sort'];


if (!isset($param["model"])) { $param["model"] = "Employee"; }
if (!isset($param["detail"])) { $param["detail"] = false; }

$method    = $_REQUEST['method'];
if (!isset($method)) { $method = "READ"; }

$datain = json_decode($_REQUEST["JSON"]);
$data = array();
$msg = "";
$model = $param["model"];

//perform CRUD operations
try{
    $response = new Response();
    $response->meta = new Meta();
    switch( $method ) {
        case 'CREATE':
            $raw = '';
            $httpContent = fopen('php://input', 'r');
            while ($kb = fread($httpContent, 1024)) {
                $raw .= $kb;
            }
            fclose($httpContent);
            $datain = json_decode($raw);
            $response->data=$model::create($datain[0]);
            break;
        case 'READ':
            if (isset($param['limit'])){
                $response->meta->total = $model::totalcount($param);
            }
            $response->data = $model::read($param, $sort);
            break;
        case 'UPDATE':
            $raw = '';
            $httpContent = fopen('php://input', 'r');
            while ($kb = fread($httpContent, 1024)) {
                $raw .= $kb;
            }
            fclose($httpContent);
            $datain = json_decode($raw);
            $model::update($datain[0]);
            break;
        case 'DESTROY':
            $raw = '';
            $httpContent = fopen('php://input', 'r');
            while ($kb = fread($httpContent, 1024)) {
                $raw .= $kb;
            }
            fclose($httpContent);
            $datain = json_decode($raw);
            $response->data=$model::destroy($datain[0]);
        break;
    }
    $response->meta->success = "true";
    $response->meta->msg = "";
}catch (Exception $e) {
  $response->data = array();
  $response->meta->success = false;
  $response->meta->msg = "error";
}

$dataout = json_encode($response);

if (isset($param["callback"])) {
    print $param["callback"].'('.$dataout.')';
} else {
    print $dataout;
}
?>
