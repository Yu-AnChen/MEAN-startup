# Features
1. Component style Angular 1.5.x (like ng2)  
2. Template for Angular modules and components  
3. webpack

# GetStarted
### Install NPM
```
npm run global && npm install
```
### BackEnd Development
```
touch .env.file

    PORT=3000
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost/myDB
    MONGOLAB_URI=mongodb://localhost/myDB
```
### FrontEnd only
```
npm run dev:front:only
```
### FrontEnd with RestApi
```
npm run dev:front
```
### BackEnd
```
npm run dev:back
```
### Production
```
npm run dist:front
```
[demo](http://abstract-submission-yuan12.c9users.io:8080/)