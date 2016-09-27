<?php
if($_SERVER['SERVER_NAME']=='localhost'){
	// 一時ファイルをコピー
	move_uploaded_file($_FILES["upload_file"]["tmp_name"], 'xxx/'.$_FILES["upload_file"]["name"]);
}
echo $_FILES["upload_file"]["name"];
?>