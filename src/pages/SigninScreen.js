// @flow 
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin} from '../store/action'


const SigninScreen = (props) => {

    const [password,setpassword] = useState('');
    const [email,setemail] = useState('');

    const {propsSignin,loading,userSigninError,usersInfos} = props;

    
    const submitHandler = (e) => {
        e.preventDefault();
        propsSignin(email,password);
    }

    useEffect(() => {
        if(usersInfos){
            props.history.push("/")
        }
    },[usersInfos])

    return (
        <div>
           
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-container">
                    <h2 className="title-signin">Login</h2>

                    {userSigninError && <p class="error-message">{userSigninError}</p>}
                    
                    <br/>

                    <p></p>

                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input className="form-input" type="email" name="email" id="email" onChange={(e) => setemail(e.target.value) }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password :</label>
                        <input className="form-input" type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value) }/>
                    </div>

                    <button className="button primary" type="btn">Submit</button>

                    <p className="text-new-signin">New to amaeona ?</p>

                    <Link className="button button-create-acount" to={'/register'}>Create your amazona account</Link>
                </div>
            </form>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => {

    return {
        propsSignin: (email,password) => dispatch(signin(email,password)) 
    }
}

const mapStateToProps = (state) => {
    return{
        loading:state.userSignin.userLoading,
        userSigninError:state.userSignin.userSigninError,
        usersInfos:state.userSignin.usersInfos
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SigninScreen) 