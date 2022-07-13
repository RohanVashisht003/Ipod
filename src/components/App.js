import React from 'react';
import '../css/App.css';
import ActualBody from './ActualBody.js';


// Importing Songs
import song1 from '../static/songs/HarHarShambhuShivMahadeva.mp3';
import song2 from '../static/songs/Fearless.mp3';
import song3 from '../static/songs/InTheEnd.mp3';
import song4 from '../static/songs/ShapeofYou.mp3';
import song5 from '../static/songs/Dhokha.mp3';
import song6 from '../static/songs/MastNazronSe.mp3';
import song7 from '../static/songs/MeriZindagiHaiTu.mp3';
import song8 from '../static/songs/Stay.mp3';


// Importing Song Images
import song1Img from '../static/images/harharshiv.jpg';
import song2Img from '../static/images/fearless.jpg';
import song3Img from '../static/images/in the end.jpg';
import song4Img from '../static/images/shape of you.png';
import song5Img from '../static/images/dhokha.jpg';
import song6Img from '../static/images/mastnazro.jpg';
import song7Img from '../static/images/meri.jpg';
import song8Img from '../static/images/stay.jpg';

// Importing Wallpapers
import Wallpaper1 from "../static/images/wallpaper1.jpg";
import Wallpaper2 from '../static/images/wallpaper2.png';
import Wallpaper3 from '../static/images/wallpaper3.jfif';




class App extends React.Component {
  constructor() {
    super();
    // setting states of different attributes
    this.state = {
      active: 0,
      // main menu items
      menuItems: ["Now Playing", "Music", "Games", "Settings"],
      // music menu items
      musicItems: ["All Songs", "Artist", "Albums"], 
      //songs list
      songItemsUrl: [song1, song2, song3, song4,song5,song6,song7,song8], 
      //songs images list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img,song5Img,song6Img,song7Img,song8Img], 
      //wallpapers
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3], 
      // songs names
      songItems: ["Har Har Shambhu Shiv Mahadeva", "Fearless", "In The End", "Shape Of You","Dhokha","Mast Nazron Se","Meri Zindagi Hai Tu","Stay"], 
      // current song by default
      songIndex: 0,

      // mapping menu keys
      lengthMenuKey: {
        "-1": 3,
        1: 2,
        4: 7,
        8: 4,
        3: 2,
        9: 2,
        10: 2
      }, 
      menuMapping: {
        "-1": [0, 1, 2, 3],
        1: [4, 5, 6],
        3: [8, 9, 10]
      }, 
      //current menu which is lockscreen
      currentMenu: -2, 
       //Used for navigating forward and backward
      navigationStack: [],
      //current song url
      songUrl: song1, 
      //playing or not
      playing: false, 
      //current theme
      theme: "rgb(210, 210, 210)", 
      //current audio file
      audio: new Audio(song1), 
      //playing song image
      songImgUrl: song1Img, 
      //current wheel color
      wheelColor: "white", 
      //current wallpaper
      wallpaper: 0, 
      //to show notification or not
      noty: false, 
      //wallpaper changed notification text
      notifyText: "Wallpaper Changed", 
    }
  }

  fastForward = (event) => {
    // if lock do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    
    // for going to next
    if (event.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;

      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }

      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];

      this.setState({
        songIndex: songIndex,
        songImgUrl: songImgUrl,
        songUrl: songUrl,
        audio: new Audio(songUrl)
      }, () => {
        this.state.audio.play();
      });

    }
    // fast forwarding song 
    else if (event.detail.interval > 250 && event.detail.interval < 1000) {
      const interval = event.detail.interval / 60;

      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      })
    }
    else if(event.detail.interval >=1000 && event.detail.interval <2000){
      const interval = event.detail.interval / 20;

      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      })
    }
  }

  fastBackward = (event) => {
     // if lock do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    
     // for going to back
    if (event.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex -= 1;
      }

      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];

      // setting states
      this.setState({
        songIndex: songIndex,
        songImgUrl: songImgUrl,
        songUrl: songUrl,
        audio: new Audio(songUrl)
      }, () => {
        this.state.audio.play();
      });

    }
    // fast backward
     else if (event.detail.interval > 250 && event.detail.interval < 1000) {
      const interval = event.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
    else if(event.detail.interval >=1000 && event.detail.interval <2000){
      const interval = event.detail.interval / 20;

      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }


  // play pause
  playPauseToggle = () => {
    // if on lockscreen do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    // if currently playing
    if (this.state.playing === true) {
      // then set state to pause
      this.setState({
        playing: false
      });
      // set audio to pause
      this.state.audio.pause();
    }
    
    else {
      // otherwise set to play 
      this.setState({
        playing: true
      });
      this.state.audio.play();
    }
  }


  //Updating menu
  updateMenu = (direction, menu) => {

    // if menu is not from the defined menu then return
    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10) {
      return;
    }

    let min = 0;
    let max = 0;

    // setting maximum possible value for a menu
    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      // if greater than or equals to max then set active to min
      if (this.state.active >= max) {
        this.setState({
          active: min
        })
      }
      // otherwise increase active+1 
      else {
        this.setState({
          active: this.state.active + 1
        })
      }
    }
    // is less than or equals to min then set active to max 
    else {
      if (this.state.active <= min) {
        this.setState({
          active: max
        })
      }
     // otherwise increase active-1
      else {
        this.setState({
          active: this.state.active - 1
        })
      }
    }
  }

  //  Set Wallpaper
  settingWallpaper = (id) => {
    // setting the state on changing of wallpaper and showing notification
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed"
    });
    return;

  }

  // set theme of body
  settingTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f0f0";
    } else if (id === 1) {
      theme = "#555d50";
    } else if (id === 2) {
      theme = "#ffcc00";
    } else if (id === 3) {
      theme = "#D1CDDA";

    } else if (id === 4) {
      theme = "#c4aead";
    }
     // setting the state on changing of theme and showing notification
    this.setState({
      theme: theme,
      noty: true,
      notifyText: "Theme Changed"
    }) 
    return;
  }

   // set wheel color
  settingWheelColor = (id) => {
    let wheelColor ="";
    if (id === 0) {
      wheelColor= "#212121";
    }
    else if (id === 1) {
      wheelColor= "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor= "#3D5AFE";
    }
    this.setState({ 
      wheelColor: wheelColor, 
      noty:true, 
      notifyText:"Wheel Color Changed"
    })
    return;

  }
  // set notification
  settingNotification = () => {
    this.setState({
      noty: false
    });
    return;
  }

  // change song from menu
  changeSongFromMenu = (id, navigationStack) => {
    // songUrl to play the song
    const songUrl = this.state.songItemsUrl[id];
    // songImage as well
    const songImgUrl = this.state.songImgItemsUrl[id];
    // pause the current playing song
    this.state.audio.pause();
    // set states
    this.setState({
      // show playing song screen
      currentMenu: 7,
      // set songUrl
      songUrl: songUrl,
      // update navigation array
      navigationStack: navigationStack,
      active: 0,
      playing: true,
      songIndex: id,
      // set new audio
      audio: new Audio(songUrl),
      // set new image
      songImgUrl: songImgUrl
    }, 
    // callback function to play audio
    () => {
      this.state.audio.play();
    });
    return;
  }

  // going back to previous menu
  menuChangeBackward = () => {
    // get the navigation array
    const navigationStack = this.state.navigationStack.slice();
    // if on lockscreen do nothing
    if (this.state.currentMenu === -2) {
      return;
    } 
    // otherwise
    else {
      // pop the the last id
      const prevId = navigationStack.pop();
      // set new states
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0
      });
      return;

    }
  }

  // going to new menu 
  menuChangeForward = (id, from) => {
    // get the navigation array
    const navigationStack = this.state.navigationStack.slice();
// if menu is not from the defined menu then return
    if (from !== -2 && from !== -1 && from !== 1 && from !== 4 && from !== 3 && from !== 8 && from !== 9 && from !== 0 && from !== 7 && from !== 10) {
      return;
    }
// if from lockscreen then
    if (from === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        // set main menu
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0
      });
      return;

    }
// if from main menu then
    if (from === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        // set id of selected menu
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0
      });
      return;
    }
// if from menu "0 or 7" then play or pause song
    if (from === 7 || from === 0) {
      this.playPauseToggle();
      return;
    }
// if from theme menu then change the theme
    if (from === 8) {
      this.settingTheme(id);
      return;
    }
// if from wheel color menu then change wheel color
    if (from === 9) {
      this.settingWheelColor(id);
      return;
    }
// if from wallpaper menu then change wallpaper
    if (from === 10) {
      this.settingWallpaper(id);
      return;
    }
// also push the currentmenu id in navigation array
    navigationStack.push(this.state.currentMenu);
    // if from all songs menu then change song from menu
    if (from === 4) {
      this.changeSongFromMenu(id, navigationStack);
      return;
    }
// get the current menu mapping
    const currentMenuId = this.state.menuMapping[from][id];
// update the states
    this.setState({
      currentMenu: currentMenuId,
      navigationStack: navigationStack,
      active: 0
    });

  }

  render(){
      const {active, menuItems,musicItems,wallpaperItems,songItems,songIndex,currentMenu,songUrl,playing,theme,audio,songImgUrl,wheelColor,wallpaper,noty,notifyText} = this.state;
      return (
      <div className="App">
      <ActualBody songIndex = {songIndex} active={active} menuItems = {menuItems} musicItems={musicItems} currentMenu={currentMenu} menuChangeBackward={this.menuChangeBackward} menuChangeForward = {this.menuChangeForward} updateMenu = {this.updateMenu} 
      playPauseToggle = {this.playPauseToggle} songItems={songItems} playing = {playing} theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} fastForward = {this.fastForward} fastBackward = {this.fastBackward} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} settingNotification={this.settingNotification} notifyText={notifyText}/>
      </div>
    );
  }
}

export default App;