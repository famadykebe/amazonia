import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {isTogleActive,signOut} from '../store/action';
import {Link,withRouter} from 'react-router-dom';


const Header = (props) => {

 const [isToggle,setisToggle] = useState(true)

 const {isToggleProps,usersInfos} = props;

 useEffect(() => {

 },[])

  const isTogleActive = () => {
    setisToggle(!isToggle)
    props.isTogleActiveProps(isToggle)
    
  }

  const signOut = () => {
      props.history.push("/signin")
      props.signOutProps()
  }
    return (
    <header id="header">
        <div className="header-left">
          <div  onClick={() => isTogleActive()} id="toggle" className={isToggleProps ? 'on' : ''}><span></span></div>
            <Link to="/" className="brand">mangashop</Link>
        </div>
        <div className="header-right">
        
            <Link to="">Cart</Link>
            {usersInfos ? <span>{usersInfos.name} </span> : null}
            {!usersInfos ? (
                props.history.location.pathname === '/signin' ? <Link to="/register">Register</Link>:<Link to="/signin">Sign in</Link>
            ) : null}
            {usersInfos ? <button onClick={() => signOut()} className="sign-out">Sign out</button> : null}
            
        </div>
    </header>
    );
}

const mapStateToProps = (state) => {
    return{
        isToggleProps:state.isToggle,
        usersInfos:state.userSignin.usersInfos
    }
}


const mapDispatchToProps = (dispatch) => {

    return{
        isTogleActiveProps: (dataBolean) => dispatch(isTogleActive(dataBolean)),
        signOutProps : () => dispatch(signOut())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));