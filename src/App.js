import React from 'react';
import Intro_page from './intro_page';
import './App.css';
import { UserDataProvider } from "./UserDataContext";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  //const name = 'react';
  //const style = {
  //  backgroundColor: 'black',
  //  color: 'aqua',
  //  fontSize: 24, // 기본 단위 px
  //  padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  //}
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });
  return (
    /*
    < Unity style={{ width: '100%', height: '100%' }}
      
      unityProvider={unityProvider} />*/
    <div>
      
    <UserDataProvider>
      <div className='main-container-padding'>
        <div className='main-container-center'>
          <Intro_page/>
        </div>
      </div>
    </UserDataProvider>
    </div>
    
    
  );
}

export default App;