import '../css/App.css';
import { useState } from 'react';
import Case from './Case.js';


// Importing Songs
import song1 from '../static/songs/Dharia.mp3';
import song2 from '../static/songs/Fearless.mp3';
import song3 from '../static/songs/ShapeofYou.mp3';
import song4 from '../static/songs/InTheEnd.mp3';

// Importing Song Images
import song1Img from '../static/images/dhariaImg.jfif';
import song2Img from '../static/images/fearless.jpg';
import song3Img from '../static/images/in the end.jpg';
import song4Img from '../static/images/shape of you.png';

// Importing Wallpapers
import Wallpaper1 from "../static/images/wallpaper1.jpg";
import Wallpaper2 from '../static/images/wallpaper2.jpg';
import Wallpaper3 from '../static/images/wallpaper3.png';
import Wallpaper4 from '../static/images/wallpaper4.jfif';




function App() {

  const[active, setActive] = useState(0);

  const[menuItems] = useState([
                            "Now Playing","Music","Games", "Setting"
                              ]);

  const[musicItems] = useState([
                                "All Songs", "Artist", "Albums"
                              ]);

  const [songImgItemsUrl] = useState([song1Img, song2Img,song3Img, song4Img]);

  const[songItemsUrl]=useState([song1, song2, song3, song4]);

  const [wallpaperItems] = useState([Wallpaper1, Wallpaper2, Wallpaper3, Wallpaper4
  ]);

  const [songItems] = useState(["Dharia","Fearless","In TheEnd","ShapeofYou"]);

  const[songIndexx, setSongIndexx] = useState(0);

  const [songImgUrl, setSongImgUrl] = useState(song1Img);

  const[playing, setPlaying] = useState(false);

  const[noty, setNoty] = useState(false);

  const[notifyText, setNotifyText] = useState("Wallpaper Changed");

  const [navigationArrayy, setNavigationArrayy] = useState([]);

  const[theme, setTheme] = useState('rgb(210,210,210)');

  const [wallpaper, setWallpaper] = useState(0);

  const[songUrl, setSongUrl] = useState(song1);

  const [audio, setAudio] = useState(new Audio(song1));

  const [wheelColor, setWheelColor] = useState('white');

  const [currentMenu, setCurrentMenu] = useState(-2);

  const [lengthMenuKey] = useState({"-1":3, 1:2, 4:4, 8:4, 3:2, 9:3, 10:2});

  const menuMapping = {"-1":[0,1,2,3],
                          1:[4,5,6],
                          3:[8,9,10]
                      };

    

  // ------------Fast Forward Function-------------------
  const fastForward =(event)=>{
    if(currentMenu===-2){
      return;
    }
    if(playing === false){
      return;
    }
    console.log(event.detail.interval)
    if(event.detail.interval<250){
      audio.pause();
      let songIndex = songIndexx;

      if(songIndex === songItemsUrl.length-1){
        songIndex=0;
      }
      else{
        songIndex++;
      }

      const songUrl = songItemsUrl[songIndex];
      const songImgUrl = songImgItemsUrl[songIndex];

      // setting states
        setSongIndexx(songIndex);
        setSongUrl(songUrl);
        setSongImgUrl(songImgUrl);

        setAudio(new Audio(songUrl))
          audio.play();
      }
    else if(event.detail.interval >250 && event.detail.interval<1000){
      const interval = event.detail.interval/100;

      // function for incrementing currentTime
      setAudio(prevState=>{
        prevState.audio.currentTime += interval;
        return prevState;
      })
    }
  }


  // Fast Backward
  const fastBackward = (event)=>{
    if(playing===false){
      return;
    }
    if(event.detail.interval<250){
      audio.pause();
      let songIndex = songIndexx;
      if(songIndex===0){
        songIndex = songItemsUrl.length-1;
      }
      else{
        songIndex-=1;
      }

      const songUrl = songItemsUrl[songIndex];
      const songImgUrl = songImgItemsUrl[songIndex];

      // setting states
        setSongIndexx(songIndex);
        setSongImgUrl(songImgUrl);
        setSongUrl(songUrl);
        setAudio(new Audio(songUrl));
          audio.play();
      }
    else if(event.detail.interval>250 && event.detil.interval<1000){
      const interval = event.detail.interval/100;
      setAudio((prevState)=>{
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
    }
  

  // play pause
  const playPauseToggle = ()=>{
    if(currentMenu===-2){
      return;
    }
    if(playing===true){
      setPlaying(false);
      audio.pause();
    }
    else if(playing === false){
      setPlaying(true);
      audio.play();
    }
  }

  
  //Updating  menu while rotating wheel
  const updateMenu = (direction, menu)=>{

    if(menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10){
      return;
    }
    let min=0;
    let max = 0;

    max = lengthMenuKey[menu];

    if(direction === 1){
      if(active>=max){
        setActive(min);
      }
      else{
        setActive(active+1);
      }
    }
    else{
      if(active<=min){
        setActive(max);
      }
      else{
        setActive(active-1);
      }
    }
  } 


  // Set Wallpaper
  const settingWallpaper = (id)=>{
      setWallpaper(id);
      setNoty(true);
      setNotifyText("Wallpaper Changed");
      return;
  
  }

  // set theme of body
  const settingTheme = (id)=>{
    let theme = "";
    if(id===0){
      theme='#f0f0f0'
    }
    else if (id === 1) {
      theme= "#555d50" //black
    } else if (id === 2) {
      theme= "#ffcc00";
    } else if (id === 3) {
      theme="#D1CDDA";

    } else if (id === 4) {
      theme="#c4aead"
    }

      setTheme(theme);
      setNoty(true);
      setNotifyText("Theme Changed");
      return;

  }

  // set wheel color
  const settingWheelColor = (id)=>{
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

        setWheelColor(wheelColor);
        setNoty(true);
        setNotifyText("Wheel Color Changed");
        return;

  }
  // set noty
  const settingNoty = ()=>{
    setNoty(false);
    return;
  }

  const changeSongFromMenu=(id, navigationArrayy)=>{
    const songUrl = songItemsUrl[id];
    const songImgUrl = songImgItemsUrl[id];
    this.state.audio.pause();

      setCurrentMenu(7);
      setSongUrl(songUrl);
      setNavigationArrayy(navigationArrayy);
      setActive(0);
      setPlaying(true);
      setSongIndexx(id);
      setAudio(new Audio(songUrl));
      setSongImgUrl(songImgUrl);
        audio.play();
    return;
  }
  const menuChangeBackward = ()=>{
    const navigationArray = navigationArrayy.slice();
    if(currentMenu===-2){
      return;
    }
    else{
      const prevId = navigationArray.pop();
  
        setCurrentMenu(prevId);
        setActive(0);
        setNavigationArrayy(navigationArray);
        return;

    }
  }

  const menuChangeForward = (id, from)=>{
    console.log("menuChangeForward");
    const navigationArray = navigationArrayy.slice();

    if (from !== -2 && from !== -1 && from !== 1 && from !== 4 && from !== 3 && from !== 8 && from !== 9 && from !== 0 && from !== 7 &&from !== 10) {
      return;
    }

    if(from===-2){
      navigationArray.push(currentMenu);
    
        setCurrentMenu(-1);
        setNavigationArrayy(navigationArray);
        setActive(0);
        return;
  
    }

    if(from===-1){
      navigationArray.push(currentMenu);
   
        setCurrentMenu(id);
        setNavigationArrayy(navigationArray);
        setActive(0);
        return;
    }

    if(from===7 || from===0){
      playPauseToggle();
      return;
    }

    if(from===8){
      settingTheme(id);
      return;
    }

    if(from===9){
      settingWheelColor(id);
      return;
    }

    if(from===10){
      settingWallpaper(id);
      return;
    }

    navigationArray.push(currentMenu);
    if(from===4){
      changeSongFromMenu(id, navigationArray, from);
      return;
    }

    const currentMenuId = menuMapping[from][id];

      setCurrentMenu(currentMenuId);
      setNavigationArrayy(navigationArray);
      setActive(0);

  }

  return (
    <div className="App">
      {/* case component */}
      <Case theme={theme} songIndex = {songIndexx} menuItems={menuItems} musicItems = {musicItems} currentMenu = {currentMenu} updateMenu = {updateMenu}
      playPauseToggle = {playPauseToggle} songItems = {songItems} playing = {playing} audio = {audio} songUrl = {songUrl} songImgUrl ={songImgUrl} fastForward = {fastForward} fastBackward= {fastBackward} wheelColor = {wheelColor} wallpaper = {wallpaper} wallpaperItems = {wallpaperItems} noty = {noty} notifyText = {notifyText} settingNoty={settingNoty} settingWheelColor = {settingWheelColor}
      settingTheme = {settingTheme} settingWallpaper = {settingWallpaper} menuChangeBackward={menuChangeBackward} menuChangeForward = {menuChangeForward} active = {active}
      
      />
    </div>
  );
}

export default App;
