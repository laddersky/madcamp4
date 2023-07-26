import React, { useState } from 'react';
import './intro_page.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Main_page.css';
import { UserDataProvider } from "./UserDataContext";
import { Howl, Howler } from 'howler';
import Detail_page from './detail_page';
import Map from './Map';

function Main_page(props) {
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);

    const sound = new Howl({src: ['/book.wav']});
    const open_Phone = () => {
      sound.play();
      setIsPhoneOpen(true);
    };
    const handleImageContentClick = (e) => {
      e.stopPropagation();
      // image-content 안을 클릭했을 때 수행할 작업 (nothing 함수 실행 등)
    };
    const close_Phone = () => {
      setIsPhoneOpen(false);
    };

  





  return (

    <UserDataProvider>
    <div className='container-padding'>
      <div className='center-container'>
        <div className = 'character-position1'>
            <img 
                src="/player1.png"
                alt = "example"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
            </img>
        </div>
        <div className = 'character-position2'>
            <img 
                src="/player2.png"
                alt = "example"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
            </img>
        </div>
        <div className = 'character-position3'>
            <img 
                src="/player3.png"
                alt = "example"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
            </img>
        </div>
        <div className = 'character-position4'>
            <img 
                src="/player4.png"
                alt = "example"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
            </img>
        </div>
        <div className='note-position'>
            <img
              src="/note.png"
              alt="example"
              style={{ width: '100%', height: '100%', cursor: "pointer" }}
              onClick={open_Phone}
            />
        </div>
        {isPhoneOpen && (
            <div className="image-container" onClick={close_Phone}>
              <div className="image-content" onClick={handleImageContentClick} >
                <Detail_page />
              </div>
              
            </div>
        )}
      </div>
      
    </div>
  </UserDataProvider>
    
  );
}
export default Main_page;