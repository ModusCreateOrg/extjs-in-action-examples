<?php
mysql_connect("localhost", "extjsinaction", "extjsinaction") or die("could not connect:".mysql_error());
mysql_select_db("extjsinaction");

$queryText    = $_REQUEST['query'];
$start        = 0;
$column       = $_REQUEST['sort'];
$department   = $_REQUEST['node'];
$direction    = $_REQUEST['dir'];

if (!$direction)  { $direction = 'asc'; }
if (!$department) { $column = 'column'; }
//$end = $start + limit;

if ($department != 'theirCompany') {
    $whereClause =  "where upper(d.name) like upper('$department') and d.id = e.departmentId ";
    $SQL = "select firstName, lastName, d.name from departments d, employees e $whereClause";
} else {
   $SQL = "select distinct name from departments order by name asc";
}

if ($limit) {
   $SQL .= " limit $start, $limit";
}

$res = mysql_query($SQL) or die("data read failed:".mysql_error());
$records = array();


while($row = mysql_fetch_array($res)) {
    $obj = new stdClass();
    if ($department != 'theirCompany') {
        $obj->text = $row['lastName'].", ".$row['firstName'];
        $obj->leaf = true;
        $department = $row['name'];
        if ($department == 'Accounting' || $department == 'Finances' || $department == 'Payroll') {
            $obj->validDropPoints = Array('Accounting', 'Finances', 'Payroll');
        } else if ($department == 'Customer Service' || $department == 'Media Relations' || $department == 'Public Relations') {
            $obj->validDropPoints = Array('Customer Services', 'Media Relations', 'Public Relations');
        } else if ($department == 'Advertising' || $department == 'Sales and Marketing') {
            $obj->validDropPoints = Array('Advertising', 'Sales and Marketing');
        } else if ($department == 'Tech Support' || $department == 'Quality Assurance' || $department == 'Research and Development') {
            $obj->validDropPoints = Array('Tech Support', 'Quality Assurance', 'Research and Development');
        } else {
            $obj->validDropPoints = Array($department);
        }
        $obj->qtip = $obj->validDropPoints;
    } else {
        $obj->text     = $row['name'];
        $obj->id       = $row['name'];
        $obj->type     = 'department';
    }
    array_push($records, $obj);
}
print json_encode($records);
?>
