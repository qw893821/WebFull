"use strict";
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

        ]
};


chrome.runtime.onMessage.addListener(function (msg, sender) {
    if (msg.action == "open"/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            let tempref;
            tempref = tabs[0].url;
            let newurl = new URL(tempref);
            let ct = searchURL(datajson, newurl);
            if (ct.hname != "") {
                var id;
                //video site like youtube have a key to easy find the video id
                if (ct.keyParam != null) {
                    id = newurl.searchParams.get(ct.keyParam);
                }
                //when there is no key, then find the id from href. it not always work.
                else {
                    var re = RegExp(ct.keyWord);
                    let localid = re.exec(newurl);
                    id = localid[0];
                    let charArr = id.split('');
                    charArr.splice(0, parseInt(ct.splitLength, 10)); //remvove "com/" from the id;
                    id = charArr.join('');
                    console.log(id);
                }
                var openURL;
                if (ct.rep_hname == null) {
                    ct.rep_hname = ct.hname;
                }
                //ct.hname will be replace. test on youtube now
                openURL = "http://" + ct.rep_hname + ct.fnewPath + id + ct.bnewPath;
                console.log(openURL);
                window.open(openURL, "myWindow");

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
});


//iterate the stored data, check host name.
//when host name is found return the data
function searchURL(data, url) {
    let output={
        hname : "",
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