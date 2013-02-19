function openQWriteWindow(){
	this.articleviewframe.hide();
	this.pagejumpframe.hide();
	this.writeframe.show();
}
function closeQWriteWindow(){
	this.articleviewframe.show();
	this.pagejumpframe.show();
	this.writeframe.hide();
}


function changeLimiter(obj){
	//alert("�ۼ� ����");
	this.limiter = parseInt($(obj).val());
	$('.qaset').remove();
	selectQuestion();
}
function searchFunc(){
	articleviewframe.empty();
	this.searchkey = $('#searchkey').val();
	
	selectQuestion();
}

function updateStatus(){
	var getno = $('.qaset').first().find('.no').html();
	var searchhit = -1;
	var remainnext = -1;
	var remainprev = -1;
	var searchkey = this.searchkey;
	var selection = $('#searchselection').val();
	
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	
	dbhandle.transaction(function (tx) {
		//var context = 'SELECT COUNT(no) FROM que';
		var searchquery = '';
		if(searchkey.length != 0) searchquery = ' AND ' + selection + ' LIKE "%' + searchkey +'%"';
		
		var context = 'SELECT a.searchhit , b.prev , c.next , d.allque, e.allans FROM'
			+ ' (SELECT COUNT(*) AS searchhit FROM que WHERE no >= 0' + searchquery + ') a ,'
     	  	+ ' (SELECT COUNT(*) AS prev FROM que WHERE no > ' + getno + searchquery + ') b ,'
     	  	+ ' (SELECT COUNT(*) AS next FROM que WHERE no < ' + getno + searchquery + ') c ,'
			+ ' (SELECT COUNT(*) AS allque FROM que) d ,'
	 	  	+ ' (SELECT COUNT(*) AS allans FROM ans) e';

		//alert(context);
		
		tx.executeSql(context, [],function(tx,result){
			 var searchhit = result.rows.item(0)['searchhit'];	
			 var remainprev = result.rows.item(0)['prev'];
			 var remainnext = result.rows.item(0)['next'];
			 
			 var allquecount = result.rows.item(0)['allque'];
			 var allanscount = result.rows.item(0)['allans'];
			//alert("MAX =" + max + "/ REMAINNEXT = " + remainnext + "/ REMAINPREV = " + remainprev);
			//	alert("allque =" + allquecount + "/ allans = " + allanscount + "/ searchhit = " + searchhit);
			 
			var allpage = Math.ceil(searchhit / this.limiter);
			var curpage = Math.ceil((searchhit - remainnext) / this.limiter);
			if(remainprev % this.limiter != 0) curpage++;
			
			this.curpage = curpage;
			
			//statusframe update
			statusframe.empty();
			var trow;
			var tdata;
			
			trow = $('<tr></tr>');
			tdata = $('<td class="head" colspan=2>- Page Status -</td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			tdata = $('<td class="padd" colspan=2></td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			
			tdata = $('<td>All</td>');
			tdata.appendTo(trow);
			
			tdata = $('<td></td>');
			tdata.html('�� <a class="emp_red">' + allpage + '</a> �������� �����մϴ�.');
			tdata.appendTo(trow);
	
			trow.appendTo(statusframe);
			
			
			
			trow = $('<tr></tr>');
			tdata = $('<td>Current</td>');
			tdata.appendTo(trow);
			
			tdata = $('<td></td>');
			tdata.html('���� <a class="emp_red">' + curpage + '</a> ������ �Դϴ�.');
			tdata.appendTo(trow);
		
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			tdata = $('<td class="padd" colspan=2></td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			//////////
			trow = $('<tr></tr>');
			tdata = $('<td class="head" colspan=2>- Article Status -</td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			tdata = $('<td class="padd" colspan=2></td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			
			tdata = $('<td>All</td>');
			//tdata.css('width','100px');
			tdata.appendTo(trow);
			
			tdata = $('<td></td>');
			tdata.html('�� <a class="emp_red">' + (allquecount+allanscount) + '</a> ���� �Խù��� �����մϴ�.');
			tdata.appendTo(trow);
		
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			
			tdata = $('<td>Question</td>');
			//tdata.css('width','100px');
			tdata.appendTo(trow);
			
			tdata = $('<td></td>');
			tdata.html('�� <a class="emp_red">' + allquecount + '</a> ���� ������ �����մϴ�.');
			tdata.appendTo(trow);
		
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			
			tdata = $('<td>Answer</td>');
			//tdata.css('width','100px');
			tdata.appendTo(trow);
			
			tdata = $('<td></td>');
			tdata.html('�� <a class="emp_red">' + allanscount + '</a> ���� �亯�� �����մϴ�.');
			tdata.appendTo(trow);
		
			trow.appendTo(statusframe);
			
			trow = $('<tr></tr>');
			tdata = $('<td class="padd" colspan=2></td>');
			tdata.appendTo(trow);
			trow.appendTo(statusframe);
			
			if(searchkey.length != 0){
				trow = $('<tr></tr>');
				tdata = $('<td class="head" colspan=2>- Search Status -</td>');
				tdata.appendTo(trow);
				trow.appendTo(statusframe);
				
				trow = $('<tr></tr>');
				tdata = $('<td class="padd" colspan=2></td>');
				tdata.appendTo(trow);
				trow.appendTo(statusframe);
				
				
				trow = $('<tr></tr>');
				
				tdata = $('<td>Search Keyword</td>');
				tdata.appendTo(trow);
				
				tdata = $('<td></td>');
				tdata.html('�˻���<a class="emp_red">"' + searchkey + '"</a> (��)�� �˻��� ����Դϴ�.');
				tdata.appendTo(trow);
			
				trow.appendTo(statusframe);
				
				trow = $('<tr></tr>');
				
				tdata = $('<td>Founded</td>');
				//tdata.css('width','100px');
				tdata.appendTo(trow);
				
				tdata = $('<td></td>');
				tdata.html('�� <a class="emp_red">' + searchhit + '</a> ���� ������ �˻��Ǿ����ϴ�.');
				tdata.appendTo(trow);
			
				trow.appendTo(statusframe);
				
				trow = $('<tr></tr>');
				tdata = $('<td class="padd" colspan=2></td>');
				tdata.appendTo(trow);
				trow.appendTo(statusframe);
				
			}

			// pagejumpframe update
			$('#pagejumpframe').find('.curpage').html('���� <a class="curvalue">' + curpage + '</a>������ / �� <a class="allvalue">' + allpage + '</a>������');
			
			var pagejumpstart = curpage - 3;
			if(pagejumpstart < 1) pagejumpstart = 1;
			pagejumpend = pagejumpstart + 7;
			if(pagejumpend > allpage){
				pagejumpend = allpage;
				pagejumpstart = allpage - 7;
				if(pagejumpstart < 1) pagejumpstart = 1;
			}
			
			$('#pagejumpframe').find('.pagejumpview').empty();
			
			for(i = pagejumpstart; i <= pagejumpend; i++){
				var tagset = $('<a></a>');
				tagset.html(' ' + i + ' ');
				if(i == curpage){
					tagset.attr('class','emp_red');
				}
				tagset.click(function(){
					var jumppage = parseInt($(this).html());
					var curpage = $('#pagejumpframe').find('.curpage').find('.curvalue').html();
					
					selectQuestion(jumppage);
				});
				
				tagset.appendTo($('#pagejumpframe').find('.pagejumpview'));
				if(i >= allpage) break;
			}
			
		}); //end callback
	});
}

function removeArticle(pointer){
	var inputpw = prompt("��ȣ�� �Է��ϼ���");
	var parent = pointer.parent().parent();
	
	var getno = parent.find('.no').html();
	var tname;
	(parent.find('.articletype').html() == 'Q') ? 
			tname = 'que' : tname = 'ans'; 

	context = 'SELECT pw FROM '+ tname +' where no=' + getno;
	
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	//var qasethandle = $('.qaset');
	
	dbhandle.transaction(function (tx) {
		tx.executeSql(context, [],function(tx,result){
				var rows = result.rows;
				
				if(inputpw != rows.item(0)['pw']){
					alert("��ȣ Ʋ��" + rows.item(0)['pw']);	
				}else{
					deleteArticle(getno, tname);
				}
			} //end callback
		);
	});
	//alert('�Խñ� ��ȣ : ' + getno);
}

function modifyArticle(pointer){
	var inputpw = prompt("��ȣ�� �Է��ϼ���");
	var parent = pointer.parent().parent();
	
	var getno = parent.find('.no').html();
	var tname;
	(parent.find('.articletype').html() == 'Q') ? 
			tname = 'que' : tname = 'ans'; 

	context = 'SELECT pw FROM ' + tname + ' where no=' + getno;
	//alert(context);
	
	var dbhandle = openDatabase('qaboard', '1', 'qaboard database', 2 * 1024 * 1024);
	
	dbhandle.transaction(function (tx) {
		tx.executeSql(context, [],function(tx,result){
				var rows = result.rows;
				
				if(inputpw != rows.item(0)['pw']){
					alert("��ȣ Ʋ��" + rows.item(0)['pw']);	
				}else{
					parent.find('.modifybtn').hide();
					parent.find('.deletebtn').hide();
					
					var title = parent.find('.title');
					var title_text = parent.find('.title').html();
					var body = parent.find('.body');
					var body_text = parent.find('.body').html();
					
					title.empty();
					$('<p align="left"><input size="75" type="text" class="title_input"></p>').appendTo(title);
					$('.title').find('.title_input').val(title_text);
					
					body.empty();
					$('<p align="left">����</p>').appendTo(body);
					$('<p align="left"><textarea rows="10" cols="75" class="body_input"></textarea></p>').appendTo(body);
					$('.body').find('.body_input').val(body_text);
					
					var underbar = $('<p align="center"><a class="modify">�Ϸ�</a>&emsp;&emsp;&emsp;<a class="close">���</a></p>');
					
					
					
					underbar.find('.modify').click(function(){
						var vmap = {};
						vmap['title'] = $('.title_input').val();
						vmap['body'] = $('.body_input').val();
						
						updateArticle(vmap, getno, tname);
					});
					underbar.find('.close').click(function(){
						title.empty();
						title.html(title_text);
						body.empty();
						body.html(body_text);
						
						parent.find('.modifybtn').show();
						parent.find('.deletebtn').show();
					});
					underbar.appendTo(body);
				}
			} //end callback
		);
	});
	//alert('�Խñ� ��ȣ : ' + getno);
}
