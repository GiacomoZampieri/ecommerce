import './Sidebar.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartPlus, faList} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/admin/addproduct'} style={{textDecoration:"none"}}> 
        <div className="sidebarItem">
          <FontAwesomeIcon icon={faCartPlus} className='sidebarIcon'/>
          <p>AGGIUNGI PRODOTTO</p>
        </div>
      </Link>
      <Link to={'/admin/showproducts'} style={{textDecoration:"none"}}> 
        <div className="sidebarItem">
          <FontAwesomeIcon icon={faList} className='sidebarIcon'/>
          <p>LISTA PRODOTTI</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar;