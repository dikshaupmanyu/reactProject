import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Product from './components/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Update from './components/Update';

function App() {
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route path='/' element={ <SignUp />} />
        <Route path='/signin' element={ <SignIn />} />
        <Route path='/home' element={ <Home />} />
        <Route path='/product' element={ <Product />} />
        <Route path='/product/:id' element={ <Update />} />
      </Routes>
     
    </>
  );
}

export default App;
