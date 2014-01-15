<?php
class Employee
{
    public $id;
    public $firstName;
    public $lastName;
    public $middle;
    public $title;
    public $street;
    public $city;
    public $state;
    public $zip;

    public static function create ($param) {
        $SQL = "INSERT INTO employees(firstName, lastName, street, city,state, zip) " ;
        $SQL = $SQL ." values('".$param->firstName."', '".$param->lastName."', '".$param->street."','".$param->city."','".$param->state."','".$param->zip."') ";
        mysql_query($SQL) or die("failed to insert: $SQL: ". mysql_error());

        $param->id = mysql_insert_id();
        return $param;
    }

    public static function selectRows ($param) {
        $SQL = " e.id, e.firstName, e.lastName, e.middle, e.title, e.street, e.city, e.state,  e.zip, e.departmentId  from employees e ";

        if (isset($param["id"])) {
            $SQL = $SQL . " and e.id=".$param["id"] ;
        }
        //TODO: support more than one sorter
        if (isset($param["sort"])) {
            $sort = json_decode($param["sort"]);
            if ((!isset($sort[0]->direction)) || $sort[0]->direction =="") $sort[0]->direction="ASC";
            $SQL = $SQL . " group by ".$sort[0]->property." ".$sort[0]->direction;
        }
        return $SQL;
    }

    public static function totalcount ($params) {

        $SQL = "select count(*) from  (select ". Employee::selectRows($params). ") as d";
        $res = mysql_query($SQL) or die( "employee count failed:".mysql_error());
        $row = mysql_fetch_array($res);
        return $row[0];
    }

    public static function read ($param) {
        $SQL = "select ". Employee::selectRows($param);


        if (isset($param["start"]) && isset($param["limit"])) {
            $SQL = $SQL . " limit ".$param["limit"]." offset ".$param["start"]." ";
        }

        $res = mysql_query($SQL) or die("Employee read failed:". mysql_error());
        $employees = array();
        while ($row = mysql_fetch_array($res)) {
            $employee = new Employee();
            $employee->id = $row['id'];
            $employee->firstName = $row['firstName'];
            $employee->lastName = $row['lastName'];
            $employee->middle = $row['middle'];
            $employee->title = $row['title'];
            $employee->street = $row['street'];
            $employee->city = $row['city'];
            $employee->state = $row['state'];
            $employee->zip = $row['zip'];

            array_push($employees, $employee);
        }
        return $employees;
    }

    public static function update ($data) {
        //$SQL = "update employees set firstName='".$data->firstName."' , lastName='".$data->lastName."', middle='".$data->middle."', title='".$data->title."', street='".$data->street."', city='".$data->city."', state='".$data->state."', zip='".$data->zip."', departmentId='".$data->departmentId."', dateHired='".$data->dateHired."', dateFired='".$data->dateFired."', dob='".$data->dob."', rate='".$data->rate."', officePhone='".$data->officePhone."', homePhone='".$data->homePhone."', mobilePhone='".$data->mobilePhone."', email='".$data->email."' 
        $SQL = "update employees set firstName='".$data->firstName."' , lastName='".$data->lastName."', street='".$data->street."', city='".$data->city."', state='".$data->state."', zip='".$data->zip."' where id='".$data->id."'";
        
        mysql_query($SQL) or die("failed to update data:".mysql_error());
    }

    public static function destroy ($data) {
        if (isset($data->id)) {
            $id = str_replace("Employee-", "", $data->id);
            $SQL = "delete from employees where id=".$id;
            mysql_query($SQL) or die("failed to delete: $SQL ".mysql_error());
        }
    }
};
?>
