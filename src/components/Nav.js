import React,{useState} from 'react';
import {connect} from 'react-redux';

const Nav = (props) => {

    const {isTogleActiveProps} = props

    return(
        // className={activeSodeBar ? 'activeSidebar' : ''}
        <nav className={isTogleActiveProps ? 'menu-sidbare menu-sidbareActive' : 'menu-sidbare' }>
            <div className="header-nav">
                <h3>Shopping Categories</h3>
                
            </div>
            <ul>
                <li><a href="">Pants</a></li>
                <li><a href="">Shirts</a></li>
            </ul>   
        </nav>
    );
}

const mapStateToProps = (state) => {

    return {
        isTogleActiveProps:state.ProducstList.isToggle
    }
}


export default connect(mapStateToProps,null)(Nav);