import React from 'react';
import '../css/Display.css';
// importing components
import Navbar from '../components/Navbar';
import Wallpaper from '../components/Wallpaper';
import Menu from '../components/Menu';
import Songs from '../components/Songs';
import Music from '../components/Music.js';
import Settings from '../components/Settings';
import WheelColor from '../components/WheelColor';
import Playing from '../components/Playing';
import Themes from '../components/Themes'
import LockScreen from './LockScreen';


function Display(props) {
  const { active, menuItems, musicItems,songItems, playing, songIndex, audio, songUrl ,songImgUrl,wallpaper,wallpaperItems, noty,notifyText, settingNotification, currentMenu} = props;

  return (
    <div className='display' style={{backgroundImage:`url(${wallpaperItems[wallpaper]})`}}>

      {/* navbar component */}
        <Navbar
        noty={noty} playing={playing} notifyText={notifyText} settingNotification={settingNotification}
        />
        {currentMenu === -2 && <LockScreen/>}

        {currentMenu === -1 && <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />}

        {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}

          {/* only blank div */}
        {currentMenu === 2 && <div className="blank-div"><h1 className="empty-text">Games</h1></div>}

        {currentMenu === 3 && <Settings active={active}/>}

        {currentMenu === 4 && <Songs songItems={songItems} active={active} />}

        {/* only blank div */}
        {currentMenu === 5 && <div className="blank-div"><h1 className="empty-text">Artists</h1></div>}

        {/* only blank div */}
        {currentMenu === 6 && <div className="blank-div"><h1 className="empty-text">Albums</h1></div>}

        {(currentMenu === 0 ||currentMenu===7) &&
        // playing component
        <Playing songImgUrl={songImgUrl} audio={audio} songUrl={songUrl} playing={playing} songIndex={songIndex} songItems={songItems} />}

        {currentMenu===8&&<Themes active={active}/>}
        {currentMenu===9&&<WheelColor active={active}/>}
        {currentMenu===10&&<Wallpaper active={active}/>}
    </div>
  )
}

export default Display;