window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;
			if (file.type.match(textType)) {
				var reader = new FileReader();
				reader.onload = function(e) {
					//fileDisplayArea.innerText = reader.result;
					$('#fileDisplayArea').text(reader.result);
					var lines = $('#fileDisplayArea').text().split('\n');
					var ct = 0;
					var wordCountMap = new Map();
					for(var i=0 ; i<lines.length ; i++){
						var words = lines[i].trim().split(/\s+/);
						ct += words.length;
						for (var j = 0 ; j < words.length; j++){
							var key = words[j];
							if(!wordCountMap.has(key)) {
								wordCountMap.set(key, 1);
							} else {
								var currVal = wordCountMap.get(key);
								wordCountMap.set(key, currVal+1);
							}
						}
					}
					//NOW WE'LL SORT THE WORDS BY DESENDING COUNT, AND STORE IN A NEW MAP, sortedWordCountMap.
					//HOWEVER, we'll have to use an array to do the sorting and then
					//write to sortedWordCountMap.
					var sortedWordCountMap = new Map();
					var arr = Array.from(wordCountMap).sort(function(a,b){return b[1]-a[1];});
					var tot = 0;
					for(v in arr){
						sortedWordCountMap.set(arr[v][0], arr[v][1]);
						tot += arr[v][1];
					}
					var s = "";
					sortedWordCountMap.forEach(function(v, k ){
						s+=(k+":"+v+"\n");
					});
					s += ("total number words:"+tot);
					$('#analysis').text(s);
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
