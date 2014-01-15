<?php
class  Department
{
    public $id;
    public $name;
    public $active;
    public $dateActive;
    public $dateInactive;
    public $description;
    public $director;

    public static function create($json) {
    }

    public static function read ($param) {
        $SQL = "select id, name, active, dateActive, dateInactive, description, director, (select count(*) from employees e where e.departmentId=d.id) as numEmployees from departments d";

        if (isset($param["id"])) {
            $SQL = $SQL ." where id=".$param["id"];
        }

        $res = mysql_query($SQL) or die("department read failed:". mysql_error());
        $departments = array();
        while ($row = mysql_fetch_array($res)) {
            $department = new Department();
            $department->id = $row['id'];
            $department->name = $row['name'];
            $department->dateActive = $row['dateActive'];
            $department->dateInactive = $row['dateInactive'];
            $department->description = $row['description'];
            $department->director = $row['director'];
            $department->numEmployees = $row['numEmployees'];

            array_push($departments, $department);
        }

        if ($param["detail"]) {
          foreach ($departments as $department) {
            $department->employees = Employee::read(
              array("parent" =>$department->id)
            );
          }
        }
        return $departments;
    }
};
?>
