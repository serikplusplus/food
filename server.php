<?php
$_POST = json_decode(file_get_contents("php://input"),true);//JSON in PHP
echo var_dump($_POST);
