<?php

// Sample of server side receiver.

if($_SERVER['SERVER_NAME']=='localhost'){
	
	// Copy the temporary file.
	move_uploaded_file($_FILES["upload_file"]["tmp_name"], 'xxx/'.$_FILES["upload_file"]["name"]);
}


?>