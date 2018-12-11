export { dataSearching };

function dataSearching(data, url) {
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