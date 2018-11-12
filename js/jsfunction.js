"use strict";
   //this fucntion searching the iframe element, return the if with src
    function searching(dom) {
        //var localdom = dom;
        if (newref) {
            return;
        }
        var count;
        if (!dom) {
            return;
        }
        count = dom.childElementCount;
        var allchil = dom.children;
        for (var i = 0; i < count; i++) {
            var chil = allchil[i];
            if (chil.tagName == "IFRAME" && chil.src != "" && chil.id != 'buffer') {
                newref = chil.src
                return newref;
            }
            else {
                searching(chil);
            }
        }
    }
    var dom = document.body;
    var newref;
    searching(dom);
    function newWin(/*node*/) {
        myWindow = window.open(newref, "myWindow", "resizable");
        //myWindow.document.body.appendChild(node);
    }

    //newWin();


    //this part will work for youtube web full screen
//var tempref = window.location.href;//the popup.html will repalce the video page
//var tempref = chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) { return tabs[0].url;}
//);
//    var newref;
//    newref = tempref.split('');
//    newref.splice(0, 32);
//    var newrefstring = newref.join("");
//    newrefstring = "http://www.youtube.com/embed/" + newrefstring;
function newPath() {
    var tempref = chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
        var localUrl = tabs[0].url
        return localUrl;
    }
    );
    var newref;
    newref = tempref.split('');
    newref.splice(0, 32);
    var newrefstring = newref.join("");
    newrefstring = "http://www.youtube.com/embed/" + newrefstring;
     window.open(newrefstring, "myWindow", "resizable");
        //var myWindow = window.open(newrefstring, "myWindow", "resizable");
        console.log(newrefstring);
    }

    //this part for vimeo
    //var tempref=window.location.href;
    //var newref;
    //newref=tempref.split('');
    //newref.splice(0,18);
    //var newrefstring=newref.join("");
    //newrefstring="http://player.vimeo.com/video/"+newrefstring;
    //function newPath(){
    ////    myWindow=
    //    window.open(newrefstring, "myWindow", "resizable");

    //}

    ////for dailymotion

    //var tempref=window.location.href;
    //var newref;
    //newref=tempref.split('');
    //newref.splice(0,28);
    //var newrefstring=newref.join("");
    //newrefstring="https://www.dailymotion.com/embed/"+newrefstring;
    //function newPath(){
    //    //    myWindow=
    //    window.open(newrefstring, "myWindow", "resizable");

    //}
    //newPath();
var button1 = document.getElementById("b1");
//button1.addEventListener("click", newPath);
button1.addEventListener("click", clicked);
function clicked() {
    button1.innerHTML++;
    chrome.runtime.sendMessage("ipficfnjefpfblmpglpcgaijhbfigike", {"action": "open" }, function () { console.log("send"); })
}
