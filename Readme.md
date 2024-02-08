# WhatsApp Web Application Clone

This project is a clone of the WhatsApp Web application, aiming to replicate the familiar and user-friendly interface of WhatsApp on the web. The clone is divided into two main components: the frontend and the backend.

## Frontend

### Description

The frontend is developed using React, providing a responsive and dynamic user interface. It utilizes various dependencies for testing, styling, state management, and more to create a seamless user experience similar to the official WhatsApp Web.

### Dependencies

- **@testing-library/jest-dom**: ^5.17.0
- **@testing-library/react**: ^13.4.0
- **@testing-library/user-event**: ^13.5.0
- **bootstrap**: ^5.3.2
- **react**: ^18.2.0
- **react-cookie**: ^7.0.0
- **react-dom**: ^18.2.0
- **react-icons**: ^4.12.0
- **react-redux**: ^9.0.4
- **react-router-dom**: ^6.21.1
- **react-scripts**: 5.0.1
- **react-toastify**: ^9.1.3
- **redux**: ^5.0.1
- **socket.io-client**: ^4.7.3

### Scripts

- **start**: `react-scripts start`
- **build**: `react-scripts build`
- **test**: `react-scripts test`
- **eject**: `react-scripts eject`

### ESLint Configuration

- Extends: "react-app", "react-app/jest"

### Browserslist Configuration

#### Production

- >0.2%
- not dead
- not op_mini all

#### Development

- last 1 chrome version
- last 1 firefox version
- last 1 safari version

## Backend

### Description

The backend part of the project is built using Express and includes various dependencies for handling cookies, enabling CORS, logging, working with MongoDB, authentication, and more. Nodemon is utilized for automatic server restarts upon code changes during development.

### Dependencies

- **cookie-parser**: ~1.4.4
- **cors**: ^2.8.5
- **debug**: ~2.6.9
- **ejs**: ~2.6.1
- **express**: ~4.16.1
- **express-session**: ^1.17.3
- **http-errors**: ~1.6.3
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.0.3
- **morgan**: ~1.9.1
- **multer**: ^1.4.5-lts.1
- **random-otp-generator**: ^2.0.1
- **socket.io**: ^4.7.3

### Scripts

- **start**: `nodemon ./bin/www`

### Important Note

In order to start the backend server during development, make sure to have **nodemon** installed globally. If not, you can install it using:

```bash
npm install -g nodemon
