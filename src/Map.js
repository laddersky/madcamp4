import React, { useState } from 'react';
import './map.css';

function Map( {onbuttonclick}) {
  const [which_map, setwhich_map] = useState(0);

  const change_to_default = () => {
    setwhich_map(0);
  };
  const change_to_CEE = () => {
    setwhich_map(1);
  };
  const change_to_water = () => {
    setwhich_map(2);
  };
  const change_to_bio = () => {
    setwhich_map(3);
  };
  const change_to_food = () => {
    setwhich_map(4);
  };
  const change_to_MSE = () => {
    setwhich_map(5);
  };
  const change_to_CS = () => {
    setwhich_map(6);
  };
  return (
    <div className='overlay'>
       {which_map == 0 && (<img 
            src="/map_default.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 1 && (<img 
            src="/map_CEE.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 2 && (<img 
            src="/map_water.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 3 && (<img 
            src="/map_bio.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 4 && (<img 
            src="/map_food.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 5 && (<img 
            src="/map_MSE.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}
        {which_map == 6 && (<img 
            src="/map_CS.png"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
        </img>)}


        <button 
          className='close'
          onClick={onbuttonclick(0)}
        >
          닫기
        </button>

        <button 
            className='CEE'
            onMouseEnter={change_to_CEE}
            onMouseLeave={change_to_default} 
            onClick={onbuttonclick(1)}
            >
        </button>
        <button 
            className='water'
            onMouseEnter={change_to_water}
            onMouseLeave={change_to_default}
            onClick={onbuttonclick(2)} 
            >
        </button>
        <button 
            className='bio'
            onMouseEnter={change_to_bio}
            onMouseLeave={change_to_default}
            onClick={onbuttonclick(3)} 
            >
        </button>
        <button 
            className='food'
            onMouseEnter={change_to_food}
            onMouseLeave={change_to_default}
            onClick={onbuttonclick(4)} 
            >
        </button>
        <button 
            className='MSE'
            onMouseEnter={change_to_MSE}
            onMouseLeave={change_to_default}
            onClick={onbuttonclick(5)} 
            >
        </button>
        <button 
            className='CS'
            onMouseEnter={change_to_CS}
            onMouseLeave={change_to_default}
            onClick={onbuttonclick(6)} 
            >
        </button>


    </div>
        

  );
}

export default Map;