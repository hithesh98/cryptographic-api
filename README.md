# Cryptographic RESTful API

This API allows you to perform basic cryptographic functions.

## Execution
Endpoints are exposed at the URL: [https://cryptographic-api.herokuapp.com/](https://cryptographic-api.herokuapp.com/)

Alternatively, the program can be run locally. To start the application, clone the repo and type the following commands:
```javascript
    npm install
    npm start
```
## Reference
This API exposes four endpoints.

#### **POST** /encrypt
Takes a JSON payload and encrypts every value in the object at a depth of 1. The encrypted message is sent back in JSON response.

#### **POST** /decrypt
Takes a JSON payload, detects encrypted strings and decrypts them. The encrypted message is sent back in JSON response.

#### **POST** /sign
Takes a JSON payload and computes a cryptographic signature for the plaintext payload. The signature is then sent in JSON response.

#### **POST** /verify
Takes a JSON payload of the form :
```javascript
    {
        "signature": <COMPUTED_SIGNATURE>,
        "data": {...}
    }
```
The data can be any JSON object and can contain encrypted fields. Any encrypted fields in the data will be decrypted before computing it's signature. If this signature matches the given signature the response will be 204, else 400. 
