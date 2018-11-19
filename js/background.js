"use strict";
let datajson = /*JSON.parse(*/{
    "data":
        [{
            "hname": "www.youtube.com",
            "rep_hname": "",
            "keyParam": "v",
            "keyWord": ["", ""],
            "fnewPath": "/embed/",
            "bnewPath": ""
        },
        {
            "hname": "www.vimeo.com",
            "rep_hname": "player.vimeo.com",
            "keyParam": "",
            "keyWord": [".com/", ""],
            "fnewPath": "/video/",
            "bnewPath": ""
        },
        {
            "hname": "www.vimeo.com",
            "rep_hname": "player.vimeo.com",
            "keyParam": "",
            "keyWord": [".com/", ""],
            "fnewPath": "/video/",
            "bnewPath": ""
        }

        ]

}/*)*/;

//chrome.runtime.onMessage.addListener(function (msg, sender) {
//    var actionCode = "open";
//    console.log(msg.action == actionCode);
//    if (msg.action == actionCode/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
//        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
//            var tempref;
//            tempref = tabs[0].url;
//            var newurl = new URL(tempref);
//            //next step will be a value to replace the "www.youtube.com". use variable rather than magic word
//            if (newurl.hostname == "www.youtube.com") {
//                var id;
//                //"v" is a magic word
//                id = newurl.searchParams.get("v");
//                var openURL;
//                //"embed" is a magic word
//                openURL = "http://" + newurl.hostname + '/embed/' + id;
//                console.log(openURL);
//                window.open(openURL, "myWindow", "resizable");

//            }

//            else {
//                chrome.tabs.sendMessage(tabs[0].id, { "embed": "on" }, function () { console.log("msg"); });
//            }
//        });
//    };
//});


chrome.runtime.onMessage.addListener(function (msg, sender) {
    var actionCode = "open";
    console.log(msg.action == actionCode);
    if (msg.action == actionCode/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            var tempref;
            tempref = tabs[0].url;
            var newurl = new URL(tempref);
            let ct = searching(datajson, newurl);
            //next step will be a value to replace the "www.youtube.com". use variable rather than magic word
            if (ct.hname!="") {
                var id;
                //"v" is a magic word
                id = newurl.searchParams.get(ct.keyParam);
                var openURL;
                //ct.hname will be replace. test on youtube now
                openURL = "http://" + ct.hname + ct.fnewPath + id + ct.fnewPath;
                console.log(openURL);
                window.open(openURL, "myWindow", "resizable");

            }

            else {
                chrome.tabs.sendMessage(tabs[0].id, { "embed": "on" }, function () { console.log("msg"); });
            }
        });
    };
});

function searching(data,url) {
    let output = new Object();
    output.hname="";
    output.rep_hname = "";
    output.keyParam = "";
    output.keyWord = "";
    output.fnewPath = "";
    output.bnewPath = "";

    data.data.forEach(function (name) {
        if (name.hname == url.hostname) {
            output.hname = name.hname;
            output.rep_hname = name.rep_hname;
            output.keyParam = name.keyParam;
            output.keyWord = name.keyWord;
            output.fnewPath = name.fnewPath;
            output.bnewPath = name.bnewPath;
            return output;
        }
    });
    //for (var obj in data.data) {
    //    if (obj.hname == url.hostname) {
    //        output.hname = obj.hname;
    //        output.rep_hname = obj.rep_hname;
    //        output.keyParam = obj.keyParam;
    //        output.keyWord = obj.keyWord;
    //        output.fnewPath = obj.fnewPath;
    //        output.bnewPath = obj.bnewPath;
    //        return output;
    //    }
    //}
    return output;
}