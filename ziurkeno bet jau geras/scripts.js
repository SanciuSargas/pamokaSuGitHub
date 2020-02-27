function formUrl(nuo, iki) {
	var url = "http://justinopuslapis.ddns.net/ziurkenas/json.php?";
	url+="from="+nuo+"&";
	url+="to="+iki;
	return url;
}

function paimkJson(){
	var url = formUrl(1, 99999999999);
	
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		//console.log(this.readyState);
		if(this.readyState === 4) { /* ready */
			//console.log(this.status);
			if(this.status !== 200){ // 200 - OK
				alert("blogai");
				return;
			}else{
				jsonData = JSON.parse(request.responseText);
				//console.log(jsonData);
				sutvarkykStats();
			}
		}
	};
	request.open("GET", url, true); // true - asynchronous request
	request.send();
}

function daugIrVidPerDiena(){
	//pirmiausia reikia susumuot kiek per kiekviena diena
	var kiekPerDiena=[];
	var valandos=sudekViskaIValandas();
	
	var kiek=0;
	
	var daug=0;
	var vid=0;
	//console.log(valandos.length);
	
	for(i=0; i<valandos.length; i++){ // reikia susumuot viską nuo pirmos iki 24 valandos
		var date = new Date(valandos[i]['time'] * 1000);
		var hours = date.getHours();
		//console.log(kiek);
		if(hours === 1){
			kiekPerDiena.push(kiek);
			vid+=kiek;
			if(kiek > daug){
				daug=kiek;
			}
			kiek=0;	
		}
		kiek+=valandos[i]['value'];
	}
	
	vid/=kiekPerDiena.length;
	//console.log(daug);
	//console.log(vid);
	return [daug, vid, kiekPerDiena.length];
}

function sutvarkykStats(){
	ats = daugIrVidPerDiena(); //grazina kiek daugiausiai ir vidutiniškai per dieną padaro apsisukimų
	console.log(ats);
	document.getElementById("1").innerHTML="Iš viso dienų: "+ats[2];
	document.getElementById("2").innerHTML="Daugiausiai per diena: "+ats[0];
	document.getElementById("3").innerHTML="Vidutinškai per diena: "+ats[1];
}

window.onload = function() {
	paimkJson();
	
}

function createDiv(id){
	var div = document.createElement("DIV");
	div.setAttribute('id', id);
	document.getElementById("visiGrafikaiIrLenteles").appendChild(div);
}

function sudekViskaIValandas(){
	if(jsonData.length >= 1){
		var masyvas=[{time:Math.floor(parseInt(jsonData[0]['time'])/3600)*3600, value:0}];
		
		for(i = 0; i < jsonData.length; i++){
			var date = Math.floor(parseInt(jsonData[i]['time'])/3600)*3600;
			//console.log(date);
			//console.log("tarpas");
			var value = parseFloat(jsonData[i]['value']);
            //console.log(date + " " + (Number(masyvas[(masyvas.length)-1]['time'])+3600));
            //console.log("tarpas");
			if(date >= Number(masyvas[(masyvas.length)-1]['time'])+3600){
				masyvas.push({time:date, value:value});
			}
			else{
				masyvas[(masyvas.length)-1]['value']+=value;
			}
		}
		
		return masyvas;
	}
}

function sudekViskaIDienaValandom(){
	
	var masyvas=sudekViskaIValandas();
	var geresnisMasyvas=[{time:1,value:0}];
	
	
	for(j=0; j<24; j++){
		geresnisMasyvas.push({time:j+1, value:0});
		var kiek=0;
		for(i = 0; i < masyvas.length; i++){
			var date = new Date(masyvas[i]['time'] * 1000);
			var hours = date.getHours();
			if(hours === j+1){
				//console.log("pavyko "+masyvas[i]['time']);
				geresnisMasyvas[j]['value']+=masyvas[i]['value'];
				kiek++;
			}
		}
		if(kiek !== 0 && geresnisMasyvas[j]['value'] !== 0){
			geresnisMasyvas[j]['value']/=kiek;
		}
	}
	
	
	return geresnisMasyvas;
}

function clearDiv(div){
	if(document.getElementById(div) != null) document.getElementById(div).innerHTML = "";
}

function drawChart(){
    var masyvas=sudekViskaIDienaValandom();
    console.log(masyvas);
	if(masyvas.length >= 1){
		clearDiv('graph_div');
		data = new google.visualization.DataTable();
		data.addColumn('number', 'Laikas');
		data.addColumn('number', 'Apsisukimai');
		for(i = 1; i < masyvas.length; i++){
			var date = masyvas[i]['time'];
			var value = parseFloat(masyvas[i]['value']);
			data.addRow([date, value]);
		}
		var options = {'chartArea': {'width': '80%', 'height': '80%'}, 'legend': {'position': 'bottom'}};
		var chart = new google.charts.Bar(document.getElementById('graph_div'));
		chart.draw(data, options);
	}
}

function dienosVidurkisKasValanda(){
	createDiv('graph_div');
	google.charts.load('visualization', 'current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawChart);
}
var jsonData;
var data;