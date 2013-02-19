function dbInit(){
	//alert("dbInit진입");
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 1024 * 1024);
	
	var context = new Array();
	context[0] = 'CREATE TABLE IF NOT EXISTS que('	
		 + 'no INTEGER NOT NULL PRIMARY KEY,'
		 + 'user VARCHAR(20) NOT NULL,'
		 + 'title VARCHAR(50) NOT NULL,'
		 + 'body TEXT NOT NULL,'
		 + 'date INTEGER NOT NULL,'
		 + 'pw CHAR(4) NOT NULL,'
		 + 'replyco INTEGER NOT NULL'
		 + ')';
	
	context[1] = 'CREATE TABLE IF NOT EXISTS ans('
		 + 'no INTEGER NOT NULL PRIMARY KEY,'
		 + 'user VARCHAR(20) NOT NULL,'
		 + 'title VARCHAR(50) NOT NULL,'
		 + 'body TEXT NOT NULL,'
		 + 'date INTEGER NOT NULL,'
		 + 'pw CHAR(4) NOT NULL,'
		 + 'refer INTEGER NOT NULL'
		 + ')';
		
	context[2] = 'CREATE TABLE IF NOT EXISTS seq('
		 + 'ref VARCHAR(20) NOT NULL PRIMARY KEY,'
		 + 'count INTEGER NOT NULL'
		 + ')';
	
	context[3] = 'INSERT INTO seq VALUES("qaboard",0)';
	
	context[4] = 'CREATE TRIGGER IF NOT EXISTS numbering_que AFTER INSERT ON que '
		+ 'BEGIN '
		+ 'UPDATE seq SET count=count+1; '
		+ 'UPDATE que SET no = (select count from seq where ref="qaboard") WHERE no=-1; ' 
		+ 'END;';
	
	context[5] = 'CREATE TRIGGER IF NOT EXISTS numbering_ans AFTER INSERT ON ans '
		+ 'BEGIN '
		+ 'UPDATE seq SET count=count+1; '
		+ 'UPDATE ans SET no = (select count from seq where ref="qaboard") WHERE no=-1; ' 
		+ 'END;';
	
	context[6] = 'CREATE TRIGGER IF NOT EXISTS cascade_que BEFORE DELETE ON que '
		+ 'FOR EACH ROW BEGIN '
		+ 'DELETE FROM ans WHERE refer = OLD.no; '
		+ 'END;';
	
	context[7] = 'CREATE TRIGGER IF NOT EXISTS replyco_up AFTER INSERT ON ans '
		+ 'BEGIN '
		+ 'UPDATE que SET replyco = replyco+1 WHERE no = NEW.refer; '
		+ 'END;';
	
	context[8] = 'CREATE TRIGGER IF NOT EXISTS replyco_down BEFORE DELETE ON ans '
		+ 'BEGIN '
		+ 'UPDATE que SET replyco = replyco-1 WHERE no = OLD.refer; '
		+ 'END;';
	
	dbhandle.transaction(function (tx) {
		for(var i = 0; i < context.length; i++){
			//alert(context[i]);
			tx.executeSql(context[i]);
		}
	});
	
}

function deleteArticle(no, tname){
	//alert("질문글 삭제 진입");
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	var context = 'DELETE FROM '+ tname +' WHERE no = ' + no;
	
	dbhandle.transaction(function (tx) {
		tx.executeSql(context,[],function(tx, result){
			var qasetcount = $('.qaset').length;
			if(qasetcount <= 1) selectQuestion(curpage-1);
			else selectQuestion();
		});
	});
}

function updateArticle(vmap, targetno, tname){
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);

	var context = 'UPDATE '+ tname +' SET '
		+ 'title="' + vmap['title'] + '", ' 
		+ 'body="' + vmap['body'] + '" '
		+ 'WHERE no=' + targetno;
	
	dbhandle.transaction(function (tx) {
		tx.executeSql(context,[],function(tx,result){
			selectQuestion();
		});
	});

}



function insertQuestion(vmap){
	//alert("insertQuestion진입");
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	
	vmap['date'] = new Date().getTime();
	vmap['replyco'] = '0';

	
	dbhandle.transaction(function (tx) {
		var context = 'INSERT INTO que VALUES('
			+ '-1, "' 
			+ vmap['user'] + '","' 
			+ vmap['title'] + '", "' 
			+ vmap['body'] + '", '
			+ vmap['date'] +', "' 
			+ vmap['pw'] + '", '
			+ vmap['replyco'] +')';
		
		tx.executeSql(context,[],function(){
			selectQuestion();
		});
	});

}
function insertAnswer(vmap){
	//alert("insertAnswer진입");
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	
	vmap['date'] = new Date().getTime();
	
	dbhandle.transaction(function (tx) {
		var context = 'INSERT INTO ans VALUES('
			+ '-1, "' 
			+ vmap['user'] + '","' 
			+ vmap['title'] + '", "' 
			+ vmap['body'] + '", '
			+ vmap['date'] +', "' 
			+ vmap['pw'] + '", '
			+ vmap['refer'] +')';
		
		tx.executeSql(context,[],function(){
			selectQuestion();
		});
	});

}


function selectQuestion(jumppage){
	if(isNaN(jumppage)) jumppage = this.curpage;
	
	var searchkey = this.searchkey;
	var selection = $('#searchselection').val();
	var limiter = this.limiter;
	//alert("selectQuestion진입 = " + jumppage);
	
	var context;
	var qaset = $('.qaset');
	
	context = 'SELECT * FROM que';
	if(searchkey.length != 0) context += ' WHERE ' + selection + ' LIKE "%' + searchkey +'%"';
	context += ' ORDER BY no DESC LIMIT ' + limiter;
	context += ' OFFSET ' + (limiter * (jumppage-1));
	//alert(context);
	
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);

	dbhandle.transaction(function (tx) {
		tx.executeSql(context, [],function(tx,result){
				var rows = result.rows;
				var pointer;
				
				if(rows.length == 0) return;
				
				articleviewframe.empty();
				
				for(var i = 0; i < rows.length; i++){
					var rowitem = rows.item(i);
					
					var set = $('<tr><td></td></tr>').appendTo(articleviewframe);
					set.attr('class','qaset');
					
					var quewindow = drawTableQ().appendTo(set);
					
					quewindow.find('.title').text(rowitem['title']);
					quewindow.find('.no').text(rowitem['no']);
					quewindow.find('.user').text(rowitem['user']);
					
					var date = new Date(parseInt(rowitem['date']));
					quewindow.find('.date').text(date.toLocaleString());	
					quewindow.find('.body').html(rowitem['body'].replace(/\n/gi, "<br>"));
					var replycotext = "총 " + rowitem['replyco'] + "개의 답변이 있습니다. ";
					quewindow.find('.replyco').text(replycotext);			
				}
				updateStatus();
			} //end callback
		);
	});
}

function selectAnswer(qaset, refer){
	//alert("selectAnswer진입");
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	
	dbhandle.transaction(function (tx) {
		tx.executeSql('SELECT * FROM ans WHERE refer='+ refer + ' ORDER BY no DESC', [],function(tx,result){
				var rows = result.rows;
				var pointer;
				for(var i = 0; i < rows.length; i++){
					var rowitem = rows.item(i);
					var answindow = drawTableA().appendTo(qaset);

					answindow.find('.title').text(rowitem['title']);
					answindow.find('.no').text(rowitem['no']);
					answindow.find('.user').text(rowitem['user']);
					
					var date = new Date(parseInt(rowitem['date']));
					answindow.find('.date').text(date.toLocaleString());
					answindow.find('.body').html(rowitem['body'].replace(/\n/gi, "<br>"));
				}
			} //end callback
		);
	});
}

 