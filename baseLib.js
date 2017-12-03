function getTimeStr() {
    var ds = new Date();
    return ds.getFullYear().toString() + "/" + (ds.getMonth() +1).toString() + "/" 
    + ds.getDate().toString() + " " + ds.getHours().toString() + ":" + ds.getMinutes().toString() + ":" + ds.getSeconds().toString();

}


function getFileNamePart(filename_with_type) {
    var strArray = filename_with_type.split('.');
    if (null != strArray)
        return strArray[0];
    
    return filename_with_type;

}

function alignStr2Width(str, width, fill) {
    var count = 0;
    var oldLen = str.length;
    if (oldLen>= width)
        return str;
    
    for (count=0; count<(width-oldLen); count++) {
        str += fill;
    }
    return str;

}
module.exports.getTimeStr = getTimeStr;
module.exports.getFileNamePart = getFileNamePart;
module.exports.alignStr2Width = alignStr2Width;
