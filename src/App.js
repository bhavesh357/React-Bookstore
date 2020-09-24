import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/Pages/SignIn';
import SignUp from './Components/Pages/SignUp';
import Dashboard from './Components/Pages/Dashboard';
import Cart from './Components/Pages/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn}></Route>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
          <Route path='/cart' exact component={Cart}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
