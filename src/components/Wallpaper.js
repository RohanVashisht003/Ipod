import React from 'react';

function Wallpaper(props) {
 
  return (
    <div className='music'>
        <h2>Wallpapers</h2>
        <ul>
            {['Wallpaper-1','Wallpaper-2',
        'Wallpaper-3'].map((ele, index)=>{
          return props.active===index?<li key={index} className="active theme-li">{ele}</li>:<li className='theme-li' key={index}>{ele}</li>
        })}
        </ul>
    </div>
  )
}

export default Wallpaper