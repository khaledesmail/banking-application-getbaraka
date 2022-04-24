# banking-application-getbaraka

We would like you to create a banking application that supports the following operations via API
● Creation of account
● Deletion of account
● Money deposit
● Money withdrawal
● Money transfer
● International transfer
● Getting the balance
● List of accounts

---
## Requirements

For development, you will need to install Node.js, node global package npm and MongoDb in your environement.

### A top-level directory layout
 ``` bash.
    ├── diagrams                  #  Have documentation files
    ├── src                       # Source files 
        ├── api                 
            ├── controller              #  Used in applying validations and calling servcie
            ├── middlewares             #  Auth and schema  validation layer
            ├── routes.js  
        ├── config               # Configration 
        ├── model                # DataBase Models (MongoDB)
        ├── service              # Have the logic
        ├── utilit              
        ├── app.js
    ├── README.md
    ├── server.js                #  Runing thre server
```
---
## Prerequisites
### Doker
 - #### You can ignore install node.js and mongo if you have docker and need to run the project using it.

      Just go on [official Docker website](https://www.docker.com/get-started/) and download the installer.
### Node
- #### Node installation on Windows in case you need to run the project locally.

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0
    
### MongoDB
 - #### MongoDb installation on Windows in case you need to run the project locally.

  Just go on [official MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) and download the installer.

---

## Install
    $ git clone https://github.com/khaledesmail/banking-application-getbaraka.git
    $ cd banking-application-getbaraka
    
## Running the project using docker-compose

    $ cd banking-application-getbaraka
    Make sure you are in the project directory
    
    $ docker build -t baraka-app .
    $ docker-compose up

---
## Sample requests of APIs

1- /signup
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/account/signup' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--data-raw '{
 "firstName": "Khaled",
 "lastName": "Esmail",
 "email": "kh@gmail.com",
 "password": "12345678"
}'
```
2- /signin
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/account/signin' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--data-raw '{
        "email": "kh@gmail.com",
        "password": "12345678"
}'
```
3- /deposit
Make sure that you are using a correct accountId.
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/acount/money/deposit/62637abf027e5925146f0494' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODMwNzAuNDM2LCJleHAiOjE2NTA3NzMwNzAuNDM2LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM2NzNjNjRmM2ViMDcyNGUxZTFkMSJ9.rEovjfL-w1aWP9-otmyLzaP9l4Uej3_12fTpcsDqlXU' \
--data-raw '{
      "money": 100
}'
```
4- /withdraw
Make sure that you are using a correct accountId.
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/acount/money/withdraw/6263673c64f3eb0724e1e1d1' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODMwNzAuNDM2LCJleHAiOjE2NTA3NzMwNzAuNDM2LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM2NzNjNjRmM2ViMDcyNGUxZTFkMSJ9.rEovjfL-w1aWP9-otmyLzaP9l4Uej3_12fTpcsDqlXU' \
--data-raw '{
      "money": 6
}'
```
5- /transfer
Make sure that you are using a correct accountId and targetAccountId.
```bash
curl --location --request POST 'localhost:8080/rest/api/v1/acount/money/transfer/62637abf027e5925146f0494' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODMwNzAuNDM2LCJleHAiOjE2NTA3NzMwNzAuNDM2LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM2NzNjNjRmM2ViMDcyNGUxZTFkMSJ9.rEovjfL-w1aWP9-otmyLzaP9l4Uej3_12fTpcsDqlXU' \
--data-raw '{

    "targetAccountId": "6264a2873d08f24dec1196ed",
      "money": 20
}'
```
6- /balance
Get balance, Make sure that you are using a correct accountId.
```bash
curl --location --request GET 'localhost:8080/rest/api/v1/account/balance/6264a2873d08f24dec1196ed' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODMwNzAuNDM2LCJleHAiOjE2NTA3NzMwNzAuNDM2LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM2NzNjNjRmM2ViMDcyNGUxZTFkMSJ9.rEovjfL-w1aWP9-otmyLzaP9l4Uej3_12fTpcsDqlXU'
```
7- /accounts
Get all accounts.
```bash
curl --location --request GET 'localhost:8080/rest/api/v1/account' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODY2NjQuMjE0LCJleHAiOjE2NTA3NzY2NjQuMjE0LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM3YWJmMDI3ZTU5MjUxNDZmMDQ5NCJ9.CtJSkBsovyCJ8JTHsdIKVfWb5yRxXvxDtRx-XqSNw8g'
```
8- /account
Delete an account, Make sure that you are using a correct accountId.
```bash
curl --location --request DELETE 'localhost:8080/rest/api/v1/account/263673c64f3eb0724e1e1d1' \
--header 'Content-Type: application/json' \
--header 'correlationid: 9d4565448f269aaa3d663dd2ee3c27aa' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA2ODMwNzAuNDM2LCJleHAiOjE2NTA3NzMwNzAuNDM2LCJlbWFpbCI6ImtoYWxlZEBnbWFpbC5jb20iLCJuYW1lIjoia2hhbGVkIGVzbWFpbCIsImFjY291bnRJZCI6IjYyNjM2NzNjNjRmM2ViMDcyNGUxZTFkMSJ9.rEovjfL-w1aWP9-otmyLzaP9l4Uej3_12fTpcsDqlXU' \
--data-raw '{
      "money": "78"
}'
```