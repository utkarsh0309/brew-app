import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    position: fixed; /* Stay in place */
    z-index: 51; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

/* Modal Content */
const Modalcontent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 25%;
    text-align:centre;
`

/* The Close Button */
const Close = styled.div`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    };
    &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`

const Submit = styled.button``

export const DialogBox = (props) => (
    <Modal>
        <Modalcontent>
            <Close onClick={() => props.closeDialog()}>&times;</Close>
            <br/>
            {
                props.children
            }   
        </Modalcontent>
    </Modal>
    
)