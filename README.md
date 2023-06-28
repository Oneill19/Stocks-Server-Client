<h1 align="center">Stocks Server Client App</h1>

<p align="center" width="100%">
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179540009-d72560a4-a0d9-4501-998b-9d1ddffa3512.svg" title="HTML5" width="75" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179540036-3ec09de3-b769-4b8c-9881-0165b3140960.svg" title="CSS3" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179608597-7d07727b-ec72-49ee-9d57-793d364dabfe.svg" title="JavaScript" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179540169-5ef02758-a7bc-437d-bf61-d9699c7e21d7.svg" title="Node.js" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/180653937-3fdf6a5a-ac5e-41fa-aa3b-ba3cdc41422f.svg" title="Express.js" width="70" height="60"/></a>
    <a href="#"><img align="center" src="https://user-images.githubusercontent.com/66797449/179544088-763e1c43-7aad-4749-a8c4-6692742508ee.svg" title="MongoDB" width="70" height="60"/></a>
</p>

## Table of Content

- [Table of Content](#table-of-content)
- [Description](#description)
- [Bootstrap Template](#bootstrap-template)
- [Usage](#usage)
- [Page Generation](#page-generation)
- [.env file](#env-file)
- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)

## Description
Stocks server client application made in server-client academic course.

In the app we use the [Alpha Vantage API](https://www.alphavantage.co/) to get the data about the stocks.

Some of the features of the app:
- login
- registration
- contact-us
- search stock symbols
- show stock chart
  - show last day chart
  - show monthly chart
  - show yearly chart
- show favorite stocks symbols

## Bootstrap Template

The application built using a bootstrap template: [startbootstrap-sb-admin-2](https://github.com/startbootstrap/startbootstrap-sb-admin-2)

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

Dont forget you .env file or the app won't work!

## Page Generation

This will generate the frontend and the backend to add a new page to the application.

**Frontend**: Generate a `html`, `css`, and `js` file from a template including all imports in the `html` file for `jQuery` and `Bootstrap`.

**Backend**: Generate a `controller` and a `router` file from a template including the basic page route.

**index.js**: Generate a link to the page `router.js` file.

For example, use the command:
```
npm run generate login
```

This command will create:
  - `login.html`, `login.css`, and `login.js` files in the `views` folder.
  - `login.controller.js`, `login.router.js` files in the `controllers` and `routes` folders.
  - add the route link to the new page in the `index.js` file.


## .env file
Create a file in the root folder named `.env`

```
# dotenv file example
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/stocks
API_KEY=YOUR_ALPHA_VANTAGE_API_KEY
ADMIN_EMAIL=YOUR_GMAIL_ADDRESS
ADMIN_PASSWORD=YOUR_GMAIL_PASSWORD_OR_KEY
```

## Technologies

### Frontend
- **HTML5** - Used to create the structure of the pages
- **CSS3** - Used to style the html pages to have a slick look
- **Bootstrap** - CSS framework that have pre-made components and make the design responsive
- **JavaScript** - The logic of our app, make http request, create charts and more
- **jQuery** - JavaScript library to ease the use of it

### Backend
- **Node.js** - JavaScript runtime for the backend
- **Express.js** - Javascript backend framework, to handle the request, get data from API, user logic and authetication

### Database
- **MongoDB** - NoSQL database to handle our users data
- **Mongoose** - Library to ease the use of MongoDB operations