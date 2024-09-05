import './Navbar.css'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import logo from '../Assets/logo.png'

const Navbar = () => {

  // eslint-disable-next-line no-unused-vars
  const [menu,setMenu] = useState("shop");

  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className="navbar">
        <div className="navbarLogo">
            <img src={logo} alt="" />
        </div>
        <ul className="navbarMenu">
            <li onClick={() => setMenu("shop")}><Link style={{textDecoration:'none',color:'black'}} to='/'>HOME</Link></li>
            <li onClick={() => setMenu("mens")}><Link style={{textDecoration:'none',color:'black'}} to='/newcollections'>NOVITA'</Link></li>
            <li onClick={() => setMenu("mens")}><Link style={{textDecoration:'none',color:'black'}} to='/man'>UOMO</Link></li>
            <li onClick={() => setMenu("womens")}><Link style={{textDecoration:'none',color:'black'}} to='/woman'>DONNA</Link></li>
            <li onClick={() => setMenu("kids")}><Link style={{textDecoration:'none',color:'black'}} to='/kid'>BAMBINO</Link></li>
        </ul>
        <div className="navbarLoginCart">
            {localStorage.getItem('auth-token') 
            ? <button className="LoginLogout" onClick={() => {localStorage.clear();window.location.replace("/")}}>Logout</button> 
            : <Link to='/login'><button className="LoginLogout">Login</button></Link>}
            <Link to='/cart'><FontAwesomeIcon  className='navLoginCartIcon' icon={faCartShopping} alt="" /></Link>
            <div className="navbarCartCount">{getTotalCartItems()}</div>
            {localStorage.getItem('username') === 'admin' ? <Link to='/admin' style={{color:'black'}}><FontAwesomeIcon icon={faScrewdriverWrench} className='adminIcon'/></Link> : <></>}
        </div>
    </div>
  )
}

export default Navbar