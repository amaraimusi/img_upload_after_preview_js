<?php

// Sample of server side receiver.

if($_SERVER['SERVER_NAME']=='localhost'){
	
	// Copy the temporary file.
	move_uploaded_file($_FILES["upload_file"]["tmp_name"], 'xxx/'.$_FILES["upload_file"]["name"]);
}

$res['file_name'] = $_FILES["upload_file"]["name"];

// Test Of Accessories data.
$acc_json = $_POST['acc_data'];
$acc_data = json_decode($acc_json,true);
$res['animal'] =  $acc_data['animal'];

$json_str=json_encode($res);
echo $json_str;


?>