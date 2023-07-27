import React, { useState } from 'react';
import './detail_page.css';
import { Howl, Howler } from 'howler';
import Map from './Map';
import Tabs from './Tabs.js'



function Detail_page(props) {
  return (
    <div className='container' >
      <img 
          src="/phone.png"
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          >
      </img>
      <div className='window'>
       <Tabs/>
      </div>
    </div>
  );
}

export default Detail_page;

/*{isMapOpen && (
        <div className='map-contain' > 
          <Map onbuttonclick = {() => handleButtonClick}/>
        </div>
          )}
        <div className='tab' style={{backgroundColor : 'cyan'}}>

        </div>
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