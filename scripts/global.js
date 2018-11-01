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