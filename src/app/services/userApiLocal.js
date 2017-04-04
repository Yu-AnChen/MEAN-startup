class userApiLocalService {
    static get $inject() {
        return ['$resource','$http', '$window'];
    }
    constructor($resource, $http, $window) {
        this.$window = $window;
        this.storageKey = 'flowThroughUsers';
    }

    // local version for demo
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            let res = {};
            let usersJSON = this.$window.localStorage.getItem(this.storageKey);
            let users;
            let indexOfLoggedinUser;

            if (!usersJSON) {
                res.status = 401;
                return reject(res);
            }
            users = JSON.parse(usersJSON);
            if (!users.map) {
                res.status = 500;
                return reject(res);
            }
            indexOfLoggedinUser = users.findIndex(element => element.isSignedin);
            if (indexOfLoggedinUser == -1) {
                res.status = 401;
                return reject(res);
            }
            res.status = 200;
            res.data = users[indexOfLoggedinUser];
            return resolve(res);
        });
    }

    signup(user) {
        // this.$window.localStorage.setItem('flowThroughUser', user);
        return new Promise((resolve, reject) => {
            let res = {};
            let usersJSON = this.$window.localStorage.getItem(this.storageKey);
            let users;
            
            if (!usersJSON) {
                user.isSignedin = true;
                this.$window.localStorage.setItem(this.storageKey, JSON.stringify([user]));
                res.status = 200;
                res.data = user;
                return resolve(res);
            }
            users = JSON.parse(usersJSON);
            if (!users.map) {
                res.status = 500;
                return reject(res);
            }
            let emailExist = users.map(element => element.email)
                .includes(user.email);
            if (emailExist) {
                res.status = 403;
                res.data = 'email already exist';
                return reject(res);
            }
            user.isSignedin = true;
            users.push(user);
            this.$window.localStorage.setItem(this.storageKey, JSON.stringify(users));
            res.status = 200;
            res.data = user;
            return resolve(res);
        });
    }
    signin(user) {
        return new Promise((resolve, reject) => {
            let res = {};
            let usersJSON = this.$window.localStorage.getItem(this.storageKey);
            let users;
            let foundUser;
            let indexOfFoundUser;

            if (!usersJSON) {
                res.status = 404;
                return reject(res);
            }
            users = JSON.parse(usersJSON);
            if (!users.map) {
                res.status = 500;
                return reject(res);
            }
            foundUser = users.find(element => element.email == user.email);
            if (!foundUser) {
                res.status = 404;
                res.data = 'db.find:x,db.update:x';
                return reject(res);
            }
            indexOfFoundUser = users.findIndex(element => element.email == user.email);
            users.forEach((element, index) => {
                element.isSignedin = (index === indexOfFoundUser) ? true : false;
            });
            this.$window.localStorage.setItem(this.storageKey, JSON.stringify(users));
            res.status = 200;
            res.data = user;
            return resolve(res);
        });
    }
    signout(json) {
        return new Promise((resolve, reject) => {
            let res = {};
            let usersJSON = this.$window.localStorage.getItem(this.storageKey);
            let users;

            if (!usersJSON) {
                res.status = 404;
                return reject(res);
            }
            users = JSON.parse(usersJSON);
            if (!users.map) {
                res.status = 500;
                return reject(res);
            }
            users.forEach((element, index) => {
                element.isSignedin = false;
            });
            this.$window.localStorage.setItem(this.storageKey, JSON.stringify(users));
            res.status = 200;
            return resolve(res);
        });
    }
}

export default userApiLocalService;
