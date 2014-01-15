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
  public $departmentId;
  public $departmentName;
  public $dateHired;
  public $dateFired;
  public $dob;
  public $rate;
  public $officePhone;
  public $homePhone;
  public $mobilePhone;
  public $email;

  public static function create ($param) {
    $SQL = "INSERT INTO employees(firstName, lastName, middle, title, street, city,state, zip,departmentId,dateHired, dateFired,dob,rate, officePhone, homePhone, mobilePhone,email) values('".$param->firstName."', '".$param->lastName."', '".$param->middle."','".$param->title."','".$param->street."','".$param->city."','".$param->state."','".$param->zip."',".$param->departmentId.",'".$param->dateHired."','".$param->dateFired."','".$param->dob."','".$param->rate."','".$param->officePhone."','".$param->homePhone."','".$param->mobilePhone."','".$param->email."') ";
    mysql_query($SQL) or die("failed to insert: $SQL: ". mysql_error());

    $employee = new Employee();
    $employee->id = mysql_insert_id();
    $employee->firstName = $param->firstName;
    $employee->lastName = $param->lastName;
    $employee->departmentId = $param->departmentId;

    return $employee;
  }

  public static function read ($param) {
     $SQL = "select e.id, e.firstName, e.lastName, e.middle, e.title, e.street, e.city, e.state, e.zip, e.departmentId, d.name as departmentName , e.dateHired, e.dateFired, e.dob, e.rate, e.officePhone, e.homePhone, e.mobilePhone, e.email from employees e, departments d where e.departmentId=d.id";

     if (isset($param["id"])) {
        $SQL = $SQL . " and e.id=".$param["id"] ;
     }

     if (isset($param["parent"])) {
        $SQL = $SQL . " and e.departmentId=".$param["parent"];
     }

     $SQL = $SQL ." order by lastname,firstname asc";

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
       $employee->departmentId = $row['departmentId'];
       $employee->departmentName = $row['departmentName'];

       $employee->dateHired = $row['dateHired'];
       $employee->dateFired = $row['dateFired'];
       $employee->dob = date("m/d/Y", strtotime($row['dob']));
       $employee->rate = $row['rate'];
       $employee->officePhone = $row['officePhone'];
       $employee->homePhone = $row['homePhone'];
       $employee->mobilePhone = $row['mobilePhone'];
       $employee->email = $row['email'];

       array_push($employees, $employee);
     }
    return $employees;
  }

  public static function update ($data) {
    $SQL = "update employees set firstName='".$data->firstName."' , lastName='".$data->lastName."', middle='".$data->middle."', title='".$data->title."', street='".$data->street."', city='".$data->city."', state='".$data->state."', zip='".$data->zip."', departmentId='".$data->departmentId."', dateHired='".$data->dateHired."', dateFired='".$data->dateFired."', dob='".$data->dob."', rate='".$data->rate."', officePhone='".$data->officePhone."', homePhone='".$data->homePhone."', mobilePhone='".$data->mobilePhone."', email='".$data->email."' where id='".$data->id."'";
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
