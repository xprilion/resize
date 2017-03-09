function autosize(h,w,n){
	var tr=  $('#fh').text();
	if(tr.length!=0){
		$('#hw').slideUp();
		if(h>0){$('#hn').val(h);}
		if(w>0){$('#wn').val(w);}
		
		for(i=0;i<7;i++){
			if(i==n){
				$('#op'+i).removeClass('norm').addClass('sel');
			}
			else{
				$('#op'+i).removeClass('sel').addClass('norm');
			}
		}
		if(n==0){
			$('#hw').slideDown();
		}
	}
	else{
		$('#fn').click();
	}
}

$(document).ready(function(){
	
	loadSlider();
		
	$('#fn').change(function(){
		var fil= $('#fn').prop('files')[0];   
		$('#ff').empty().append('<img src="loading.gif">');
		var fdata= new FormData();                  
		fdata.append('file', fil);                           
		$.ajax({
			url: 'info.php',
			dataType: 'text',
			cache: false,
			contentType: false,
			processData: false,
			data: fdata,                         
			type: 'post',
			success: function(stat){
				var res = $.parseJSON(stat);
				for(i=0;i<7;i++){
					$('#op'+i).removeClass('inact').addClass('opt').addClass('norm');
				}
				$('#op1').attr('onclick', 'autosize('+res[1]+', '+res[0]+', 1);');
				$('#ff').empty().append('<div id="fv"><img src="thumb/'+res[3]+'"><br>'+res[2]+'</div>');
				$('#ff').append('<div id="fh">'+res[3]+'</div>');
				autosize(res[0], res[1], 1);
				slit(100);
			}
		 });
	});
	
	$('#sub').click(function(){
		var tr=  $('#fh').text();
		if(tr.length!=0){
			$('#sub').empty().append('<img src="loading.gif">');
			var fil=$('#fh').text();
			var h=$('#hn').val();
			var w=$('#wn').val();
			var q=$('#qn').val();
			var m=$('#mn').val();
			var s=$('#sn').val();
			var u=$('#un').val();
			$.ajax({
				type: "POST",
				dataType: 'text',
				url: "act.php",
				data: {fil: fil, h: h, w: w, q: q, mode: m, size: s, unit: u}
			}).done(function( stat ) {
				var res = $.parseJSON(stat);
				$('#res').empty();
				$('#res').append('<div id="pinfo">'+res[1]+'x'+res[0]+' | '+res[2]+' | Q: '+res[4]+'</div>');
				$('#res').append('<div id="pic"><img src="store/'+res[3]+'"></div>');
				$('#sub').empty().append('Submit');
			});
		}
		else{
			$('#fn').click();
		}	
		
	});
});

function loadSlider(){
	var i=1;
	for(i=1;i<=100; i++){
		$('#qslide').append('<span class="slit" id="slit'+i+'"onclick="slit('+i+');"></span>');
	}
	for(i=1;i<=100;i++){
		$('#slit'+i).css('background', '#d2d2d2');
	}
}

function slit(x){
	var tr=  $('#fh').text();
	if(tr.length!=0){
		$('#qn').val(x);
		var i=1;
		for(i=1;i<=x;i++){
			$('#slit'+i).css('background', '#0f0');
		}
		
		for(i=x+1;i<=100;i++){
			$('#slit'+i).css('background', '#fff');
		}
	}
	else{
		$('#fn').click();
	}
}

function setq(){
		var x=$('#qn').val();
		if(x<0){x=1;}
		if(x>100){x=100;}
		slit(x);
}