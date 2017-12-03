
var baseLib = require('./baseLib');
var util = require('util');

function getBlockCmt(comment) {
        var blockStart = "/**\n";
        var blockEnd = "*/\n";
        return blockStart + comment + blockEnd;

    }

    function getBlockCmtCxt(user, time, brief) {
        var blockComCmt = "\
* @brief  %s\n*\n*\n*\n\
* @author %s\n\
* @email  %s\n\
* @date   %s\n\
";
        return util.format(blockComCmt, brief, user._name, user._email, time);
    }


    function getCopyRights(user, other) {
        return util.format("* CopyRights(C) %s %s \n*%s\n", user._company, user._copyrights, other);

    }

    function getFileHead(user, time, brief, file) {
        var crs = getCopyRights(user, brief);
        var comTxt = getBlockCmtCxt(user, time , file)
        var comment = getBlockCmt(crs + comTxt);        

        return comment;  
    }
    function getCHeaderTemp(file) {

        var hDefine =  baseLib.getFileNamePart(file).toUpperCase();
        var cHeaderFormat = "#ifndef __%s_H__\n\
#define __%s_H__\n\
#ifdef __cplusplus\n\
extern \"C\" {\n\
#endif\n\
/*----------------------------------------------*\n\
* file including instruction                   *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
* declare extern variaries                     *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
* declare extern functions                     *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
*declare inner functions                             *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
* global variaries                              *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
* module variaries                              *\n\
*----------------------------------------------*/\n\n\n\
/*----------------------------------------------*\n\
* constants                                      *\n\
*----------------------------------------------*/\n\n\n\n\
/*----------------------------------------------*\n\
* marcro                                       *\n\
*----------------------------------------------*/\n\n\n\
#ifdef __cplusplus\n\
}\n\
#endif\n\
#endif /* __%s_H__ */\n";           
        return util.format(cHeaderFormat, hDefine, hDefine, hDefine);
    }

    function getOneParam(ptype, pname) {
        var funcParamFmt = "* @param  %s %s\n";
        return util.format(funcParamFmt, baseLib.alignStr2Width(ptype, 16, " "), baseLib.alignStr2Width(pname, 16, " "));
    }

    function getReturn(preturn) {
        var returnFmt = "* @return %s \n";
        return util.format(returnFmt, preturn);
    }


module.exports.getReturn = getReturn;
module.exports.getOneParam = getOneParam;
module.exports.getBlockCmt = getBlockCmt;
module.exports.getBlockCmtCxt = getBlockCmtCxt;
module.exports.getCopyRights =getCopyRights;
module.exports.getFileHead = getFileHead;
module.exports.getCHeaderTemp = getCHeaderTemp;
