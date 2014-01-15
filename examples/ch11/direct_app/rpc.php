<?php

require 'ExtDirect.php';

ExtDirect::$namespace = 'RPC';
ExtDirect::$descriptor = 'RPC.REMOTING_API';

class Actors
{
    public function create($config)
    {
        return Array("success" => true, "data" => Array("name" => "New Actor", "id" => rand(1, 22000)));
    }

    public function read($config)
    {
        return Array(
            "success" => true,
            "data" => Array(
                Array(
                    "id" => rand(1, 22000),
                    "name" => "John Travolta"
                ),
                Array(
                    "id" => rand(1, 22000),
                    "name" => "Benny Hill"
                ),
                Array(
                    "id" => rand(1, 22000),
                    "name" => "Bruce Willis"
                ),
                Array(
                    "id" => rand(1, 22000),
                    "name" => "Rowan Atkinson"
                )
            )
        );
    }

    public function update($config)
    {
        return Array("success" => true, "data" => $config);
    }

    public function destroy($config)
    {
        return Array("success" => true);
    }
}

class Util
{
    public function date($format)
    {
        return date($format);
    }
}

ExtDirect::provide(Array('Actors', 'Util'));
