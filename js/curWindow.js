var localnewref;
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
    console.log("11");
    if (msg.embed == "on") {
        console.log("window recive");
        var dom = window.document.body;

        searching(dom);
        window.open(localnewref, "myWindow", "resizable");

    }
    else { console.log("no recive"); }
    
});
