var pirmasKartas=true;


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function jau() {
  if(pirmasKartas){
  	var array=new Array(26);
  	
  	for(var i=1; i<=26; i++){
  		array[i-1]=new Array(2);
		var e = document.getElementById(i+50);
	  	var strUser = e.selectedIndex;
	  	var value=document.getElementById(i)["value"];
	  	array[i-1][0]=value;
	  	array[i-1][1]=strUser;
	}
	var json_str = JSON.stringify(array);
	if (json_str != "" && json_str != null) {
	  localStorage.setItem("vietos", json_str);
	  //console.log(json_str);
	}
  	
  	pirmasKartas=false;
  }
  alert("Pats prašei");
  var vardaiRusiavimui = [];
  var vardaiNeraMokykloj = [];
  
  for(var i=1; i<=26; i++){
  	var e = document.getElementById(i+50);
  	var strUser = e.options[e.selectedIndex].text;
  	if(strUser === "keičiasi"){
  		//console.log(document.getElementById(i)["value"]);
  		vardaiRusiavimui.push(document.getElementById(i)["value"]);
  	}
  	else if(strUser === "nėra mokykloj"){
  		//console.log(document.getElementById(i)["value"]);
  		vardaiNeraMokykloj.push(document.getElementById(i)["value"]);
  		e.selectedIndex=0;
  		//console.log("bananas");
  	}
  }
  var arr = shuffle(vardaiRusiavimui);
  //console.log(arr);
  var j=0;
  var m=0;
  for(var i=1; i<=26; i++){
  	var e = document.getElementById(i+50);
  	var strUser = e.options[e.selectedIndex].text;
  	if(i%2 === 1){
  		var eKitas = document.getElementById(i+51);
  		var strUserKitas = eKitas.options[eKitas.selectedIndex].text;
  	}
	//console.log(strUser, strUserKitas, vardaiNeraMokykloj.length);
	if(i%2 === 1 && strUser === "keičiasi" && strUserKitas === "keičiasi" && m<vardaiNeraMokykloj.length-1){
  		document.getElementById(i)["value"] = vardaiNeraMokykloj[m];
  		m++;
  		e.selectedIndex=2;
  		document.getElementById(i+1)["value"] = vardaiNeraMokykloj[m];
  		m++;
  		eKitas.selectedIndex=2;
  		i++;
  	}
  	else if(vardaiNeraMokykloj.length%2 === 1 && vardaiRusiavimui.length <= i && m<vardaiNeraMokykloj.length && strUser === "keičiasi"){
		document.getElementById(i)["value"] = vardaiNeraMokykloj[m];
		console.log(vardaiNeraMokykloj[m]);
  		m++;
  		e.selectedIndex=2;
	}
	else if(strUser === "keičiasi"){
  		document.getElementById(i)["value"] = vardaiRusiavimui[j];
  		j++;
  		//e.selectedIndex=1;
  	}
  }
  
  pasikeite();
}

window.onload = function() {
	var pradiniaiMetai=getRandomIntInclusive(1900, new Date().getFullYear());
	var galiniaiMetai=(new Date().getFullYear()+1);
	document.getElementById("data").innerHTML="© "+pradiniaiMetai.toString()+"-"+galiniaiMetai.toString()+" UAB \"JustukasIrKo\"";
	document.getElementById("title").innerHTML="After "+(galiniaiMetai-pradiniaiMetai).toString()+" years of development:";
	var json_str = localStorage.getItem("vietos");
	//console.log(json_str);
	if (json_str != null) {
		var arr = JSON.parse(json_str);
		for(var i=1; i<=26; i++){
			var e = document.getElementById(i+50);
		  	e.selectedIndex = arr[i-1][1];
		  	document.getElementById(i)["value"] = arr[i-1][0];
		}
		
	} 
	pasikeite();
	var sk=getRandomIntInclusive(1, 20);
	console.log(sk);
	if(sk === 1){
		document.getElementById("submit1")["value"] = "\"Rodyk, ką moki\"-J.P.";
	}
	
}

function pasikeite() {
	for(var i=1; i<=26; i++){
  	var e = document.getElementById(i+50);
  	var strUser = e.options[e.selectedIndex].text;
  	if(strUser === "nėra mokykloj"){
  		document.getElementById(i).style.color = "#d4d0ae";
  	}
  	else if(strUser === "nesikeičia"){
  		document.getElementById(i).style.color = "#524e27";
  	}
	else{
		document.getElementById(i).style.color = "#000000";
	}
  }
}

