
    function openNewDocAndFill(vscode, uri, context) {
        var nPos = new vscode.Position(1, 1);
        vscode.workspace.openTextDocument(uri).then(doc => {
            vscode.window.showTextDocument(doc, 0, true).then (editor =>
                editor.edit(function (eb) 
                {
                    eb.insert(nPos, context);
            }));
        });

    }

    function   insertText2Doc(vscode, sel, str) {
                var nStart = new vscode.Position(sel.start.line, 0);
                var end = new vscode.Position(sel.end.line, sel.end.character);
                var nSel = new vscode.Selection(nStart, end);

                vscode.window.activeTextEditor.edit(function (eb) 
                {
                    eb.replace(nSel, "");
                    eb.replace(nStart, str);
                });
            }

    function getMoreLinesFromDoc(vscode, sel, lines) {
        var doc =  vscode.window.activeTextEditor.document;
        var count = sel.end.line;
        var tmp_str = "";
        var parseStr = "";
        var maxCnt = 0;

        // 2017-02-07, yuch, add a condition to set the correct left count as the limitation
        if (doc.lineCount <= (sel.end.line+lines))
            maxCnt = doc.lineCount;
        else
            maxCnt = sel.end.line + lines;
        
        while(++count < maxCnt) {

            tmp_str = doc.lineAt(count).text;
            if (0  == tmp_str.trim().length)
            {
                continue;
            }
            parseStr += " " + tmp_str;
        }
        return parseStr;
    }




module.exports.openNewDocAndFill=openNewDocAndFill;
module.exports.insertText2Doc=insertText2Doc;
module.exports.getMoreLinesFromDoc=getMoreLinesFromDoc;