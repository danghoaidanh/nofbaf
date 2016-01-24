exports.all = function (fn) {
    fn(null,{testing:[
        {value: "New", onclick: "CreateNewDoc()", action: "donothing"},
        {value: "New", onclick: "CreateNewDoc()", action: "donothing"}
    ]});
}