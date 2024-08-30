import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart'
import Payment from './Pages/Payment';
import LoginSignup from './Pages/LoginSignup'
import Greetings from './Pages/Greetings';
import Novita from './Pages/Novita'
import Admin from './Pages/Admin'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/newcollections' element={<Novita />} />
          <Route path='/mens' element={<ShopCategory category="uomo"/>} />
          <Route path='/womens' element={<ShopCategory category="donna"/>} />
          <Route path='/kids' element={<ShopCategory category="bambino"/>} />
          <Route path='/product' element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/greetings' element={<Greetings />} />
          <Route path='/admin/*' element={<Admin />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;