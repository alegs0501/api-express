"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileList = void 0;
class ProfileList {
    constructor() {
        this.profiles = [];
    }
    static getInstance() {
        if (!ProfileList.instance) {
            ProfileList.instance = new ProfileList();
        }
        return ProfileList.instance;
    }
    findProfileByEmail(email) {
        let user = undefined;
        const users = this.profiles.filter(p => p.email == email);
        if (users.length > 0)
            user = users[0];
        return user;
    }
    findProfileByToken(token) {
        let user = undefined;
        const users = this.profiles.filter(p => p.idToken == token);
        if (users.length > 0)
            user = users[0];
        return user;
    }
    login(email, password) {
        let user = undefined;
        const found = this.profiles.filter(p => p.email == email && p.password == password);
        if (found.length > 0) {
            user = found[0];
        }
        return user;
    }
    profileExists(profile) {
        let exists = false;
        const users = this.profiles.filter(p => p.email == profile.email);
        if (users.length > 0)
            exists = true;
        return exists;
    }
    register(profile) {
        let code = 200;
        profile.idToken = `${new Date().getTime()}${Math.random() * 999999}`;
        const exists = this.profileExists(profile);
        if (!exists) {
            const user = profile;
            user.id = this.profiles.length + 1;
            this.profiles.push(user);
            code = 201;
        }
        else {
            code = 400;
        }
        return code;
    }
    registerFromGoogle(profile) {
        let code = 200;
        const exists = this.profiles.indexOf(profile);
        if (exists < 0) {
            const user = profile;
            user.id = this.profiles.length + 1;
            this.profiles.push(user);
            code = 201;
        }
        else {
            this.profiles[exists] = profile;
        }
        return code;
    }
}
exports.ProfileList = ProfileList;
//# sourceMappingURL=profile-list.js.map