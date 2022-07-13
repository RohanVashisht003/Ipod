import React from 'react'
import '../css/Themes.css'
function Themes(props) {
    const {active} = props;
  return (
    <div className='music'>
        <h2>Theme Select</h2>
        <ul>
        {["Snow","Black","Gold","Gray","Brown"].map((element,index)=>{
            return active===index?<li key={index} className="active theme-li">{element}</li>:<li className="theme-li" key={index}>{element} </li>
          })}
        </ul>
    </div>
  )
}

export default Themes;