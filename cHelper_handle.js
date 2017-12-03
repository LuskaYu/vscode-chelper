var ideComm = require('./ideComm');

class handleCollections {
    static comm(entry, vscode, sel, time, user) {
        var fillStr = entry._format(entry, vscode, sel, time, user);  
  
        return ideComm.insertText2Doc(vscode, sel, fillStr);
    }

}
module.exports.handleCollections=handleCollections;