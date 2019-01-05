"use strict"

//import is not will supported in content script. When injected by a handler, this script will not have access of chrome.runtime object. so not use import at current state.
//import { dataSearching as searchID } from "./modular.js";

let localnewref;

//the return url 
let returnRef;
//this part of site do not have direct video id show in the domin, need check the local storage to find the right video.
let datajson = {
    "data":
        [{
            "hname": "www.iqiyi.com",
            "rep_hname": "open.iqiyi.com",
            "keyParam": "QiyiPlayerLogger",
            "keyWord": "tvid[\"][:][\"]\\d*",
            "fnewPath": "/developer/player_js/coopPlayerIndex.html?tvId=",
            "bnewPath": "",
            "splitLength": "7"
        }
        ]
};


chrome.runtime.onMessage.addListener(function (msg, sender) {
    if (msg.embed == "on") {
        let hr = window.location.href;
        let newurl = new URL(hr);
        let ct = searchID(datajson, newurl);
        if (ct.hname != "") {
            console.log("this site is in list");
            let id;
            let localkey = localStorage.getItem(ct.keyParam);
            let re =new RegExp(ct.keyWord);
            let localid = re.exec(localkey);
            id = localid[0];
            let charArr = id.split('');
            charArr.splice(0, parseInt(ct.splitLength, 10))
            id = charArr.join('');
            let openURL = "http://" + ct.rep_hname + ct.fnewPath + id + ct.bnewPath;
            window.open(openURL);
        }
        else {
            console.log("this site is not in list");
            var dom = window.document.body;
            searching(dom);
            window.open(localnewref);
        }

    }
    else if (msg.embed == "lucky") {
        embVidSearch();
    }
    else if(msg.embed=="return"){
		window.location=returnRef;
	}
	if(msg.action=="List"){
		console.log("get return list"+" "+"todo	");
	}
});


//iframe video
function searching(dom) {
    //var localdom = dom;
    if (localnewref) {
        return localnewref;
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
            localnewref = chil.src
            return localnewref;
        }
        else {
            searching(chil);
        }
    }
}

//find local storgae video
function searchID(data, url) {
    let output = {
        hname: "",
        rep_hname: "",
        keyParam: "",
        keyWord: "",
        fnewPath: "",
        bnewPath: "",
        splitLength: ""
    }

    data.data.forEach(function (name) {
        if (name.hname == url.hostname) {
            output.hname = name.hname;
            output.rep_hname = name.rep_hname;
            output.keyParam = name.keyParam;
            output.keyWord = name.keyWord;
            output.fnewPath = name.fnewPath;
            output.bnewPath = name.bnewPath;
            output.splitLength = name.splitLength;
            return output;
        }
    });

    return output;
}

//single embed video
function embVidSearch() {
    console.log('dnvod');
    //first step test on dnvod
    let emb = document.getElementsByTagName('embed');
    //get body
    let b = document.body;
    //change the parent of emb, test of dnvod with only on embed tag
    b.appendChild(emb[0]);
    let domList = b.children;
    domList = Array.prototype.slice.call(domList);
    domList.forEach(function (ele) { if (ele != emb[0]) { ele.parentNode.removeChild(ele); console.log(ele); }; });
}

function requestReturn() {
    localStorage.setItem("currentURL",window.location.href);
	chrome.runtime.sendMessage({"action":"urlRequest"},function(){console.log("return url request send")});
}

if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",requestReturn);
}
else {
	requestReturn();
}