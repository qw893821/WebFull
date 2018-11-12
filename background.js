chrome.runtime.onMessage.addListener(function (msg, sender) {
    var actionCode = "open";
    console.log(msg.action == actionCode);
    if (msg.action == actionCode/* && sender == "ipficfnjefpfblmpglpcgaijhbfigike"*/) {
        chrome.tabs.query({ 'currentWindow': true, 'active': true }, function (tabs) {
            var tempref;
            tempref = tabs[0].url;
                          var newurl=new URL(tempref);
                          //next step will be a value to replace the "www.youtube.com". use variable rather than magic word
            if (newurl.hostname == "www.youtube.com") {
                          var id;
                          //"v" is a magic word
                          id=newurl.searchParams.get("v");
                          var openURL;
                          //"embed" is a magic word
                          openURL="http://"+newurl.hostname+'/embed/'+id;
                          console.log(openURL);
                          window.open(openURL,"myWindow","resizable");
                          
            }
                          
            else {
                chrome.tabs.sendMessage(tabs[0].id, { "embed": "on" }, function () { console.log("msg");});
            }
        });
    };
});

