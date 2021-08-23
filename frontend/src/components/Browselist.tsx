import React from 'react'
import { Link } from 'react-router-dom'

const Browselist: React.FC = () => {
    return (
        <div className='container'>
            <Link to='/Favourites'>
                <div className='list'>
                    <div id='Favourties'></div>
                    <p>Favourties</p>
            </div>
            </Link>
            
            <Link to='Planingtowatch'>
                <div className='list'>
                    <div id='planing-to-watch'></div>
                    <p>Planing to Watch</p>
                </div>
            </Link>

            <Link to='Watching'>
                <div className='list'>
                    <div id='watching'></div>
                    <p>Watching</p>
                </div>
            </Link>

            <Link to='Completed'>
                <div className='list'>
                    <div id='completed'></div>
                    <p>Completed</p>
                </div>   
            </Link>         
           
        </div>
    )
}

export default Browselist
