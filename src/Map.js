import React, { useState } from 'react';
import './map.css';
import { MapProvider, useMapContext } from './MapContext';
function Map() {
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

  const { mapstate , setmapstate } = useMapContext();

  const onbuttonclick = (e) => {

    if (e != 0){
      setmapstate((prevState) => ({
      ...prevState,
      visible: false,
      where : e
    }));
    }else {
      setmapstate((prevState) => ({
        ...prevState,
        visible: false,
      }));
    }
    
  }
  const location = (e)=> {
    let locate = "";
    if (e == 0){
      
    }else if (e == 1){
      locate = "환경과 연구실"
    }
    else if (e == 2){
      locate = "오리연못"
    }
    else if (e == 3){
      locate = "생명과 연구실"
    }
    else if (e == 4){
      locate = "서브웨이"
    }
    else if (e == 5){
      locate = "기계과 연구실"
    }
    else if (e == 6){
      locate = "전산학부 연구실"
    }
    return(locate);
  }

  const detail_ = (e)=> {
    let locate = "";
    if (e == 0){
      
    }else if (e == 1){
      locate = "환경과 연구실이다. 탐색능력에 관한 다양한 물품을 얻을 수 있다."
    }
    else if (e == 2){
      locate = "옛날에 오리들이 살았던 연못. 물을 얻기엔 이만한 곳이 없다."
    }
    else if (e == 3){
      locate = "환경과 연구실이다. 질병에 대처할 수 있는 물품을 얻을 수 있다."
    }
    else if (e == 4){
      locate = "우리의 먹거리를 책임졌던 서브웨이. 지금은 식량을 털기엔 최적의 장소다. "
    }
    else if (e == 5){
      locate = "기계과 연구실이다. 총, 로봇 등 실전에 쓰이는 물품을 얻을 수 있다."
    }
    else if (e == 6){
      locate = "전산학부 연구실이다. 게임, 라디오 등 쓸만한 물품을 얻을 수 있다."
    }
    return(locate);
  }
  const reward_normal = (e)=> {
    let locate = "";
    if (e == 0){
      
    }else if (e == 1){
      locate = "없음"
    }
    else if (e == 2){
      locate = "물"
    }
    else if (e == 3){
      locate = "없음"
    }
    else if (e == 4){
      locate = "식량"
    }
    else if (e == 5){
      locate = "없음"
    }
    else if (e == 6){
      locate = "없음"
    }
    return(locate);
  }
  const reward_hidden = (e)=> {
    let locate = "";
    if (e == 0){
      
    }else if (e == 1){
      locate = "환경과 전공책, 손전등, 지도"
    }
    else if (e == 2){
      locate = "대량의 물"
    }
    else if (e == 3){
      locate = "생명과 전공책, 응급처치 키트, 항생제"
    }
    else if (e == 4){
      locate = "대량의 식량"
    }
    else if (e == 5){
      locate = "기계과 전공책, 총, 드론"
    }
    else if (e == 6){
      locate = "전산학부 전공책, 게임, 라디오"
    }
    return(locate);
  }
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
        <div className='explain'>
          <div className='explain-title'>
            {"현재위치"}
            <div className='explain-subtitle'>
              {location(which_map)}
            </div>
          </div>
          <div className='explain-content'>
          {detail_(which_map)}
          </div>
          <div className='explain-normal'>
            기본 보상
            <div className='explain-normal-reward'>
            {reward_normal(which_map)}
            </div>
          </div>
          <div className='explain-hidden'>
            대박 보상
            <div className='explain-normal-reward'>
            {reward_hidden(which_map)}
            </div>
          </div>
        </div>

        <button 
          className='close'
          onClick={() => onbuttonclick(0)}
        >
          닫기
        </button>

        <button 
            className='CEE'
            onMouseEnter={change_to_CEE}
            onMouseLeave={change_to_default} 
            onClick={() =>onbuttonclick(1)}
            >
        </button>
        <button 
            className='water'
            onMouseEnter={change_to_water}
            onMouseLeave={change_to_default}
            onClick={() =>onbuttonclick(2)} 
            >
        </button>
        <button 
            className='bio'
            onMouseEnter={change_to_bio}
            onMouseLeave={change_to_default}
            onClick={() =>onbuttonclick(3)} 
            >
        </button>
        <button 
            className='food'
            onMouseEnter={change_to_food}
            onMouseLeave={change_to_default}
            onClick={() =>onbuttonclick(4)} 
            >
        </button>
        <button 
            className='MSE'
            onMouseEnter={change_to_MSE}
            onMouseLeave={change_to_default}
            onClick={() =>onbuttonclick(5)} 
            >
        </button>
        <button 
            className='CS'
            onMouseEnter={change_to_CS}
            onMouseLeave={change_to_default}
            onClick={() =>onbuttonclick(6)} 
            >
        </button>


    </div>
        

  );
}

export default Map;