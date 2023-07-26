import React from 'react';
import './intro_page.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Intro_page(props) {

  const navigate = useNavigate();
  const onClickImg = () => {
    navigate("/main_page");
  };



  return (
    <div className="full-width-image-container">
      <img 
          src="/main_page.png"
          alt = "example"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
      </img>
      <div className='start_button' >
          <img 
            src="/start_button.png"
            alt = "example"
            style={{ width: '100%', height: '100%', objectFit: 'cover' ,cursor : "pointer"}}
            onClick={onClickImg}
          >
          </img>
        
      </div>
    </div>
  );
}

export default Intro_page;