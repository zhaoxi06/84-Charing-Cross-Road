function addLoadEvent(func) {

	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element, value){
	if(!element.className){
		element.className = value;
	}else{
		element.className = element.className + " " + value;
	}
}

function hightlightPage(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName("header");
	if(!headers.length) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(!navs.length) return false;

	var links = navs[0].getElementsByTagName("a");
	var linkUrl;
	for(var i=0;i<links.length;i++){
		linkUrl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkUrl) != -1){
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.id = linktext;
		}
	}
}

addLoadEvent(hightlightPage);

function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.moveElement){
		clearTimeout(elem.moveElement);
	}
	if(!elem.style.left) elem.style.left = "0px";
	if(!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y) return true;
	if(xpos<final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos>final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos<final_y){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos>final_y){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.moveElement = setTimeout(repeat,interval);
}

function prepareSlideSHow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro); 

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1) moveElement("preview",0,0,5);
			if(destination.indexOf("about.html")!=-1) moveElement("preview",-170,0,5);
			if(destination.indexOf("photos.html")!=-1) moveElement("preview",-340,0,5);
			if(destination.indexOf("recommend.html")!=-1) moveElement("preview",-510,0,5);
			if(destination.indexOf("contact.html")!=-1) moveElement("preview",-680,0,5);
		}
	}
}
addLoadEvent(prepareSlideSHow);

function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id") == id){
			sections[i].style.display = "block";
		}else{
			sections[i].style.display = "none";
		}
	}
}
function prepareInternalnav(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var articles = document.getElementsByTagName("article");
	if(!articles.length) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(!navs.length) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		//sectionId是局部变量，可以通过添加属性的方式解决作用域的问题
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
 	var source = whichpic.getAttribute("href");
 	var placeholder = document.getElementById("placeholder");
 	if(placeholder.nodeName != "IMG") return false;
 	placeholder.setAttribute("src",source);
	if(document.getElementById("description")){
 		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title"):"";
 		var description = document.getElementById("description");
		if(description.firstChild.nodeValue == 3){
			description.firstChild.nodeValue = text;
		}
 		description.firstChild.nodeValue = text;
	}
	return true;
}
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my images gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image.");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
function prepareGallery(){
	if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick = function (){
			return !showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd){
				addClass(rows[j],"odd");
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}
function displayAbbreviations(){
	var abbreviations = document.getElementsByTagName("abbr");
	if(!abbreviations.length) return false;
	var defs = new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length <1) continue;
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length<1) return false;
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if(!articles.length) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
function focusLables(){
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLables);

function isPlaceholderSupport(){
	var input = document.createElement("input");
	return "placeholder" in input;
}
function resetFields(whichform){
	if(isPlaceholderSupport) return;
	for(var i=0;i<whichform.elements.length;i++){
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text){
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function(){
			if(!this.value){
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
	}
	element.onblur();
}
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		console.log(thisform);
		thisform.onsubmit = function(){
			return validateForm(this);
		}
	}
}
addLoadEvent(prepareForms);

function isFilled(filed){
	if(!filed.value.replace(" ","").length) return false;
	var placeholder = filed.placeholder || filed.getAttribute("placeholder");
	return (filed.value != placeholder);
}
function isEmail(filed){
	return (filed.value.indexOf("@")!=-1 && filed.value.indexOf(".")!=-1);
}
function validateForm(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var element = whichform.elements[i];
		console.log(element.required== "required");
		if(element.required == "required"){console.log(111);
			if(!isFilled(element)){
				alert("Please fill in the "+element.name+" filed.");
				return false;
			}
		}
		if(element.type == "mail"){
			if(!isEmail(element)){
				alert("The "+element.name+" filed must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}