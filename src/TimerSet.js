import React,{useEffect, useState} from 'react';
import Timer from './Timer.js';
import styled from 'styled-components';

import {
  useLocation
} from "react-router-dom";


const TimerSetDiv = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  background:black;

  padding:20px;

  buttondiv {
    display:flex;
    flex:1;
  }
  button {
   cursor:pointer;
   border:none;
   background:blue;
   width:50px;
   height:50px;
   color:white;
   text-transform:uppercase;
   padding:10px;
   border-radius:100px;
   flex:1;
  }

  counter {
    align-items:flex-end;
    display: flex;
    flex:1;
    color:white;
    font-size:20px;
  }

  label {
   max-height:100px;
   font-size:30px;
   margin-top:30px;
   text-transform:uppercase;
   color:white;
   flex:1;
   align-items:flex-start;
  }
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const TimerSet = (props) => {
  const [start,setStart] = useState(null);
  const [timeset,setTimeset] = useState(null);
  const [running, setRunning] = useState(0);

  let query = useQuery();
  let timesetquery = query.get('set'); //`1,ready?,5 2,work/rest,5/3 2,work/rest,6/4`;


  const parseTimeset = (timesetstr)=> {
    const timeset = [];
    const sections = timesetstr.split(' ');
    for (let section of sections) {
      let [repeat,labels,times] = section.split(',');
      times = times.split('/').map(x=>parseInt(x));
      labels = labels.split('/');
      console.log('parts', repeat, labels, times, section);
      for (let i = 0; i < repeat*labels.length; i++) {
	let atimeset = {label: labels[i % labels.length], time: times[i % times.length]};
	timeset.push(atimeset);
      }
    }
    console.log('parsed', timeset);
    return timeset;
  };

  useEffect(()=>{
    const timeset = parseTimeset(timesetquery);
    setTimeset(timeset);
  },[]);
  
  useEffect(()=>{
    console.warn('start changed! start from timerset', start);
  },[start]);

  if (!timesetquery) {
    return null;
  }

  if (!timeset || !timeset[running]) {
    return null;
  }

  const {time,label} = timeset[running];
  console.log('label', label, time, running, timeset);

  const buttonlabel = start ? 'pause' : 'run';
  
  return (
    <TimerSetDiv>
      <counter>{`${running+1} / ${timeset.length}`}</counter>
      <Timer key={running} {...{time, label, running}}
	     onEnd={()=> {
	       console.warn('on end on timerset!');
	       setStart(null); // because we set 2 states here, prevent 2 starts
	       setRunning(running=>running+1);
	       setStart(new Date());
	}}
	start={start} />
	<label>{label}</label>
	<buttondiv>
	  <button onClick={()=>start ? setStart(null) : setStart(new Date())}>{buttonlabel}</button>
	</buttondiv>
    </TimerSetDiv>
  );
}

export default TimerSet;
