import React from "react";

const Error = ({ message }) => {
    return message ? <div style={{ color: "red", marginBottom: "10px" }}>{message}</div> : null;
};

export default Error;
