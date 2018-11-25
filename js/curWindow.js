"use strict"
let localnewref;
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
//var dom = tabs[0].window.document.body;
//var localnewref;
//searching(dom);
//var myWindos = window.open(localnewref, "myWindow", "resizable");

chrome.runtime.onMessage.addListener(function (msg, sender) {
    console.log('from back end');
    if (msg.embed == "on") {
        let hr = window.location.href;
        let newurl = new URL(hr);
        let ct = searchID(datajson, newurl);
        if (ct.hname != "") {
            let id;
            let localkey = localStorage.getItem(ct.keyParam);
            let re =new RegExp(ct.keyWord);
            let localid = re.exec(localkey);
            id = localid[0];
            let charArr = id.split('');
            charArr.splice(0, parseInt(ct.splitLength, 10))
            id = charArr.join('');
            let openURL = "http://" + ct.rep_hname + ct.fnewPath + id + ct.bnewPath;
            window.open(openURL, "myWindow", "resizable");
        }
        else {
            var dom = window.document.body;
            searching(dom);
            window.open(localnewref, "myWindow", "resizable");
        }

    }
    else { console.log("no recive"); }
});

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
