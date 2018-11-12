chrome.runtime.onMessage.addListener(function (msg, sender) {
    
    var actionCode = "open";
    console.log(msg.action == actionCode);
    if (msg.action == actionCode/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            var tempref;
            tempref = tabs[0].url;
            var newref;
            var siteurl;
            newref = tempref.split('');
            siteurl = newref.splice(0, 32);
            siteurl = siteurl.join("");
            console.log(siteurl);
            var newrefstring = newref.join("");
            if (siteurl == "https://www.youtube.com/watch?v=") {
                newrefstring = "http://www.youtube.com/embed/" + newrefstring;
                window.open(newrefstring, "myWindow", "resizable");
            }
            else {
                //function searching(dom) {
                //    //var localdom = dom;
                //    if (localnewref) {
                //        return;
                //    }
                //    var count;
                //    if (!dom) {
                //        return;
                //    }
                //    count = dom.childElementCount;
                //    var allchil = dom.children;
                //    for (var i = 0; i < count; i++) {
                //        var chil = allchil[i];
                //        if (chil.tagName == "IFRAME" && chil.src != "" && chil.id != 'buffer') {
                //            localnewref = chil.src
                //            return localnewref;
                //        }
                //        else {
                //            searching(chil);
                //        }
                //    }
                //}
                //var dom = tabs[0].window.document.body;
                //var localnewref;
                //searching(dom);
                //var myWindos= window.open(localnewref, "myWindow", "resizable");
                chrome.tabs.sendMessage(tabs[0].id, { "embed": "no" }, function () { console.log(tabs[0].id);});
            }
            //window.open(newrefstring, "myWindow", "resizable");
            //var myWindow = window.open(newrefstring, "myWindow", "resizable");
        });
    };
});

