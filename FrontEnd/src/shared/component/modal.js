import React from "react";
import  ReactDOM  from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from './Backdrop';
import './modal.css'

const Modaloverlay = props => {
    
    const Content = (
        <div className={`modal  ${props.className}` } style={props.style}>
            <header className={`modal__header  ${props.headerClass}`}>
                <h2>{props.heading}</h2>
            </header>
        <form onSubmit= {
            props.onSubmit ? props.onSubmit : event =>event.preventDefault()} >
            <div className={`modal__content ${props.contentClass}`}>
            {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
        </form>

        </div>
    );
    // console.log(content);
    // console.log(document.getElementById('modal-hook'));
    return  ReactDOM.createPortal(Content, document.getElementById('backdrop-hook'));
}

const Modal = (props)=> {
   return( 
        <React.Fragment>
        {props.show && <Backdrop onClick = {props.onCancel}/>}
        <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        >
        <Modaloverlay {...props}/>

        </CSSTransition>
    </React.Fragment>)

    
}

export default Modal ;