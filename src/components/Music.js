import React from 'react'
import '../css/Music.css'


function Music(props) {
    const{musicItems, active} = props;
  return (
    <div className='music'>
      <h3>Music</h3>
      <ul>
        {musicItems.map((ele, index)=>{
          return active===index?<li key={index}className="active">{ele}</li>:
            <li key={index}>{ele}</li>})}
        </ul>
    </div>
  )
}

export default Music