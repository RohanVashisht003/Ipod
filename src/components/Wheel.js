import React from 'react';

import '../css/Wheel.css';
// importing zingtouch for touch gestures
import ZingTouch from 'zingtouch';

// importing icons
import { AiFillFastForward,AiFillFastBackward } from "react-icons/ai";
import {BsFillPlayFill,BsFillPauseFill} from "react-icons/bs";


class Wheel extends React.Component {
    constructor(){
        super();
        this.angle = 0;
    }
    
  render() {
    const{active, currentMenu, wheelColor, theme, menuChangeForward} = this.props;

 return (
<div className='wheel-container' id="wheel-container">

    <div style={{backgroundColor:wheelColor}} className="wheel" id="wheel">
        <div className='control' id='menu'>
            <div style={{color:theme}}>MENU</div>
        </div>

        <div className='control' id='forward'>
            <AiFillFastForward style={{color:theme}}></AiFillFastForward>
        </div>

        <div className='control' id="play-pause"> 
            <BsFillPlayFill style={{color:theme, padding:'0'}}></BsFillPlayFill>
            <BsFillPauseFill style={{color:theme}}></BsFillPauseFill>
        </div>

        <div className='control' id='backward'>
            <AiFillFastBackward style={{color:theme}}></AiFillFastBackward>
        </div>
    </div>


    <div className='blank' id="blank" style={{backgroundColor:theme}} onClick={()=>{menuChangeForward(active, currentMenu)}}></div>
</div>
    )
  }

//   controlling rotation
  wheelControlling = (event) => {
        const{updateMenu, currentMenu} = this.props;

    if (Math.abs(this.angle - event.detail.angle) > 800) {
        this.angle = Math.abs(event.detail.angle);
          // if no change in distance
        if (event.detail.distanceFromLast === 0) {
            return;
        }
        else if (event.detail.distanceFromLast < 0) {
            updateMenu(1, currentMenu);
        } else {
            updateMenu(0, currentMenu);
        }

    } 
    else if (Math.abs(this.angle - event.detail.angle) > 12) {
        this.angle = Math.abs(event.detail.angle);
        // if no change in distance
        if (event.detail.distanceFromLast === 0) {
            return;
        }
        else if (event.detail.distanceFromLast > 0) {
            updateMenu(1, currentMenu);
        } else {
            updateMenu(0, currentMenu);
        }

    }
}


componentDidMount () {
    const{menuChangeBackward, fastForward, fastBackward, playPauseToggle} = this.props;

    const wheelControll = this.wheelControlling;
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu");
    const playPause = document.getElementById("play-pause");
    const backward = document.getElementById("backward");
    const forward = document.getElementById("forward");

// custom behaviour
    const longTapGesture = new ZingTouch.Tap({
        maxDelay:2000,
        numInputs: 1,
        tolerance: 1,
    })

    // binding actions with functions
    activeRegion.bind(menuIcon, 'tap', function (event) {
        console.log("menu pressed")
        menuChangeBackward();
    });
    activeRegion.bind(wheel, 'rotate', function (event) {
        console.log("Wheel rotating")
        wheelControll(event);
    });
    activeRegion.bind(playPause, 'tap', function (event) {
        playPauseToggle();
    });

    activeRegion.bind(backward, longTapGesture, function (event) {
        fastBackward(event);
    });

    activeRegion.bind(forward, longTapGesture, function (event) {
        fastForward(event);
    });

}
}

export default Wheel;