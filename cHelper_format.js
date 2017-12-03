
var path = require('path');
var util = require('util');
var ideComm = require('./ideComm');
var cDygCmt = require('./cDygCmt');


class formatCollections {
    static block(cmd, vscode, sel, time, user) 
    {
        var help_str = {"dd":"delete", "ad":"add", "md":"modify"};
        var flag = 1; 
        var titleStr = util.format("%s %s by %s", time.toString(), help_str[cmd._key_str], user._name);
 
        var format = "/* %s  Begin*/\n#if %d \n\n#endif\n/* %s  End*/\n";
        if (cmd._key_str == "dd")
            flag   = 0;
        return util.format(format, titleStr, flag, titleStr);
    }


    static fileHead(cmd, vscode, sel, time, user) 
    {
        var filePath = path.parse(vscode.window.activeTextEditor.document.uri.fsPath);
        return cDygCmt.getFileHead(user, time, "", filePath.name+filePath.ext);
    }
    
    static history(cmd, vscode, sel, time, user)  
    {
        var format = "%s %s description: ";

        return util.format(format, time, user._name);
    }

    static headFile(cmd, vscode, sel, time, user) {
        vscode.window.showInputBox({prompt:"new c head file", placeHolder:"file name"}).then(fileName  => {
            var fileHead = cDygCmt.getFileHead(user, time, "", fileName);
            var cHead = cDygCmt.getCHeaderTemp(fileName);
            var comment = fileHead + cHead;
            var tUri = vscode.Uri.parse("untitled:" +  path.join(vscode.workspace.rootPath, fileName));
                ideComm.openNewDocAndFill(vscode, tUri, comment);
        });            
  

        return "";
    }

    static sourceFile(cmd, vscode, sel, time, user) 
    {
        vscode.window.showInputBox({prompt:"new c source file", placeHolder:"file name"}).then(fileName  => {
            var tUri = vscode.Uri.parse("untitled:" +  path.join(vscode.workspace.rootPath, fileName));
                var comment = cDygCmt.getFileHead(user, time, "", fileName);
                ideComm.openNewDocAndFill(vscode, tUri, comment);

            });
    }



    static func(cmd, vscode, sel, time, user) 
    {
        var commHead = cDygCmt.getBlockCmtCxt(user, time, "");
        var returnStr = "";
        var textCont = "";
        var blockCmtReg = /\/\*.*?\*\//g;
        var funcReg = /((?:static|inline|extern)?\s*?(?:const)?\s*(?:unsigned|struct)?\s*?\w+\s*?\*{0,2})\s*([-_\w]+)\s*['(']([^'(']*)[')']\s*\{/;
        //2017-02-07, yuch, modify the regx to support void parament
        var paramReg = /\s*((?:const)?\s*(?:unsigned|struct)?\s*[-|_|\w]+\s*\*{0,2})\s*([-|_|\w]*)\s*,?/g;
        var resArray = null;
        var paramStr = "";
        var result = null;

        //get 16 non-empty lines
        textCont = ideComm.getMoreLinesFromDoc(vscode, sel, 16);

        textCont = textCont.replace(blockCmtReg, "");

        //get func implementation string
        result = funcReg.exec(textCont);
        if (result == null)
            return;
        returnStr = cDygCmt.getReturn(result[1]);
        commHead = cDygCmt.getBlockCmtCxt(user, time, result[2]);
        while ((resArray = paramReg.exec(result[3])) != null)
        {
            paramStr += cDygCmt.getOneParam(resArray[1], resArray[2]);

        }
        return cDygCmt.getBlockCmt(commHead + paramStr + returnStr);
    }


}

module.exports.formatCollections=formatCollections;