<?php
mysql_connect("localhost", "root", "") or die ("could not connect:" . mysql_error());
mysql_select_db("extjsinaction");

//Data access objects
require_once("department.php");
require_once("employee.php");

//Utility classes for communcation with client
class Meta
{
    public $success = false;
    public $msg = "";
}

;

class Response
{
    public $data;
    public $meta;
}

;

//Utility functions for handling XML
function generate_xml_from_array($array, $node_name)
{
    $xml = '';
    if (is_array($array) || is_object($array)) {
        foreach ($array as $key => $value) {
            if (is_numeric($key)) {
                $key = $node_name;
            }
            $xml .= '<' . $key . '>' . "" . generate_xml_from_array($value, $node_name) . '</' . $key . '>' . "";
        }
    } else {
        $xml = htmlspecialchars($array, ENT_QUOTES) . "";
    }
    return $xml;
}

function generate_valid_xml_from_array($array, $node_block = 'response', $node_name = 'node')
{
    $xml = '<?xml version="1.0" encoding="UTF-8" ?>' . "\n";
    $xml .= '<' . $node_block . '>' . "\n";
    $xml .= generate_xml_from_array($array, $node_name);
    $xml .= '</' . $node_block . '>' . "\n";
    return $xml;
}

function xml_encode($obj)
{
    return generate_valid_xml_from_array($obj, get_class($obj));
}

function xml_decode($xmlstr)
{
    return simplexml_load_string($xmlstr);
}

//process incoming parameters
$param = array();
$param["model"] = $_REQUEST['model'];
$param["id"] = $_REQUEST['id'];
$param["detail"] = $_REQUEST['detail'];
$param["parent"] = $_REQUEST['parent'];
$param["callback"] = $_REQUEST['callback'];
$param["format"] = $_REQUEST['format'];

if (!isset($param["model"])) {
    $param["model"] = "Employee";
}
if (!isset($param["detail"])) {
    $param["detail"] = false;
}
if (!isset($param["format"])) {
    $param["format"] = "json";
}

$method = $_REQUEST['method'];
if (!isset($method)) {
    $method = "READ";
}

$datain = json_decode($_REQUEST["JSON"]);
$data = array();
$msg = "";
$model = $param["model"];

//perform CRUD operations
try {
    $response = new Response();
    switch ($method) {
        case 'CREATE':
            $raw = '';
            $httpContent = fopen('php://input', 'r');
            while ($kb = fread($httpContent, 1024)) {
                $raw .= $kb;
            }
            fclose($httpContent);
            $datain = json_decode($raw);
            $response->data = $model::create($datain);
            break;
        case 'READ':
            $response->data = $model::read($param);
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
            $response->data = $model::destroy($datain);
            break;
    }
    $response->meta = new Meta();
    $response->meta->success = "true";
    $response->meta->msg = "";
} catch (Exception $e) {
    $response = new Response();
    $response->data = array();
    $response->meta = new Meta();
    $response->meta->success = false;
    $response->meta->msg = "error";
}

if ($param["format"] == "xml") {
    header('Content-type: application/xml');
    $dataout = xml_encode($response);
} else {
    header('Content-type: application/json');
    $dataout = json_encode($response);
}

if (isset($param["callback"])) {
    print $param["callback"] . '(' . $dataout . '")';
} else {
    print $dataout;
}
?>
