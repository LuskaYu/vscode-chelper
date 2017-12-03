
class user {
    constructor(vscode) {
        var Conf = vscode.workspace.getConfiguration('chelper');
        try {
        this._name = Conf.get('user_name');
        this._company = Conf.get('user_company');
        this._email = Conf.get('user_email');
        this._copyrights = Conf.get('user_copyrights');
        }
        catch(error) {
            this._name = "default";
            this._company = "deafult";
            this._email = "deafult";
            this._copyrights = "All rights resverd.";            
        }
    }
}
module.exports.user=user;