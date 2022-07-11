import React from "react";
import styled from "styled-components";

const Message = styled.strong`
    display: block;
    color: #eb5757;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 6px;
`;

function WarningMessage(props) {
    return <Message className={props.className}>{props.children}</Message>;
}

export default WarningMessage;
