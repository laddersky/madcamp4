import React from 'react';
import Intro_page from './intro_page';
import './App.css';
import { UserDataProvider } from "./UserDataContext";


function App() {
  //const name = 'react';
  //const style = {
  //  backgroundColor: 'black',
  //  color: 'aqua',
  //  fontSize: 24, // 기본 단위 px
  //  padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  //}

  return (
    <UserDataProvider>
      <div className='main-container-padding'>
        <div className='main-container-center'>
          <Intro_page/>
        </div>
      </div>
    </UserDataProvider>
      
    
  );
}

export default App;