# Exercise 3
This repository contains the website for the third exercise in the course Advanced programming 2

# Requirements
In order to run this project you need to have node.js and mongoDB installed on your computer, which you can get in https://nodejs.org/en/download https://www.mongodb.com/try/download/community


# How to open
The first thing that you will need to do, is cloning this repo:

```bash
git clone https://github.com/ShalevWen/AP2_Ex1b.git
```

The next step will be to setup the server:
```bash
cd AP2_Ex2/server
npm install
```

Now start the server:

```bash
npm start
```

Now you can enter the client through http://localhost:3030

# Open with another server
In order to use the client with another server (or to run it seperatly from our server), follow this steps:

## 1. Set up the client
Run the folloing commands from the root directory of the repo:
```bash
cd whatsdawn
npm install
```
## 2. Choose a server
in [App.js](whatsdawn/src/App.js) line 8, enter the origin url of your server
## 3. Run the client
```bash
npm start
```