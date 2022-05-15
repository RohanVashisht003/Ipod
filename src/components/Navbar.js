import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import battery from '../static/images/battery.png';
import SignalWifi4BarLockIcon from '@mui/icons-material/SignalWifi4BarLock';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function Navbar(props) {
  const{playing, noty, notifyText, settingNoty} = props;
  
  var stateId="";
  let dateFunc = new Date();
  let hour = dateFunc.getHours().toString();
  let minute = dateFunc.getMinutes().toString();
  let time = hour+":"+minute;
  const[currentTime, setCurrentTime] = useState(time);

  
  // updating time
  const updateTime = ()=>{
    let dateFunc = new Date();
    let hour = dateFunc.getHours().toString();
    let minute = dateFunc.getMinutes().toString();
    let time = hour+":"+minute;
    console.log(time);
    setCurrentTime(time);
  }

  setInterval(updateTime,1000);

  useEffect(()=>{
    if(noty===true){
      return;
    }
    stateId = setInterval(updateTime,60000);
  },[])

  useEffect(()=>{
    if(noty===true){
      setTimeout(function(){
        settingNoty();
      },1000)
    }
  })

  useEffect(()=>{
    if(noty!==true){
      clearInterval(stateId);
    }
  },[])

  return (
    <div className='bar'>
      {<h5 className='heading'>iPod
      <SignalWifi4BarLockIcon style={{fontSize:17, marginLeft:4}}></SignalWifi4BarLockIcon></h5>}
      {noty===true && <h5 className='notification'>{notifyText}</h5>}
      {noty===false && <h5 className='time'>{currentTime}</h5>}
      {<div className="right-nav-container">
          {playing ? <h5 className='play-pause-nav'><PlayArrowIcon></PlayArrowIcon></h5>:
           <h5 className='play-pause-nav'><PauseIcon></PauseIcon></h5>}
          <img className="battery" src={battery} alt="Battery"/>
      </div>}
    </div>
  )

    }
export default Navbar;