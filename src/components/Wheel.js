import '../css/Wheel.css';
import ZingTouch from 'zingtouch';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import React from 'react';

class Wheel extends React.Component {
    constructor(){
        super();
        this.angle = 0;
    }
    
  render() {
    const{active, currentMenu, wheelColor, theme, menuChangeForward} = this.props;
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

  wheelControll = (event) => {
        const{updateMenu, currentMenu} = this.props;
    console.log(event.detail);
    // if (event.detail.distanceFromOrigin === 0) {
    //     this.angle = event.detail.angle;
    // }

    if (Math.abs(this.angle - event.detail.angle) > 800) {
        this.angle = Math.abs(event.detail.angle);
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

// binding components with zingtouch
componentDidMount () {
    const{menuChangeBackward, fastForward, fastBackward, playPauseToggle} = this.props;
    const wheelControll = this.wheelControll;
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

}
}

export default Wheel;