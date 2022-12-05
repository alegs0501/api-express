"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserList = void 0;
class UserList {
    constructor() {
        this.users = [
            {
                id: 1,
                name: "Jhon Doe",
                email: "jhondoe@email.com",
                job: "front end developer"
            },
            {
                id: 2,
                name: "Chuck Bartowski",
                email: "chuck@email.com",
                job: "front end developer"
            },
            {
                id: 3,
                name: "Morgan Grimes",
                email: "mg@email.com",
                job: "front end developer"
            },
            {
                id: 4,
                name: "Ellie Woodcomb",
                email: "ewoodcomb@email.com",
                job: "CTO"
            },
            {
                id: 5,
                name: "Anna Wu",
                email: "annawu@email.com",
                job: "back end developer"
            },
            {
                id: 6,
                name: "Sarah Walker",
                email: "swalker@email.com",
                job: "back end developer"
            },
            {
                id: 7,
                name: "Bryce Larkin",
                email: "bryce@email.com",
                job: "back end developer"
            },
            {
                id: 8,
                name: "Devon Woodcomb",
                email: "dw@email.com",
                job: "back end developer"
            },
            {
                id: 9,
                name: "john Casey",
                email: "caseyjhon@email.com",
                job: "back end developer"
            }
        ];
    }
    static getInstance() {
        if (!UserList.instance) {
            UserList.instance = new UserList();
        }
        return UserList.instance;
    }
    getUser(id) {
        let user = undefined;
        const users = this.users.filter(x => x.id == id);
        if (users.length > 0) {
            user = users[0];
        }
        return user;
    }
    createUser(name, email, job) {
        let response = 201;
        const users = this.users.filter(user => user.name == name || user.email == email);
        if (users.length > 0) {
            response = 400;
        }
        else {
            const user = {
                id: this.users.length + 1,
                name,
                email,
                job
            };
            this.users.push(user);
        }
        return response;
    }
    updateUser(user) {
        let response = 200;
        if (user) {
            const index = this.users.findIndex(item => item.id == user.id);
            if (index != -1) {
                this.users[index] = user;
            }
            else {
                response = 404;
            }
        }
        else {
            response = 400;
        }
        return response;
    }
    getUsers(page, limit) {
        const from = (page - 1) * limit;
        const to = from + limit;
        const usersPage = {
            page: page,
            book: Math.ceil(this.users.length / limit),
            users: this.getUsersRange(from, to)
        };
        return usersPage;
    }
    getUsersRange(from, to) {
        const response = [];
        let counter = from;
        const length = this.users.length;
        if (counter >= 0) {
            while (counter < to && counter < length) {
                response.push(this.users[counter]);
                counter++;
            }
        }
        return response;
    }
}
exports.UserList = UserList;
//# sourceMappingURL=user-list.js.map