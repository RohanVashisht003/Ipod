import React from 'react';


function Songs(props) {
    const{songItems, active} = props;
return (
  <div className="music">
    <h3>Songs</h3>
    {/* listing songs */}
      <ul>
       {songItems.map((element, index)=>{
       return active===index?<li key={index} className="active">{element}</li>:<li  id="song1" key={index}>{element}</li>
    })}
      </ul>
  </div>
  )
}

export default Songs;