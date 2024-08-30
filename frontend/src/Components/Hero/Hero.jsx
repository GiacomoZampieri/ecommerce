import React from 'react'
import './Hero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className="hero">
        <div className="heroLeft">
            <div>
                <p>new</p>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="heroLatestButton">
                <Link to='/newcollections' style={{textDecoration:'none',color:'white',fontSize:'35px'}}>SCOPRI I NOSTRI PRODOTTI</Link>
                <FontAwesomeIcon icon={faArrowRight} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero