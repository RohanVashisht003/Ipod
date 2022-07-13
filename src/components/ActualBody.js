import React from 'react';
import '../css/ActualBody.css';
import Display from './Display.js';
import Wheel from './Wheel.js';

function ActualBody(props) {
  const{active, menuItems, musicItems, playPauseToggle, songItems, playing, songIndex, theme, audio, songUrl, songImgUrl, fastForward, fastBackward, wheelColor, wallpaper, wallpaperItems, noty, notifyText, settingNotification, currentMenu, menuChangeForward, menuChangeBackward,updateMenu} = props;
  
  return (
    <div className='actualbody-container'>
        <div className='actualbody' style={{backgroundColor:theme}}>
            {/* Display Component */}
            <Display
              songIndex={songIndex} playing={playing} active={active} musicItems={musicItems} songItems={songItems} audio={audio} songUrl = {songUrl} songImgUrl={songImgUrl} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} notifyText={notifyText} settingNotification={settingNotification} currentMenu={currentMenu} menuItems = {menuItems}
            />
            {/* wheel component */}
            <Wheel
              theme={theme} active={active} menuItems={menuItems} fastForward = {fastForward} fastBackward = {fastBackward} wheelColor={wheelColor} playPauseToggle= {playPauseToggle} currentMenu={currentMenu} menuChangeForward ={menuChangeForward} updateMenu={updateMenu} menuChangeBackward = {menuChangeBackward}
            />
        </div>
    </div>
  )
}

export default ActualBody;