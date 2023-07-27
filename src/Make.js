import React, { useState } from 'react';
import './make.css';
import { MakeProvider, useMakeContext } from './MakeContext';
function Make() {
  return (
    <div className='overlay'>
        <div className='contain-content'>
            <div className='inventory'>
                <div className='antibody'>
                    <img 
                        src="/antibody.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>
                </div>
                <div className='pipette'>
                <img 
                        src="/pipette.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='petridish'>
                <img 
                        src="/petridish.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='steel'>
                <img 
                        src="/steel.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='tire'>
                <img 
                        src="/tire.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='oil'>
                <img 
                        src="/oil.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='coffee'>
                <img 
                        src="/coffee.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='macbook'>
                <img 
                        src="/macbook.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
                <div className='glass'>
                <img 
                        src="/glass.png"
                        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                        >
                    </img>

                </div>
            </div>
            <div className='goal'>
                <div className='Vaccine'>

                </div>
                <div className='Car'>

                </div>
                <div className='Computer-Virus'>

                </div>
                <div className='Airplane'>

                </div>

            </div>
            <div className='require'>
                <div className='target'>
                    
                </div>
                <div className='description'>

                </div>
                <div className='major'>

                </div>
                <div className='require-content'>

                </div>
            </div>
            <div className='button'>
                <div className='close'>
                </div>
            </div>
        </div>
    </div>
        

  );
}

export default Make;