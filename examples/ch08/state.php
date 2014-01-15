<?php
class State
{
    public $id;
    public $state;

    public static function totalcount () {
        $SQL = "select count(id) from states";
        $res = mysql_query($SQL) or die("state count failed:". mysql_error()) ;
        $row = mysql_fetch_array($res);
        return $row[0];
    }

    public static function read () {
        $states = array();

        $SQL = "select id,state from states";
        $res = mysql_query($SQL) or die("state read failed:". mysql_error()) ;

        while ($row = mysql_fetch_array($res) ) {
            $state = new State();
            $state->id = $row['id'];
            $state->state = $row['state'];
            array_push($states, $state);
        }
        return $states;
    }
};
?>
