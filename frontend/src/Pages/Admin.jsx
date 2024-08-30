import './CSS/Admin.css'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import ShowProducts from './ShowProducts';
import AddProducts from './AddProducts';

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
          <Route path='addproduct' element={<AddProducts />} />
          <Route path='showproducts' element={<ShowProducts />} />
        </Routes>
    </div>
  )
}

export default Admin