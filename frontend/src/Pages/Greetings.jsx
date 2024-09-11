import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import './CSS/Greetings.css'

const Greetings = () => {

  const username = localStorage.getItem('username');

  return (
    <div className='greetings'>
      <p className='greetingsText'>
        Grazie per l'acquisto <span>{username}</span> <FontAwesomeIcon className="successIcon" icon={faCircleCheck}/>
      </p>
      <p className='greetingsText'>
        Ti è arrivata una mail di conferma dell'acquisto
      </p>
      <p className='greetingsText'>
        Se vuoi continuare ad acquistare sul sito clicca qui: <Link to='/' style={{color:'black'}}>continua con gli acquisti</Link>
      </p>
    </div>
  )
}

export default Greetings