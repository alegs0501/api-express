"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRoute = void 0;
const profile_list_1 = require("./../classes/profile-list");
class AccessRoute {
    constructor() {
        this.profileList = profile_list_1.ProfileList.getInstance();
    }
    accessRoute(app, request, bodyParser) {
        app.use(bodyParser.json());
        app.route('/api/access/login/').post((req, res, next) => {
            if (req.body) {
                const response = this.profileList.login(req.body.email, req.body.password);
                res.send({ status: response != undefined ? 200 : 404, data: response, message: response != undefined ? 'registered successfuly' : 'credentials not found' });
            }
            else {
                res.send({ status: 400, message: 'bad request' });
            }
        });
        app.route('/api/access/signup/').post((req, res, next) => {
            if (req.body) {
                const response = this.profileList.register(req.body);
                res.send({ status: response, message: response == 201 ? 'registered successfuly' : 'user already exists' });
            }
            else {
                res.send({ status: 400, message: 'bad request' });
            }
        });
        app.route('/api/access/signupgoogle/').post((req, res, next) => {
            if (req.body) {
                const response = this.profileList.registerFromGoogle(req.body);
                res.send({ status: response, message: response == 201 ? 'registered successfuly' : 'unknown error' });
            }
            else {
                res.send({ status: 400, message: 'bad request' });
            }
        });
        app.route('/api/access/profile/').post((req, res, next) => {
            if (req.body) {
                const response = this.profileList.findProfileByToken(req.body.token);
                res.send({ status: response != undefined ? 200 : 404, data: response, message: response != undefined ? 'registered successfuly' : 'credentials not found' });
            }
            else {
                res.send({ status: 400, message: 'bad request' });
            }
        });
    }
}
exports.AccessRoute = AccessRoute;
//# sourceMappingURL=access-route.js.map