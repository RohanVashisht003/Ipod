import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
// wifi icon
import { AiOutlineWifi } from "react-icons/ai";
// battery icon
import battery from '../static/images/battery.png';

function Navbar(props) {
  const{noty, notifyText, settingNotification} = props;
  
  // date 
  let dateFunc = new Date();
  // hours
  let hour = dateFunc.getHours().toString();
  // minutes
  let minute = dateFunc.getMinutes().toString();
  // combining hours and minutes
  let time = hour+":"+minute;

  // state for setting the current time
  const[currentTime, setCurrentTime] = useState(time);

  
  // updating time
  const updateTime = ()=>{
    let dateFunc = new Date();
    let hour = dateFunc.getHours().toString();
    let minute = dateFunc.getMinutes().toString();
    let time = hour+":"+minute;
    if(minute%60 < 10){
      time = hour+":0"+minute;
    }
    
    setCurrentTime(time);
  }

  // updating time after every 1 sec.
  setInterval(updateTime,1000);

// setting notification
  useEffect(()=>{
    if(noty===true){
      setTimeout(function(){
        settingNotification();
      },1000)
    }
  })


  return (
    <div className='bar-container'>
      {<h5 className='heading'>iPod js
      <AiOutlineWifi style={{fontSize:17, marginLeft:4}}></AiOutlineWifi></h5>}
      {/* notification area */}
      {noty===true && <h5 className='notification'>{notifyText}</h5>}
      {/* current time */}
      {noty===false && <h5 className='time'>{currentTime}</h5>}
      {/* right area */}
      {<div className="right-nav-container">
          <img className="battery" src={battery} alt="Battery"/>
      </div>}
    </div>
  )

}
export default Navbar;