import React,{useState,useRef,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {register} from '../store/action';
import {connect} from 'react-redux'

const RegisterScreen = (props) => {

    //props

    const {proPsregister,usersInfos,emailExiste} = props;

    const [name,setname] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const champPassword = useRef(null);

    const [errorsForm,seterrorsForm] = useState({})

    useEffect(() => {
        console.log('emailExiste man -->',emailExiste)
        if(usersInfos !== null){
            props.history.push("/")
        }
    },[usersInfos])

    const submitHandler = (e) => {
        e.preventDefault();
        let errors = {}

        if(name == undefined || !name.trim('')){
            errors.name = 'le nom est incorrect';
            seterrorsForm(errors)
        }else{
            errors.name = '';
            seterrorsForm(errors)
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            errors.email = 'le email est incorrect';
            seterrorsForm(errors)
        }else{
            errors.email = '';
            seterrorsForm(errors)
        }

        if(!password || password == undefined){
            errors.password = 'le password est incorrect';
            seterrorsForm(errors);
           
        }else{
            errors.password = '';
            seterrorsForm(errors)
            console.log(errors.password.length)
        }

        if(errors.name.length === 0 && errors.email.length === 0 && errors.password.length === 0){
            proPsregister(name,email,password)
        }
    }

    const handleCheckPassword = (e) => {
        if(e.target.checked){
            champPassword.current.type = 'text';
        }else{
            champPassword.current.type = 'password';
        }
    }

    return (
        <div>
            <form onSubmit={(e) => submitHandler(e)}>
                    <div className="form-container">
                        <h2 className="title-signin">Register</h2>
                        <br/>

                        <p></p>

                        <div className="form-group">
                            <label htmlFor="name">Name :</label>
                            <input className="form-input" type="text" name="name" id="name" onChange={(e) => setname(e.target.value) }/>
                            {errorsForm.name && <p className="error-message-register">{errorsForm.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email :</label>
                            <input className="form-input" type="email" name="email" id="email" onChange={(e) => setemail(e.target.value) }/>
                            {errorsForm.email && <p className="error-message-register">{errorsForm.email}</p>}
                            {emailExiste ? <p className="error-message-register">{emailExiste}</p> : null}
                        </div>
                        <div className="form-group form-group-password">
                            <label htmlFor="email">Password :</label>
                            <input className="form-input" type="password" name="password" ref={champPassword} id="password" onChange={(e) => setpassword(e.target.value) }/>
                            <span className="check-password">
                                <input type="checkbox" title="Afficher le mot de passe" onChange={(e) => handleCheckPassword(e)}/>
                            </span>
                            {errorsForm.password && <p className="error-message-register">{errorsForm.password}</p>}
                        </div>

                        <button className="button primary" type="btn">Register</button>

                        <Link className="button button-create-acount register-btn-acount" to={'/signin'}>Already have an account Amazonia ?</Link>
                    </div>
                </form>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        usersInfos:state.userSignin.usersInfos,
        emailExiste:state.userSignin.emailExiste
    }
} 

const mapDisptachToProps = (dispatch) => {
    return {
        proPsregister : (name,email,password) => dispatch(register(name,email,password))
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(RegisterScreen)
