import React from 'react';
import '../css/Menu.css';
import game from '../static/images/game.jpg';
import music from '../static/images/music.jpg';
import settings from '../static/images/settings.png';

function Menu(props) {
    const{active, menuItems, songImgUrl} = props;
  return (
    <div className='menu-container'>
        <div className='menu'>
            <ul>
               {menuItems.map((ele, index)=>{
                 return active===index?<li key={index} className="active">&nbsp;{ele}</li>:
                 <li key={index}>&nbsp;{ele}</li>  
               })} 
            </ul>
        </div>

        <div className="leaf">
                    {active === 0 && <img className="leaf-img" src={songImgUrl} alt=""></img>}
                    {active === 1 && <img className="leaf-img" src={music} alt=""></img>}
                    {active === 2 && <img className="leaf-img" src={game} alt=""></img>}
                    {active === 3 && <img className="leaf-img" src={settings} alt=""></img>}
        </div>
    </div>
  )
}

export default Menu