import React from 'react';
import '../css/LockScreen.css';
import LockIcon from '@mui/icons-material/Lock';
export default function LockScreen() {
  return (
    <div>
        <div className='lock-screen'>
        <LockIcon style={{height:211, fontSize:130}}/>
        </div>
        <div className='bottom-div-lock'>
            <h3>Press Center Button To Unlock</h3>
        </div>
    </div>
  )
}
