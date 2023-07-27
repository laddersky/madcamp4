import React, { useEffect, useState } from 'react';
import { MapProvider, useMapContext } from './MapContext';
import { MakeProvider, useMakeContext } from './MakeContext';
import './detail_page.css';
import { Howl, Howler } from 'howler';
import Map from './Map';
import Make from './Make';

function ManageChores() {
  // useState 훅을 사용하여 count 상태와 setCount 함수를 정의합니다.
  // count는 현재의 상태 값이며, setCount는 상태 값을 업데이트하는 함수입니다.
  const [islocation, setislocation] = useState([0,0,0,0,0]);
  // 0 explore
  
    const [isresting, setisresting] = useState([true,true,true,true]);
  // 0 이 player 1
    const [iswho, setiswho] = useState([0,0,0]);
    const [isvaild, setisvaild] = useState(true);
  //from : 0 explore  5 rest
  // who : 1 2 3 4
  
    const handleDragStart = (from, who) => {
      const newiswho = [...iswho]; 
      newiswho[0] = from;
      newiswho[2] = from;
      if (from == 5){
        if (isresting[who-1]){
          setisvaild(true);
        }
        else {
          setisvaild(false);
        }
        newiswho[1] = who;
      }
      else {
        if (islocation[from] != 0){
          setisvaild(true);
        }
        else {
          setisvaild(false);
        }
        newiswho[1] = islocation[from];
      }
      setiswho(newiswho);
    };
    const move_sound = new Howl({src: ['/moving.mp3']});
    const handleDragEnd = () => {
      const newislocation = [...islocation]; 
      const newisresting = [...isresting]; 
      if (iswho[0] != iswho[2] && isvaild){   // drag가 일어났을 때
        move_sound.play();
        if (iswho[0] == 5){   // 출발지가 rest일 떄
          if ( islocation[iswho[2]] != 0){   // 도착지에 누군가가 있을 때
            newisresting[islocation[iswho[2]]-1] = true;
            setisresting(newisresting);
          } 
          newislocation[iswho[2]] =  iswho[1];
          setislocation(newislocation);
          newisresting[iswho[1]-1] = false;
          setisresting(newisresting);
        }
        else if (iswho[2] == 5){           //도착지가 rest일 때
          newislocation[iswho[0]] =  0;
          setislocation(newislocation);
          newisresting[iswho[1]-1] = true;
          setisresting(newisresting);
        }else {                              //출발지와 도착지가 rest가 아닐 때
          if ( islocation[iswho[2]] != 0){   //도착지에 누군가가 있을 때
            newisresting[islocation[iswho[2]]-1] = true;
            setisresting(newisresting);
          } 
          newislocation[iswho[0]] =  0;
          newislocation[iswho[2]] =  iswho[1];
          setislocation(newislocation);
        }
      }
    };
    const handleenter = (to) =>{
      const newiswho = [...iswho]; // 배열의 복사본을 만듭니다.
      newiswho[2] = to;
      setiswho(newiswho);
    };
    
      
    const restImage = (e) => {
      const t = e+1;
      const imagePath = isresting[e] ? "/play" + t + ".png" : "/blank.png";
      return (<img 
        src={imagePath}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        >
      </img>);
    };
    const activeImage = (e) => {
      const imagePath = e != 0 ? "/play" + e + ".png" : "/blank.png";
      return (<img 
        src={imagePath}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        >
      </img>);
    };
  
    const sound = new Howl({src: ['/book.wav']});


    const { mapstate , setmapstate } = useMapContext();
    const open_Map = () => {
      sound.play();
     
      setmapstate((prevState) => ({
        ...prevState,
        visible: true
      }));
    };
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
    const { makestate , setmakestate } = useMakeContext();
    const open_Make = () => {
      sound.play();
     
      setmakestate((prevState) => ({
        ...prevState,
        visible: true
      }));
    };

    return (
        <div className = 'activity-container'>
            {mapstate.visible && (
                <div className='map-contain' > 
                    <Map/>
                </div>
            )}
            {makestate.visible && (
                <div className='map-contain' > 
                    <Make/>
                </div>
            )}
        <div className='rest' style={{backgroundColor : 'white'}} 
          onDragEnter={() => handleenter(5)}>
          <div className="rest1" draggable = 'true'
            onDragStart={() => handleDragStart(5,1)} 
            onDragEnd={handleDragEnd}  >
            {restImage(0)}
          </div>
          <div className="rest2" draggable = 'true' 
          onDragStart={() => handleDragStart(5,2)} 
          onDragEnd={handleDragEnd}>
              {restImage(1)}
          </div>
          <div className="rest3" draggable = 'true'
            onDragStart={() => handleDragStart(5,3)} 
            onDragEnd={handleDragEnd}  >
              {restImage(2)}
          </div>
          <div className="rest4" draggable = 'true'
            onDragStart={() => handleDragStart(5,4)} 
            onDragEnd={handleDragEnd}  >
              {restImage(3)}
          </div>
        </div>
        <div className='explore'  
        onDragEnter={() => handleenter(0)}>
          <div className="explore-position" draggable = 'true' 
            onDragStart={() => handleDragStart(0,5)} 
            onDragEnd={handleDragEnd}>
              {activeImage(islocation[0])}
          </div>

          <div className='explore-detail'>
              현재위치: {location(mapstate.where)}
          </div>

          <div className='map-position'>
            <img
              src="/map.png"
              alt="example"
              style={{ width: '100%', height: '100%', cursor: "pointer",  objectFit: 'contain' }}
              onClick={open_Map}
            />
          </div>
        </div>
        <div className='study' >
          <div className='study1' onDragEnter={() => handleenter(1)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(1,5)} 
            onDragEnd={handleDragEnd}>
              {activeImage(islocation[1])}  
            </div>
          </div>
          <div className='study2' onDragEnter={() => handleenter(2)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(2,5)} 
            onDragEnd={handleDragEnd}>
                {activeImage(islocation[2])}  
            </div>
          </div>
          <div className='study3' onDragEnter={() => handleenter(3)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(3,5)} 
            onDragEnd={handleDragEnd}>
                {activeImage(islocation[3])}  
            </div>
          </div>

        </div>
        <div className='make'  onDragEnter={() => handleenter(4)}>
          <div className="explore-position" draggable = 'true'
            onDragStart={() => handleDragStart(4,5)} 
            onDragEnd={handleDragEnd}>
            {activeImage(islocation[4])}  
          </div>

          <div className='explore-detail'>
              제작물: {location(mapstate.where)}
          </div>

          <div className='map-position'>
            <img
              src="/make.png"
              alt="example"
              style={{ width: '100%', height: '100%', cursor: "pointer",  objectFit: 'contain' }}
              onClick={open_Make}
            />
          </div>
        </div>
        </div>
        
    );
}

export default () => {
  return (
    <MapProvider>
      <MakeProvider>
        <ManageChores />
      </MakeProvider>
      
    </MapProvider>
  );
};

/*{isMapOpen && (
                <div className='map-contain' > 
                    <Map onbuttonclick = {() => handleButtonClick}/>
                </div>
            )}
        <div className='rest' style={{backgroundColor : 'white'}} 
          onDragEnter={() => handleenter(5)}>
          <div className="rest1" draggable = 'true'
            onDragStart={() => handleDragStart(5,1)} 
            onDragEnd={handleDragEnd}  >
            {restImage(0)}
          </div>
          <div className="rest2" draggable = 'true' 
          onDragStart={() => handleDragStart(5,2)} 
          onDragEnd={handleDragEnd}>
              {restImage(1)}
          </div>
          <div className="rest3" draggable = 'true'
            onDragStart={() => handleDragStart(5,3)} 
            onDragEnd={handleDragEnd}  >
              {restImage(2)}
          </div>
          <div className="rest4" draggable = 'true'
            onDragStart={() => handleDragStart(5,4)} 
            onDragEnd={handleDragEnd}  >
              {restImage(3)}
          </div>
        </div>
        <div className='explore' style={{backgroundColor : 'cyan'}} 
        onDragEnter={() => handleenter(0)}>
          <div className="explore-position" draggable = 'true' 
            onDragStart={() => handleDragStart(0,5)} 
            onDragEnd={handleDragEnd}>
              {activeImage(islocation[0])}
          </div>

          <div className='map-position'>
            <img
              src="/map.png"
              alt="example"
              style={{ width: '100%', height: '100%', cursor: "pointer",  objectFit: 'fill' }}
              onClick={open_Map}
            />
          </div>
          <div>
            
          </div>
        </div>
        <div className='study' style={{backgroundColor : 'cyan'}}>
          <div className='study1' onDragEnter={() => handleenter(1)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(1,5)} 
            onDragEnd={handleDragEnd}>
              {activeImage(islocation[1])}  
            </div>
          </div>
          <div className='study2' onDragEnter={() => handleenter(2)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(2,5)} 
            onDragEnd={handleDragEnd}>
                {activeImage(islocation[2])}  
            </div>
          </div>
          <div className='study3' onDragEnter={() => handleenter(3)}>
            <div className="study1-position" draggable = 'true'
            onDragStart={() => handleDragStart(3,5)} 
            onDragEnd={handleDragEnd}>
                {activeImage(islocation[3])}  
            </div>
          </div>

        </div>
        <div className='make' style={{backgroundColor : 'cyan'}} onDragEnter={() => handleenter(4)}>
          <div className="explore-position" draggable = 'true'
            onDragStart={() => handleDragStart(4,5)} 
            onDragEnd={handleDragEnd}>
            {activeImage(islocation[4])}  
          </div>
        </div> */