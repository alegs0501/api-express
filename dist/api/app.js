"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const access_route_1 = require("./../routes/access-route");
require("reflect-metadata");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const config_1 = require("../config");
const routing_controllers_1 = require("routing-controllers");
const http = tslib_1.__importStar(require("http"));
const user_route_1 = require("../routes/user-route");
const request = tslib_1.__importStar(require("request"));
const accessRoute = new access_route_1.AccessRoute();
const userRoute = new user_route_1.UserRoute();
const baseDir = __dirname;
const expressApp = (0, express_1.default)();
const cors_1 = tslib_1.__importDefault(require("cors"));
// Handling the DependencyInjection across the entire application
(0, routing_controllers_1.useContainer)(typedi_1.default);
// Loads all the Controllers from the directories and provides the routing facility
(0, routing_controllers_1.useExpressServer)(expressApp, {
    routePrefix: config_1.ENV_CONFIG.app.apiRoot,
    defaultErrorHandler: false,
    controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
});
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
accessRoute.accessRoute(expressApp, request, bodyParser);
userRoute.userRoute(expressApp, request, bodyParser);
const server = http.createServer(expressApp);
server.listen(config_1.ENV_CONFIG.app.port, () => {
    console.log('Server', 'Application running on', `${config_1.ENV_CONFIG.app.hostname}:${config_1.ENV_CONFIG.app.port}`);
});
// Handling the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
    console.log('Server', 'unhandledRejectionError :', `${error}`);
});
//# sourceMappingURL=app.js.map