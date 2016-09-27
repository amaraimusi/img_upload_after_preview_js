/**
 * Img upload  after  the thumbnail display
 * サムネイルを表示してから画像アップロード
 * @date 2016-9-20
 */

var fileEvt;
$( function() {
	console.log('test=1');//■■■□□□■■■□□□■■■□□□)
	//ファイルアップロードイベント
	$('#file1').change(function(e) {
		
		fileEvt = e;
			
		//ファイルオブジェクト配列を取得（配列要素数は選択したファイル数を表す）
		var files = e.target.files;
		var oFile = files[0];

		var reader = new FileReader();
		reader.readAsDataURL(oFile); // データURLスキーム取得処理を非同期で開始する
	
		// データURLスキームを取得後に実行される処理
		reader.onload = function(evt) {
			// img要素にデータURLスキームをセットし、画像表示する。
			$('#img1').attr({
				'src':reader.result,
				'width':80,
				'height':80,
				
			});

		}
		

	});
	
	
});



function test1(){
	
	var files = fileEvt.target.files;
	var oFile = files[0];

	var reader = new FileReader();
	reader.readAsDataURL(oFile);

	//ファイル読込成功イベント
	reader.onload = function(evt) {
		
	    var fd = new FormData();
	    fd.append( "upload_file", $("#file1").prop("files")[0] );
		
		$.ajax({
			type: "POST",
			url: "upload.php",
			data: fd,
			cache: false,
			dataType: "text",
			processData : false,
			contentType : false,
			success: function(res, type) {
				
				$('#res').html(res);
	
			},
			error: function(xmlHttpRequest, textStatus, errorThrown){
				console.log(xmlHttpRequest.responseText);
				
				alert(textStatus);
			}

		});
	}
}