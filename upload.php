<?php

// Sample of server side receiver.

if($_SERVER['SERVER_NAME']=='localhost'){
	
	// Copy the temporary file.
	move_uploaded_file($_FILES["upload_file"]["tmp_name"], 'xxx/'.$_FILES["upload_file"]["name"]);
}

echo $_FILES["upload_file"]["name"];

// Test Of Accessories data.
$acc_json = $_POST['acc_data'];
$acc_data = json_decode($acc_json,true);
echo $acc_data['animal'].'<br>';
?>