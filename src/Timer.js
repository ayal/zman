import React,{useEffect, useState} from 'react';
import Beep from './beep.js';

import styled from 'styled-components';

const TimerDiv = styled.div`
   display:flex;
   align-items: flex-end;
   justify-content:center;
   flex:1;
   font-size:10em;
   letter-spacing:1px;
   max-height:200px;
`;

const shortbeep = Beep({duration:0.8});
const longbeep = Beep({duration:1});

const Timer = (props) => {
  const [time,setTime] = useState(props.time);
  const [originalTime,setOriginalTime] = useState(props.time);

  const animate = ()=>{
    if (props.start) {
      let newTime = originalTime - ((new Date() - props.start)/1000);
      if (newTime <= 0.2) {
	newTime = 0;
	setTime(0);
	console.warn('ending!');
	props.onEnd();
      }
      else {
	if (Math.ceil(time) > Math.ceil(newTime)) {
	  if (newTime <= 3) {
	    shortbeep(1);
	  }
	  if (newTime <= 1) {
	    longbeep(1);
	  }
	}
	setTime(newTime);
      }
    }
  };

  useEffect(()=>{
    
    const handle = requestAnimationFrame(animate);
    return ()=>{
      cancelAnimationFrame(handle);
    };
  },[time]);

  useEffect(()=> {
    if (props.start) {
      console.warn('Timer starts! use effect timer start', props, time);
      const handle = requestAnimationFrame(animate);
      return ()=>{
	cancelAnimationFrame(handle);
      };
    }
    else {
      console.log('setting original time');
      setOriginalTime(time);
    }
  }, [props.start]);

  useEffect(()=> {
    console.log('props.time changed, setting', props.time);
    setOriginalTime(props.time);
  },[props.time]);


  return (
    <TimerDiv>
      {time !== -1 ? Math.ceil(time) : 'fin'}
    </TimerDiv>
  );
}

export default Timer;
