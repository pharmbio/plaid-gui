import React, { useState } from "react";
const axios = require('axios')

async function handshake() {
    console.log("Data sent")
    await axios.get('http://localhost:5000/plaid').then(function (response) {
    console.log(response);
    }).catch(function (error) {
    console.log(error);
    }).then(function(){
    console.log("success");
    });
}

const HomePage = () => {
    console.log("Here")
    return (<button onClick={handshake} />)
}

export default HomePage