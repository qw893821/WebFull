"use strict";
import { dataSearching as searchURL } from "./modular.js";

let datajson = {
    "data":
        [{
            "hname": "www.youtube.com",
            "rep_hname": null,
            "keyParam": "v",
            "keyWord": null,
            "fnewPath": "/embed/",
            "bnewPath": "",
            "splitLength": "0"
        },
            {
                "hname": "vimeo.com",
                "rep_hname": "player.vimeo.com",
                "keyParam": null,
                "keyWord": "com/\\d*",
                "fnewPath": "/video/",
                "bnewPath": "",
                "splitLength": "4"
            },
            {
                "hname": "v.youku.com",
                "rep_hname": "player.youku.com",
                "keyParam": null,
                "keyWord": "id_.*\[=][=]",
                "fnewPath": "/embed/",
                "bnewPath": "",
                "splitLength": "3"
            },
            {
                "hname": "www.pornhub.com",
                "rep_hname": null,
                "keyParam": "viewkey",
                "keyWord": null,
                "fnewPath": "/embed/",
                "bnewPath": "",
                "splitLength": "0"
            },
            {
                "hname": "www.bilibili.com",
                "rep_hname": "player.bilibili.com",
                "keyParam": null,
                "keyWord": "av\\d*",
                "fnewPath": "/player.html?aid=",
                "bnewPath": "",
                "splitLength": "2"
            },
            {
                "hname": "www.dailymotion.com",
                "rep_hname": null,
                "keyParam": null,
                "keyWord": "video/\.*",
                "fnewPath": "/embed/video/",
                
                "bnewPath": "",
                "splitLength": "6"
            },
            {
                "hname": "www.twitch.tv",
                "rep_hname": "player.twitch.tv",
                "keyParam": null,
                "keyWord": "tv/\.*",
                "fnewPath": "/?channel=",
                "bnewPath": "",
                "splitLength": "3"
            }
        ]
};

//a list of list which user use this extension to open
let preSiteList={
	"val":[
	]
}

chrome.runtime.onMessage.addListener(function (msg, sender) {
    if (msg.action == "open"/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            let tempref;
            tempref = tabs[0].url;
            let newurl = new URL(tempref);
            let ct = searchURL(datajson, newurl);
			//let ct=myModule.dataSearching(datajson, newurl);
            if (ct.hname != "") {
                var id;
                //video site like youtube have a key to easy find the video id
                if (ct.keyParam != null) {
                    id = newurl.searchParams.get(ct.keyParam);
					if(!id){
						chrome.runtime.sendMessage({data:"NotVid"},function(){console.log("send to pop");})
						return;
					}
					console.log(id);
                }
                //when there is no key, then find the id from href. it not always work.
                else {
                    var re = RegExp(ct.keyWord);
                    let localid = re.exec(newurl);
                    id = localid[0];
                    let charArr = id.split('');
                    charArr.splice(0, parseInt(ct.splitLength, 10));
                    id = charArr.join('');
                    console.log(id);
                }
                var openURL;
                if (ct.rep_hname == null) {
                    ct.rep_hname = ct.hname;
                }
                openURL = "https://" + ct.rep_hname + ct.fnewPath + id + ct.bnewPath;
                window.open(openURL);
				const sitePair={
					preHref:tempref,
					curHref:openURL
				}
				preSiteList.val.push(sitePair);
				//this is no possible when cross origin
				//newwindow.sessionStorage.setItem("sitePair",`${sitePair.preHref},${sitePair.curHref}`);

            }

            else {
                chrome.tabs.sendMessage(tabs[0].id, { embed: "on" }, function () { console.log("send to content script"); });
            }
        });
    }
    else if (msg.action == "lucky") {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { embed: "lucky" }, function () { console.log("btn2 send"); })
        })
    }

	else if(msg.action=="return"){
		console.log("return get");
		/*chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
			
			const prePair=pairSearch(preSiteList.val,tabs[0].url);
            chrome.tabs.sendMessage(tabs[0].id, { embed: "return",presite:prePair.preHref }, function () { 
			preSiteList.val.splice(prePair.pairIndex,1);
			console.log("return send"); })
        })*/
		chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { embed: "return" }, function () { console.log("return now"); })
        })
	}
	else if(msg.action=="urlRequest"){
		//console.log("here i send a list");
		//chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
		//chrome.tabs.sendMessage(tabs[0].id, { data: "List" }, function () { console.log("return now"); })
	})
	}
});


function pairSearch(pair,target){
	const cst={
		pairIndex:null,
		preHref:null
	}
	for(var i=0;i<pair.length;i++){
		if(pair[i].curHref==target){
			cst.pairIndex=i;
			cst.preHref=pair[i].preHref;
			return cst;
		}
	}
	return -1;

}
