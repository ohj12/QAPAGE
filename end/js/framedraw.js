function drawAnswerWriteWindow(refer){	
	$('.answerwritewindow').remove();
	var frame = $('<table class="answerwritewindow"></table>');
	
	var trow;
	var tdata;
	
	trow = $('<tr></tr>');
	tdata = $('<td class="bar" colspan="2">Write Answer</td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">제목 </td><td class="input"><input class="title" type="text" size="70"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">이름 </td><td><input class="user" type="text"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td  class="item">암호 </td><td><input class="pw" type="text"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">내용 </td><td><textarea class="body" rows="10" cols="70">샘플입력</textarea><p></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="bar"></td>');
	var writeobj = $('<a>쓰기</a>');
	writeobj.click(function(){
		alert('쓰기');
		
		var vmap = {};
		vmap['refer'] = refer;
		vmap['title'] = frame.find('.title').val();
		vmap['user'] = frame.find('.user').val();
		vmap['pw'] = frame.find('.pw').val();
		vmap['body'] = frame.find('.body').val();
	
		insertAnswer(vmap);
	});
	writeobj.appendTo(tdata);
	
	$('<a>&emsp;&emsp;&emsp;&emsp;&emsp;</a>').appendTo(tdata);
	
	var closeobj = $('<a>닫기</a>');
	closeobj.click(function(){
		frame.remove();
	});
	closeobj.appendTo(tdata);
	
	tdata.attr('colspan','2');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	return frame;
}

function drawWriteFrame(){
	var frame = $('<table class="writewindow"></table>');
	
	var trow;
	var tdata;
	
	trow = $('<tr></tr>');
	tdata = $('<td class="bar" colspan="2">Write Answer</td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">제목 </td><td class="input"><input class="title" type="text" value="제목" size="70"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">이름 </td><td><input class="user" type="text" value="이름"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td  class="item">암호 </td><td><input class="pw" type="text" value="pw"></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="item">내용 </td><td><textarea class="body" rows="10" cols="70">샘플입력</textarea><p></td>');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	trow = $('<tr></tr>');
	tdata = $('<td class="bar"></td>');
	var writeobj = $('<a>쓰기</a>');
	writeobj.click(function(){
		//alert('쓰기');
		
		var vmap = {};
		vmap['title'] = frame.find('.title').val();
		vmap['user'] = frame.find('.user').val();
		vmap['pw'] = frame.find('.pw').val();
		vmap['body'] = frame.find('.body').val();

		insertQuestion(vmap);
		$('.qaset').remove();
		selectQuestion();
		closeQWriteWindow();
	});
	writeobj.appendTo(tdata);
	
	$('<a>&emsp;&emsp;&emsp;&emsp;&emsp;</a>').appendTo(tdata);
	
	var closeobj = $('<a>닫기</a>');
	closeobj.click(function(){
		closeQWriteWindow();
	});
	closeobj.appendTo(tdata);
	
	tdata.attr('colspan','2');
	tdata.appendTo(trow);
	trow.appendTo(frame);
	
	return frame;
}

function drawSearchFrame(){
	var tdata;
	
	frame = $('<table id="searchframe"></table>');
	
	tdata = $('<tr class="gap"><td></td></tr>')
	tdata.appendTo(frame);
	
	tdata = $('<tr><td></td></tr>').children('td');
	makeActionBtn('새로운 질문을 작성합니다.','openQWriteWindow();').appendTo(tdata);
	tdata.end().appendTo(frame);
	
	tdata = $('<tr class="gap"><td></td></tr>');
	tdata.appendTo(frame);
	
	tdata = $('<tr><td></td></tr>').children('td');
	tdata.html('글 표시 수');
	tdata.end().appendTo(frame);
	
	tdata = $('<tr><td></td></tr>').children('td');
	var selectbox = '<select class="limiter" onChange="javascript:changeLimiter(this)">'
		+ '<option value="1">1 개</option>'
		+ '<option value="3" selected="selected">3 개</option>'
		+ '<option value="5">5 개</option>'
		+ '<option value="10">10 개</option>'
		+ '<option value="15">15 개</option>'
		+ '<option value="20">20 개</option>'
		+ '</select>';
	$(selectbox).appendTo(tdata);
	tdata.end().appendTo(frame);
	
	tdata = $('<tr class="gap"><td></td></tr>')
	tdata.appendTo(frame);
	
	tdata = $('<tr><td></td></tr>').children('td');
	tdata.html('검색');
	tdata.end().appendTo(frame);
	
	tdata = $('<tr><td></td></tr>').children('td');
	
	var selectbox = '<select id="searchselection">'
		+ '<option value="title" selected="selected">제목</option>'
		+ '<option value="user">작성자</option>'
		+ '<option value="body">내용</option>'
		+ '</select>';
	$(selectbox).appendTo(tdata);
	$('<input type="text" id="searchkey">').appendTo(tdata);
	$('<input type="button" value="검색" onClick="searchFunc();">').appendTo(tdata);
	tdata.end().appendTo(frame);
	
	tdata = $('<tr class="gap"><td></td></tr>');
	tdata.appendTo(frame);
	
	return frame;	
}

function drawPageJumpFrame(){
	var frame = $('<table width=100%><tr><td><br><br></td></tr><tr id="pagejumpframe"></tr></table>')
					.find('#pagejumpframe');
	var tdata;
	
	tdata = $('<td class="left"></td>');
	tdata.appendTo(frame);
	
	tdata = $('<td class="firstpageview">처음</td>');
	tdata.click(function(){
		selectQuestion(1);
	});
	tdata.appendTo(frame);
	
	tdata = $('<td class="pagejumpview" align="center"></td>');
	tdata.appendTo(frame);
	
	tdata = $('<td class="lastpageview">마지막</td>');
	tdata.click(function(){
		var jumppage = $('#pagejumpframe').find('.curpage').find('.allvalue').html();
		selectQuestion(jumppage);
	});
	tdata.appendTo(frame);
	
	tdata = $('<td class="right"></td>');
	tdata.appendTo(frame);
	
	return frame.end();
}

function drawTableQ(){
	var tdata;
	var pointer;
	
	var table = drawTable();
	table.attr('class','quewindow');
	
	pointer = table.find('.articletype');
	pointer.text('Q');
	pointer.css('background-color','#A89489');
	pointer.css('color','#000000')
	pointer.css('text-align','center');
	pointer.css('padding-left','0px');
	
	pointer = table.find('.title');
	pointer.css('font-size','25px');
	
	trow = $('<tr></tr>');
	trow.attr('class','under');
	
	tdata = $('<td></td>');
	tdata.css('text-align','center');
	tdata.css('padding-left','0px');
	tdata.attr('colspan','5');
	
	var temp = $('<a class="cn" style="display:none"></a>');
	temp.appendTo(tdata);
	
	var temp = $('<a class="replyco"></a>');
	temp.html("총 " + "#" + "개의 답변이 있습니다. ");
	temp.appendTo(tdata);
	
	var temp = $('<a></a>');
	temp.attr('class','answeropen');
	temp.text(" (펼쳐보기) ");
	temp.click(function(){
		var getno = table.find('.no').html();
		//alert('게시글 번호 : ' + getno);
		
		selectAnswer(table.parent(),getno);
		$(this).hide();
		table.find('.answerclose').show();
	});
	temp.appendTo(tdata);
	
	var temp = $('<a></a>');
	temp.attr('class','answerclose');
	temp.text(" (답변닫기) ");
	temp.click(function(){
		var getno = table.find('.no').html();
		
		table.parent().find('.answindow').remove();
		$(this).hide();
		table.find('.answeropen').show();
	});
	temp.hide();
	temp.appendTo(tdata);
	
	temp = $('<a></a>')
	temp.attr('class','answerwrite');
	temp.text(" (새 답변 작성) ");
	temp.click(function(){
		var getno = $(this).parent().parent().parent().find('.no').html();
		
		$(this).after(drawAnswerWriteWindow(getno));
	});
	temp.appendTo(tdata);
	
	tdata.appendTo(trow);
	trow.appendTo(table);

	return table;
}

function drawTableA(){
	////alert("A");
	var tdata;
	var table = drawTable();
	table.attr('class','answindow');
	
	//aaaaa
	var firstline = table.find('.first');
	//tdata.appendTo(firstline);
	
	tdata = $('<th></th>');
	tdata.attr('class','padding')
	tdata.css('padding-left','5px');
	tdata.css('background-color','#FFF');
	tdata.css('width','5px');
	tdata.attr('rowspan','6');
	tdata.appendTo(firstline);
	
	
	var pointer = table.find('.articletype');
	pointer.text('A');
	pointer.css('background-color','#DCD5CF');
	pointer.css('color','#000000')
	pointer.css('text-align','center');
	pointer.css('padding-left','0px');
	pointer.before(tdata);
	
	pointer = table.find('.title');
	pointer.css('font-size','18px');
	
	return table;
}

function drawTable(){
	
	var pointer;
	
	var table = $('<table></table>');
	
	var trow;
	var tdata;
	
	//first line
	trow = $('<tr></tr>');
	
	tdata = $('<th></th>');
	tdata.attr('class','articletype');
	tdata.attr('width','30px');
	tdata.attr('rowspan','6');
	//tdata.text('Q or A');
	tdata.appendTo(trow);
	
	tdata = $('<th></th>');
	tdata.attr('class','topblank')
	tdata.attr('colspan','2');
	//tdata.text('null title');
	tdata.appendTo(trow);

	tdata = $('<th></th>');
	tdata.attr('class','modifybtn');
	tdata.attr('width','35px');
	tdata.css('padding-left','0px');
	tdata.html('수정');
	tdata.click(function(){ //수정 버튼 핸들러
		modifyArticle($(this));
	});
	
	tdata.appendTo(trow);
	
	tdata = $('<th></th>');
	tdata.attr('width','35px');
	tdata.css('padding-left','0px');
	tdata.attr('class','deletebtn');
	tdata.html('삭제');
	tdata.click(function(){ //삭제버튼 핸들러
		removeArticle($(this));
	});
	
	tdata.appendTo(trow);
	
	trow.appendTo(table);
	
	//second line
	trow = $('<tr></tr>');
	
	tdata = $('<th></th>');
	tdata.attr('class','title')
	tdata.attr('colspan','4');
	tdata.text('null title');
	tdata.appendTo(trow);
	
	trow.appendTo(table);
	
	//3 line
	trow = $('<tr></tr>');
	tdata = $('<th></th>');
	tdata.text('No'); 	
	tdata.css('width','50px');
	tdata.appendTo(trow);
	
	tdata = $('<th></th>');
	tdata.attr('class','no')
	tdata.attr('colspan','3');
	tdata.text('0'); //numberic 	
	tdata.appendTo(trow);
	
	trow.appendTo(table);
	
	//4 line
	trow = $('<tr></tr>');
	
	tdata = $('<th></th>');
	tdata.text('Writer'); 	
	tdata.css('width','50px');
	tdata.appendTo(trow);
	
	tdata = $('<th></th>');
	tdata.attr('class','user')
	tdata.attr('colspan','3');
	tdata.text('ohj12'); //user 	
	tdata.appendTo(trow);
	
	trow.appendTo(table);
	
	//5 line
	trow = $('<tr></tr>');
	
	tdata = $('<th></th>');
	tdata.text('Date'); 	
	tdata.css('width','50px');
	tdata.appendTo(trow);
	
	tdata = $('<th></th>');
	tdata.attr('class','date')
	tdata.attr('colspan','3');
	tdata.text('1234-56-78'); //date milis convert 	
	tdata.appendTo(trow);
	
	trow.appendTo(table);
	
	//6 body line	
	trow = $('<tr></tr>');
	trow.attr('class','alt')
	
	tdata = $('<td></td>');
	tdata.attr('class','body')
	tdata.attr('colspan','4');
	tdata.css('padding-top','20px');
	tdata.css('padding-left','20px');
	tdata.css('padding-bottom','10px');
	tdata.text('test texta'); 	
	tdata.appendTo(trow);

	trow.appendTo(table);
	
	trow = $('<tr></tr>');
	trow.attr('class','alt');
	
	tdata = $('<td></td>');
	tdata.attr('colspan','5');
	tdata.css('height','1px');
	tdata.css('background-color','#CCC');
	tdata.appendTo(trow);

	trow.appendTo(table);
	
	return table;
}
