import React,{useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Nav from './components/Nav';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import Signinscreen from './pages/SigninScreen';
import RegisterScreen from './pages//RegisterScreen';
import Product from './pages/Product';


const App = (props) => {

  const [isToggle,setisToggle] = useState(false);

  const isTogleActiveApp = (bolean) => {
    setisToggle(bolean)
  }
  


  return(
    <Router>
    <Header isToggleProps={isToggle} isTogleActiveApp={(boolean) => isTogleActiveApp(boolean)}  />
    <Nav isToggleProps={isToggle}/>
    <main role="main" className="main">
          
              <Switch>
                <Route path="/" exact={true} component={(props) => <HomeScreen {...props} />}></Route>
                <Route path="/cart/:id" component={CartScreen}></Route>
                <Route path="/product/:id"  component={ProductScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/signin" component={Signinscreen}/>
                <Route path="/product" component={Product}></Route>
              </Switch>
    </main>

    <footer id="footer">
      <p>All right reserved.</p>
    </footer>
  </Router>
  )
}


export default connect(null,null)(App);
