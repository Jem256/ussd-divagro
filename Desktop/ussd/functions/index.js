const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const firebase = require('firebase/app');
// const { response } = require('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const firebaseConfig = {
//     apiKey: 'AIzaSyA7aCPCtCwbif9q12rPUDJflaRs0q89MzY',
//     authDomain: 'ussd-ded64.firebaseapp.com',
//     projectId: 'ussd-ded64',
//     storageBucket: 'ussd-ded64.appspot.com',
//     messagingSenderId: '123642048332',
//     appId: '1:123642048332:web:a9a8d081ca0faf04d829e9',
//     measurementId: 'G-T7PZCD030J',
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// appInit();
// function appInit() {
// }

app.post('/ussd', (req, res) => {
    // Read the variables sent via post api
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';
    let account = '';
    if (text === '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to Diva Gro. Select an option:
        1. Create Account
        2. Wallet 
        3. Savings 
        4. Loans
        `;
    } else if (text === '1') {
        // account = createRec();
        response = `CON Create Account
        1. Create Savings Account
        2. Create Loan Account
        `;
    } else if (text === '2') {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number
        2. Account balance`;
    } else if (text === '3') {
        // This is a terminal request. Note how we start the response with END
        response = `CON Select an action:
        1. Make Savings
        2. Savings balance
        3. Withdraw Savings
        `;
    } else if (text === '2*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC1001';

        // terminal
        response = `END Your account number is ${accountNumber}`;
    } else if (text === '2*2') {
        // Get data from db
        const balance = 'UGX 10,000';
        response = `END Your balance is ${balance}`;
    }

    res.set('Content-Type: text/plain');
    res.send(response);
});

exports.ussd = functions.https.onRequest(app);

// function createRec() {
//     db.collection('ussd')
//         .add({
//             firstName: 'Ada',
//             lastName: 'Lovelace',
//             phoneNumber: '0781234567',
//             balance: '0.00',
//             accountNumber: '123456789',
//             accountType: 'savings',
//         })
//         .then((docRef) => {
//             console.log('Document written with ID: ', docRef.id);
//             return docRef.id;
//         })
//         .catch((error) => {
//             console.error('Error adding document: ', error);
//         });

//     return (response = `END Account Created Successfully`);
// }

// function updateRec() {}

// function readRec() {}

// function deleteRec() {}
