import React,{useEffect, useState, useCallback} from 'react';
import Beep from './beep.js';

import styled from 'styled-components';

const TimerDiv = styled.div`
   display:flex;
   align-items: flex-end;
   justify-content:center;
   flex:1;
   font-size:10em;
   letter-spacing:1px;
    max-height: 180px;
    align-items: center;
`;

const shortbeep = Beep({duration:0.2});

const Timer = (props) => {
  const {time, start, onEnd} = props;
  const [time,setTime] = useState(time);
  const [originalTime,setOriginalTime] = useState(time);

  const animate = useCallback(()=>{
    if (start) {
      let newTime = originalTime - ((new Date() - start)/1000);
      if (newTime <= 0.2) {
	newTime = 0;
	setTime(0);
	console.warn('ending!');
	onEnd();
      }
      else {
	if (Math.ceil(time) > Math.ceil(newTime)) {
	  if (newTime <= 3) {
	    shortbeep(1);
	  }
	  if (newTime <= 1) {
	    shortbeep(2);
	  }
	}
	setTime(newTime);
      }
    }
  }, [start, onEnd, time, originalTime]);

  useEffect(()=>{
    
    const handle = requestAnimationFrame(animate);
    return ()=>{
      cancelAnimationFrame(handle);
    };
  },[time, animate]);

  useEffect(()=> {
    if (start) {
      console.warn('Timer starts! use effect timer start', start, time);
      const handle = requestAnimationFrame(animate);
      return ()=>{
	cancelAnimationFrame(handle);
      };
    }
    else {
      console.log('setting original time');
      setOriginalTime(time);
    }
  }, [start, animate, time]);

  useEffect(()=> {
    console.log('props.time changed, setting', time);
    setOriginalTime(time);
  },[time]);


  return (
    <TimerDiv>
      {time !== -1 ? Math.ceil(time) : 'fin'}
    </TimerDiv>
  );
}

export default Timer;
