<h1 align="center">Stocks Server Client App</h1>

<p align="center" width="100%">
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179608597-7d07727b-ec72-49ee-9d57-793d364dabfe.svg" title="JavaScript" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179540169-5ef02758-a7bc-437d-bf61-d9699c7e21d7.svg" title="Node.js" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/180653937-3fdf6a5a-ac5e-41fa-aa3b-ba3cdc41422f.svg" title="Express.js" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179544088-763e1c43-7aad-4749-a8c4-6692742508ee.svg" title="MongoDB" width="70" height="60"/></a>
</p>

## Table of Content

- [Table of Content](#table-of-content)
- [Description](#description)
- [Usage](#usage)
- [File Generation](#file-generation)
- [.env file](#env-file)

## Description
Stocks server client application made in server-client academic course.

Some of the features of the app:
- login
- registration
- contact-us
- show stocks
- show favorite stocks
- show stock chart

## Usage

Clone the repository:
```
git clone https://github.com/Oneill19/Stocks-Server-Client.git
```

Install Dependencies:
```
npm i
```

To start the app:
```
npm start
```

To start the app in developer mode with hot reload:
```
npm run dev
```

## File Generation

There is an option to generate a `html`, `css`, and `js` file from a template including all imports in the `html` file for `jQuery` and `Bootstrap`.

For example, use the command:
```
npm run gn login
```

This command will create `login.html`, `login.css`, and `login.js` files in the `views` folder.

## .env file
Create a file in the root folder named `.env`

```
# dotenv file example
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/stocks
```