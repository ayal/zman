import React,{useEffect, useState} from 'react';
import Timer from './Timer.js';
import styled from 'styled-components';
import Beep from './beep.js';

import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {
  useLocation
} from "react-router-dom";
import NoSleep from 'nosleep.js';
var noSleep = new NoSleep();

const shortbeep = Beep({duration:0.2, interval:150});

const TimerSetDiv = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  background:black;

  padding:20px;

  buttondiv {
    position:relative;
    display:flex;
    flex:1;
    max-height:50px;
  }
  button {
   text-transform:uppercase;
   flex:1;
  }

  counter {
    display: flex;
    flex-direction:column;
    flex:1;
    font-size:20px;
    max-height: 40px;
    align-items: center;
  }

  .progress {
    padding-top:15px;
    width:100px;
    .MuiLinearProgress-root {
     height:8px;
    }
 
  } 

  label {
   text-transform:capitalize;
   max-height:50px;
   font-size:30px;
   flex:1;
   align-items:flex-start;
  }

  sublabel {
   display:flex;
   cursor:pointer;
   max-height:40px;
   font-size:16px;
   color:grey;
   flex:1;
   align-items:center;
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
  let timesetquery = query.get('set'); 
  if (!timesetquery) {
    timesetquery = `1,Get ready,5|9,Work/Rest,30/10`;
  }


  const parseTimeset = (timesetstr)=> {
    const timeset = [];
    const sections = timesetstr.split('|');
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
  },[timesetquery]);
  
  useEffect(()=>{
    console.warn('start changed! start from timerset', start);
  },[start]);

  if (!timesetquery) {
    return null;
  }

  if (!timeset || !timeset[running]) {
    return null;
  }
  
  const progress = timeset.slice(0,running+1).reduce((a,b)=>(a + b.time), 0) / timeset.reduce((a,b)=>(a + b.time), 0) * 100;
  
  console.log('progress', progress);
  
  const {time,label} = timeset[running];
  const {time:nexttime,label:nextlabel} = timeset[running+1] || {};
  
  console.log('label', label, time, running, timeset);

  const buttonicon = start ? <PauseIcon /> : <PlayArrowIcon />;
  
  return (
    <TimerSetDiv>
      <label>{label}</label>
      <Timer key={running} {...{time, label, running}}
	     onEnd={()=> {
	       console.warn('on end on timerset!');
	       setStart(null); // because we set 2 states here, prevent 2 starts
	       if (timeset[running+1]) {
		 setRunning(running=>running+1);
		 setStart(new Date());
	       }
	       else {
		 shortbeep(3);
	       }
	}}
	start={start} />
	<sublabel onClick={()=>{
	    setStart(null); // because we set 2 states here, prevent 2 starts
	    if (timeset[running+1]) {
	      setRunning(running=>running+1);
	    }
	  }}>{nextlabel ? `Next: ${nextlabel} / ${nexttime}` : ``}</sublabel>
	<counter>
	  <div className="progress"><LinearProgress variant="determinate" value={progress} color="secondary" /></div>
	</counter>
	<buttondiv>
	  <Fab color="secondary" aria-label="run"
	       onClick={()=> {
		 if (window.audiocontext.state === 'suspended') {
		   window.audiocontext.resume();
		 }
		 start ? setStart(null) : setStart(new Date())
                 alert('start no sleep');
                 noSleep.enable();
	    }}>
	    {buttonicon}
	  </Fab>
	</buttondiv>
    </TimerSetDiv>
  );
}

export default TimerSet;
