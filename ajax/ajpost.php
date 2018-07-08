<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);


// $username = $_POST['user'];
// $password = $_POST['passw'];

	// $username = $_GET['user'];
	// $password = $_GET['passw'];
$username = $_REQUEST['user'];
	$password = $_REQUEST['passw'];
echo "你发过来的名字是: {$username}, 密码是: {$password}";
	// echo '{"name": "dona09"}'
	
