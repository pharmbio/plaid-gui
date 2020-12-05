import React, { useState } from "react";
const axios = require('axios')

async function handshake() {
    await axios.get('http://localhost:5000/plaid').then(function (response) {
    }).catch(function (error) {
    console.log(error);
    }).then(function(response){
        console.log(response);
    });
}

const HomePage = () => {
    console.log("Here")
    return (<button onClick={handshake} />)
}

export default HomePage