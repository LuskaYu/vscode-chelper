
var baseLib = require('./baseLib');
var userInfo = require('./userInfo');
var hc = require('./cHelper_handle');
var fc = require('./cHelper_format');



class baseCmd{
    constructor(key_str, des, handle, format) {
        this._key_str = key_str;
        this._cmd_des = des;
        this._handle = handle;
        this._format = format;        
    }

}
class mainProcess {
    constructor() {
        this._cmdHash = {};
        this._cmdHash["hfile"] = new baseCmd("hfile", "add a new head file", hc.handleCollections.comm, fc.formatCollections.headFile);
        this._cmdHash["cfile"] = new baseCmd("cfile", "add a new c file", hc.handleCollections.comm, fc.formatCollections.sourceFile);
        this._cmdHash["hi"] = new baseCmd("hi", "modify list ", hc.handleCollections.comm, fc.formatCollections.history);
        this._cmdHash["ad"] = new baseCmd("ad", "the comment for adding", hc.handleCollections.comm, fc.formatCollections.block);
        this._cmdHash["md"] = new baseCmd("md", "the comment for modifing", hc.handleCollections.comm, fc.formatCollections.block);                       
        this._cmdHash["dd"] = new baseCmd("dd", "the comment for deleting", hc.handleCollections.comm, fc.formatCollections.block);
        this._cmdHash["func"] = new baseCmd("func", "add a new function or function comment", hc.handleCollections.comm, fc.formatCollections.func);
        this._cmdHash["head"] = new baseCmd("head", "add a new file head", hc.handleCollections.comm, fc.formatCollections.fileHead);
    }

    run(vscode) {
            var textEd = vscode.window.activeTextEditor;
            var sel = textEd.selection;
            var time = baseLib.getTimeStr();
            var user = new userInfo.user(vscode); 
            var str = textEd.document.lineAt(sel.start.line);
            var key = str.text.trim();
            if (null == sel) 
            {
                return;
            }
        
            if (this._cmdHash[key] == null)
            {
                return;
            }

            try
            {
                var entry = this._cmdHash[key];
                entry._handle(entry, vscode, sel, time, user);
            }
            catch(err){
                console.log("cHelper exception: " + err.name + " message: " + err.message);
            }
        }
}

module.exports.mainProcess=mainProcess;