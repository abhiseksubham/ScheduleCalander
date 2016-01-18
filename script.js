var schedule = {"calender":[
    {"id":"1", "desc":"Desc 1", "startTime":"540", "endTime":"570"},
	{"id":"2", "desc":"Desc 2", "startTime":"600", "endTime":"630"},
	{"id":"3", "desc":"Desc 3", "startTime":"540", "endTime":"570"},
	{"id":"4", "desc":"Desc 4", "startTime":"540", "endTime":"570"}
]};

var timeArray = [540, 555, 570, 585, 
				 600, 615, 630, 645, 
				 660, 675, 690, 705,
				 720, 735, 750, 765, 
				 780, 795, 810, 825, 
				 840, 855, 870, 885, 
				 900, 915, 930, 945, 
				 960, 975, 990, 1005, 
				 1020, 1035, 1050, 1065, 
				 1080, 1095, 1110, 1125, 
				 1140, 1155, 1170, 1185,
				 1200, 1215, 1230, 1245, 1260
];

var rows = [];

function generateRange(){

	for(i=0; i<schedule.calender.length; i++){
		
		var startTime = parseInt(schedule.calender[i].startTime);
		var endTime = parseInt(schedule.calender[i].endTime);
			
		for(j=startTime; j<=endTime;){
			
			if(rows[j] == undefined)
				rows[j] = 0;
				
			rows[j] = rows[j] + 1;
			j = j + 15;
		}
	}
}

function createInterval(){
	
	var html = "";
	
	for(i=0; i<timeArray.length; i++){
		html += "<div class='interval'>" + getFormattedTime(timeArray[i]) + "</div>";
	}
	
	document.getElementById('label').innerHTML = html; 

	generateRange();
	createTimeBlocks();
	DisplayMessages();
}


function createTimeBlocks(){

	var max = 0;

	for(i=0; i<rows.length; i++){
		if(rows[i] != undefined){
			if(parseInt(rows[i]) > max){
				max = parseInt(rows[i]);
			}
		}
	}

    var tbl = document.getElementById('calenderContainer');
    tbl.setAttribute('border', '0');
	tbl.setAttribute('cellpadding', '0');
		
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 49; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < max; j++) {
            
			var td = document.createElement('td');
			td.style.width = 100/max + "%";
            tr.appendChild(td)
        }
		
        tbdy.appendChild(tr);
    }
	
	tbl.appendChild(tbdy);
	
	FillDataColor();
}

function FillDataColor(){

	var tRows = document.getElementById("calenderContainer").getElementsByTagName("tr")
	l=0;
	
	for(i=0; i<schedule.calender.length; i++){
		var startTime = parseInt(schedule.calender[i].startTime);
		var endTime = parseInt(schedule.calender[i].endTime);
		k=(startTime - 540) / 15;
		l=0;
		
		var color = "color" + i;
		var bFirst = true;
		var s;
		
		for(j=startTime; j<endTime; j+=15){
			
			if(true == bFirst){
				s = k;
				bFirst = false;
			}
			
			while(tRows[k].getElementsByTagName("td")[l].innerHTML != "")
				l+=1;
			
			var el = tRows[k].getElementsByTagName("td")[l];
			if(el) {
				el.className = color;
			}
			
			tRows[s].getElementsByTagName("td")[l].innerHTML = schedule.calender[i].desc;
			k++;
		}
	}
	
	ExpandSingleEvents();
}

function ExpandSingleEvents(){
	var tRows = document.getElementById("calenderContainer").getElementsByTagName("tr");
	
	for(i=0; i<tRows.length; i++){
	
		var tTabCells = tRows[i].getElementsByTagName("td");
		
		if(tTabCells[0].className.indexOf("color") != -1){
			var overlap = false;
			for(j=1;j<tTabCells.length;j++){
				if(tTabCells[j].className.indexOf("color") != -1)
					overlap = true;
			}
			
			if(!overlap){
				for(j=1;j<tTabCells.length;j++){
					tTabCells[j].className = tTabCells[0].className;
				}
			}
		}
	}
		
}

function getFormattedTime(time){

	var hr = Math.floor(time / 60);
	
	if(hr < 10)
		hr = "0" + hr;
	
	var min = Math.floor(time % 60);
	
	if(min < 10)
		min = "0" + min;
		
	return hr + " : " + min;
		
}

function DisplayMessages(){

	var html = "";
		
	var tbl = document.getElementById('msgTable');
		
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < schedule.calender.length; i++) {
        var tr = document.createElement('tr');
		
		var td = document.createElement('td');
		td.style.width = "33%";
        td.innerHTML = schedule.calender[i].desc;
		tr.appendChild(td);
		
		var td = document.createElement('td');
		td.style.width = "33%";
        td.innerHTML = getFormattedTime(schedule.calender[i].startTime);
		tr.appendChild(td);
		
		var td = document.createElement('td');
		td.style.width = "33%";
        td.innerHTML = getFormattedTime(schedule.calender[i].endTime);
		tr.appendChild(td);
			
        tbdy.appendChild(tr);
    }
	
	tbl.appendChild(tbdy);
}