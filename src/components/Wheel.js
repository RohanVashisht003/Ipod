import React, { useEffect} from 'react';
import '../css/Wheel.css';
import ZingTouch from 'zingtouch';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';


function Wheel(props) {

    const{active, currentMenu, wheelColor, theme, menuChangeForward, updateMenu, menuChangeBackward, fastForward, fastBackward, playPauseToggle}= props;

    var anglee = 0;

    const wheelControll = (event) => {
        
        console.log(event.detail);
        if (event.detail.distanceFromOrigin === 0) {
            anglee = event.detail.angle;
        }

        if (Math.abs(anglee - event.detail.angle) > 300) {
            anglee = Math.abs(event.detail.angle);
            if (event.detail.distanceFromLast === 0) {
                return;
            }
            else if (event.detail.distanceFromLast < 0) {
                updateMenu(1, currentMenu);
            } else {
                updateMenu(0, currentMenu);
            }

        } 
        else if (Math.abs(anglee - event.detail.angle) > 12) {
            anglee = Math.abs(event.detail.angle);
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

    useEffect(()=>{
        
        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region(wheel);
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const backward = document.getElementById("backward");
        const forward = document.getElementById("forward");

        const longTapGesture = new ZingTouch.Tap({
            maxDelay:100,
            numInputs: 1,
            tolerance: 1,
        })

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

    })
  return (
    <div className='wheel-container' id="wheel-container">

        <div style={{backgroundColor:wheelColor}}
        className="wheel" id="wheel">
            <div className='control' id='menu'>
                <div style={{color:theme}}>
                    MENU
                </div>
            </div>

            <div className='control' id='forward'>
                <FastForwardIcon style={{color:theme}}></FastForwardIcon>
            </div>

            <div className='control' id="play-pause"> 
                <PlayArrowIcon style={{color:theme, padding:'0'}}></PlayArrowIcon>
                <PauseIcon style={{color:theme}}></PauseIcon>
            </div>

            <div className='control' id='backward'>
                <FastRewindIcon style={{color:theme}}></FastRewindIcon>
            </div>
        </div>


        <div className='blank' id="blank" style={{backgroundColor:theme}} onClick={()=>{menuChangeForward(active, currentMenu)
        }}></div>
    </div>
  )
}

export default Wheel