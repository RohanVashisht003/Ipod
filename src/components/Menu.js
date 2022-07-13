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
        <div className='ipod_name'>Ipod js</div>
          <ul>
            {menuItems.map((ele, index)=>{
              return active===index?<li key={index} className="active">{ele}</li>:
              <li key={index}>{ele}</li>  
          })} 
          </ul>
      </div>

      <div className="second-half">
          {active === 0 && <img className="second-half-img" src={songImgUrl} alt="songImageNotFound"></img>}
          {active === 1 && <img className="second-half-img" src={music} alt="MusicImageNotFound"></img>}
          {active === 2 && <img className="second-half-img" src={game} alt="GameImageNotFound"></img>}
          {active === 3 && <img className="second-half-img" src={settings} alt="settingsImageNotFound"></img>}
      </div>
    </div>
  )
}

export default Menu