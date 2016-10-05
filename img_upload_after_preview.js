/**
 * Img upload  after  the thumbnail display
 * サムネイルを表示してから画像アップロード
 * @date 2016-9-20
 */



/**
 * Img upload  after  the thumbnail display.
 * 
 * @version 1.1.2
 * @date 2016-9-30 | 2016-10-5
 * 
 * @param option
 * - upload_button_name.
 * - upload_button_css.
 * - upload_button_display. 0:hide  1:show
 * - thumbnail_width.
 * - thumbnail_hight.
 * - upload_form_name.   Things like the name attribute of the form element.
 * - loading_message.
 * - success_message.
 */
var ImgUploadAfterPreview =function(option){
	
	
	this.option = option;
	
	this.fileEvtList = {}; // file event list.
	this.activeParam = {}; // Activated parameter for callback.
	this.server_url = 'sample.php'; // Server url for file upload.
	
	var myself=this; // Instance of myself.

	/**
	 * initialized.
	 */
	this.constract=function(){
		
		// If Option property is empty, set a value.
		this.option = setOptionIfEmpty(this.option);
		
	};
	
	// If Option property is empty, set a value.
	function setOptionIfEmpty(option){
		
		if(option == undefined){
			option = {};
		}
		
		if(option['thumbnail_width'] == undefined){
			option['thumbnail_width'] = 80;
		}
		
		if(option['thumbnail_hight'] == undefined){
			option['thumbnail_hight'] = 80;
		}
		
		if(option['upload_button_name'] == undefined){
			option['upload_button_name'] = 'Upload';
		}
		
		if(option['upload_button_css'] == undefined){
			option['upload_button_css'] = 'btn btn-primary btn-xs';
		}
		
		if(option['upload_button_display'] == undefined){
			option['upload_button_display'] = 1;
		}
		
		if(option['upload_form_name'] == undefined){
			option['upload_form_name'] = 'upload_file';
		}
		
		if(option['loading_message'] == undefined){
			option['loading_message'] = 'Now loading ...';
		}
		
		if(option['success_message'] == undefined){
			option['success_message'] = 'Success.';
		}
		
		return option;
	};
	
	
	/**
	 * To set this function to a file element.
	 * @param fileElmId.   File element.
	 * @param server_url.  Server url for file upload.
	 * @param acc_data(Optional).   Accessories data.
	 * @param beforeUploadCallback.   This Callback function to execute before uploading.
	 * @param afterUploadCallback.   This Callback function to execute after uploading.
	 */
	this.setFileElm = function(fileElmId,server_url,acc_data,beforeUploadCallback,afterUploadCallback){

		var res = classifySlt(fileElmId);
		var xid = res.xid; // Id of element.
		var slt = res.slt; // jQuery selector.
		var fileElm = $(slt); // File element.
		myself.server_url = server_url;
		
		fileElm.change(function(e) {
		
			// Add a message element.
			var msg_xid = xid + '_msg';
			var msg_elm = $('#' + msg_xid);
			if(!msg_elm[0]){
				var msg_html = "<div id='" + msg_xid + "' class='msg_iuapj text-success' ></div>";
				fileElm.after(msg_html);
				msg_elm = $('#' + msg_xid);
			}
			msg_elm.hide();
			myself.activeParam['msg_xid'] = msg_xid;
			
			
			
			// Add a Image element for preview.
			var img_xid = xid + '_preview_img';
			var imgElm = $('#' + img_xid);
			if(!imgElm[0]){
				var preview_img_html = "<div class='upload_img_iuapj'><img id='" + img_xid +"'/></div>";
				fileElm.after(preview_img_html);
			}else{
				imgElm.show();
			}

			myself.activeParam['file_evt'] = e;// Keep for file transmission event
				
			// Get a file object from event.
			var files = e.target.files;
			var oFile = files[0];
			
			if(oFile==null){
				return;
			}
	
			// Converting from a file object to a data url scheme.Conversion process by the asynchronous.
			var reader = new FileReader();
			reader.readAsDataURL(oFile);
			
			// Set the value for the callback.
			myself.activeParam['xid'] = xid;
			myself.activeParam['img_xid'] = img_xid;
		
			// After conversion of the event.
			reader.onload = function(evt) {
				
				// A thumbnail image preview.
				var img_xid = myself.activeParam['img_xid'];
				var imgElm = $('#' + img_xid);
				imgElm.attr({
					'src':reader.result,
					'width':myself.option.thumbnail_width,
					'height':myself.option.thumbnail_hight,
					
				});
				
				
				
				
				// Add a upload button element.
				var xid = myself.activeParam.xid;
				var u_btn_xid = xid + '_upload_button';
				var u_btn_style = '';
				var u_btn_elm = $('#' + u_btn_xid);
				if(!u_btn_elm[0]){
					var u_btn_html = "<div class='upload_btn_iuapj'><button type='button' id='" + u_btn_xid +"' " +
						"class='"+ myself.option.upload_button_css + "' >"+ 
						myself.option.upload_button_name + "</button></div>";
					
					imgElm.after(u_btn_html);
					u_btn_elm = $('#' + u_btn_xid);
				}

				if(myself.option.upload_button_display == 1){
					u_btn_elm.show();
				}else{
					u_btn_elm.hide();
				}
				
				myself.activeParam['u_btn_xid'] = u_btn_xid;
				
				
				
				
				// Add a click event to a upload button.
				u_btn_elm.click(function(){
					clickUploadButton(xid,acc_data,beforeUploadCallback,afterUploadCallback);
				});				
	
			}
			
	
		});
		
		
		
		
	};

	/**
	 * Reset the preview stage.
	 */
	this.reset = function(){
		if(this.activeParam==null || Object.keys(this.activeParam).length === 0){
			console.log('empty');
			return;
		}
		
		
		// Reset a file element.
		var fileElm = $('#' + this.activeParam.xid);
		try {
			fileElm.val("");
		} catch (e) {
			console.log('It can not be reset in IE ');
		}
		
		// Reset a thubnail preview.
		var imgElm = $('#' + this.activeParam.img_xid);
		imgElm.attr('src','');
		imgElm.hide();
	
		// Hide a upload button and a message element.
		$('#' + this.activeParam.u_btn_xid).hide();
		$('#' + this.activeParam.msg_xid).hide();
		
		
	};
	
	
	/**
	 * Upload at any timing after preview.
	 * @param acc_data(Optional).   Accessories data.
	 * @param beforeUploadCallback.   This Callback function to execute before uploading.
	 * @param afterUploadCallback.   This Callback function to execute after uploading.
	 */
	this.upload = function(acc_data,beforeUploadCallback,afterUploadCallback){
		
		if(this.activeParam==null || Object.keys(this.activeParam).length === 0){
			console.log('Please show preview.');
			return;
		}
		
		xid = myself.activeParam.xid;
		
		clickUploadButton(xid,acc_data,beforeUploadCallback,afterUploadCallback);
	}
	
	
	
	
	
	function clickUploadButton(xid,acc_data,beforeUploadCallback,afterUploadCallback){

		var fileEvt = myself.activeParam['file_evt'];
		var files = fileEvt.target.files;
		var oFile = files[0];
		
		// Hide upload button.
		var u_btn_xid = myself.activeParam['u_btn_xid'];
		var u_btn = $('#' + u_btn_xid);
		u_btn.hide();

		
		// Execute a callback function before upload.
		if(beforeUploadCallback != null){
			var res = beforeUploadCallback(xid,acc_data);
			if(res){
				acc_data = res;
			}
		}
		
		// If acc_data is an object ,To convert the acc_data into JSON.
		if(acc_data != null){
			if(typeof acc_data == 'object'){
				acc_data = JSON.stringify(acc_data);
			}
		}
		
		
		// Show the waiting message.
		showMessage(myself.option.loading_message);


		var reader = new FileReader();
		reader.readAsDataURL(oFile);
	
		//ファイル読込成功イベント
		reader.onload = function(evt) {
			
		
		    var fd = new FormData();
		    fd.append( myself.option.upload_form_name, $('#' + xid).prop("files")[0] );
		    
		    if(acc_data != null){
			    fd.append( 'acc_data', acc_data );
		    }
			
			$.ajax({
				type: "POST",
				url: myself.server_url ,
				data: fd,
				cache: false,
				dataType: "text",
				processData : false,
				contentType : false,
				success: function(res, type) {
					
			
					// Execute a callback function after upload.
					if(afterUploadCallback != null){
						afterUploadCallback(res);
					}
					
					// Show the success message.
					showMessage(myself.option.success_message);

				},
				error: function(xmlHttpRequest, textStatus, errorThrown){
					console.log(xmlHttpRequest.responseText);
					
					// Show the failed message.
					var errMsg = "Upload failed.<br>" + xmlHttpRequest.responseText;
					showMessage(errMsg,'text-danger');
					
				}
	
			});
		}
	};
	
	
	/**
	 * Show the message.
	 * @param msg : Message string.
	 * @param class_attr : CSS Class attribute.
	 */
	function showMessage(msg,class_attr){
		
		if(class_attr==undefined){
			class_attr = 'text-success';
		}
		class_attr = 'msg_iuapj ' + class_attr;
		
		var msg_elm = $('#' + myself.activeParam.msg_xid);
		
		msg_elm.html(msg);
		msg_elm.attr('class',class_attr);
		msg_elm.show();

	}
	
	
	
	
	
	
	/**
	 * 対象文字列をID属性とセレクタに分類する
	 * @param slt 対象文字列
	 * @returns res
	 *  - xid ID属性
	 *  - slt セレクタ
	 */
	function classifySlt(slt){
		
		var xid='';
		var slt2 = '';
		
		var s1 = slt.charAt(0);
		if(s1=='#'){
			xid = slt.replace('#','');
			slt2 = slt;
		}else{
			xid = slt;
			slt2 = '#' + slt;
		}
		
		var res = {
				'xid':xid,
				'slt':slt2
		}
		
		return res;
		
		
	};
	
	
	// call constractor method.
	this.constract();
};





//
//var fileEvt;
//$( function() {
//	console.log('test=1');//■■■□□□■■■□□□■■■□□□)
//	//ファイルアップロードイベント
//	$('#file1').change(function(e) {
//		
//		fileEvt = e;
//			
//		//ファイルオブジェクト配列を取得（配列要素数は選択したファイル数を表す）
//		var files = e.target.files;
//		var oFile = files[0];
//
//		var reader = new FileReader();
//		reader.readAsDataURL(oFile); // データURLスキーム取得処理を非同期で開始する
//	
//		// データURLスキームを取得後に実行される処理
//		reader.onload = function(evt) {
//			// img要素にデータURLスキームをセットし、画像表示する。
//			$('#img1').attr({
//				'src':reader.result,
//				'width':80,
//				'height':80,
//				
//			});
//
//		}
//		
//
//	});
//	
//	
//});
//
//
//
//function test1(){
//	
//	var files = fileEvt.target.files;
//	var oFile = files[0];
//
//	var reader = new FileReader();
//	reader.readAsDataURL(oFile);
//
//	//ファイル読込成功イベント
//	reader.onload = function(evt) {
//		
//	    var fd = new FormData();
//	    fd.append( "upload_file", $("#file1").prop("files")[0] );
//		
//		$.ajax({
//			type: "POST",
//			url: "upload.php",
//			data: fd,
//			cache: false,
//			dataType: "text",
//			processData : false,
//			contentType : false,
//			success: function(res, type) {
//				
//				$('#res').html(res);
//	
//			},
//			error: function(xmlHttpRequest, textStatus, errorThrown){
//				console.log(xmlHttpRequest.responseText);
//				
//				alert(textStatus);
//			}
//
//		});
//	}
//}