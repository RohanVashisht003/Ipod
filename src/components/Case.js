import React from 'react';
import '../css/Case.css';
import Display from './Display.js';
import Wheel from './Wheel';

function Case(props) {
  const{active, menuItems, musicItems, playPauseToggle, songItems, playing, songIndex, theme, audio, songUrl, songImgUrl, fastForward, fastBackward, wheelColor, wallpaper, wallpaperItems, noty, notifyText, settingNoty, currentMenu, menuChangeForward, menuChangeBackward,updateMenu} = props;
  
  return (
    <div className='case-container'>
        <div className='case' style={{backgroundColor:theme}}>
            {/* Display Component */}
            <Display
              songIndex={songIndex} playing={playing} active={active} musicItems={musicItems} songItems={songItems} audio={audio} songUrl = {songUrl} songImgUrl={songImgUrl} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} notifyText={notifyText} settingNoty={settingNoty} currentMenu={currentMenu} menuItems = {menuItems}
            />
            <Wheel
              theme={theme} active={active} menuItems={menuItems} fastForward = {fastForward} fastBackward = {fastBackward} wheelColor={wheelColor} playPauseToggle= {playPauseToggle} currentMenu={currentMenu} menuChangeForward ={menuChangeForward} updateMenu={updateMenu} menuChangeBackward = {menuChangeBackward}
            />
        </div>
    </div>
  )
}

export default Case;