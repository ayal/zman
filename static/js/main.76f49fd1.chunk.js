(this.webpackJsonpzman=this.webpackJsonpzman||[]).push([[0],{41:function(n,e,t){n.exports=t(58)},46:function(n,e,t){},47:function(n,e,t){},58:function(n,e,t){"use strict";t.r(e);var a=t(0),r=t.n(a),o=t(17),i=t.n(o),c=(t(46),t(47),t(14)),l=t(20);window.AudioContext=window.AudioContext||window.webkitAudioContext,window.audiocontext=window.audiocontext||new window.AudioContext;var u=window.audiocontext,s=u.createGain();s.connect(u.destination);var f=function(n){n||(n={}),console.warn("AUDIO",u.state);var e=n.interval||250,t=n.duration||1,a=function(n){n||(n=1),function a(r){!function(){console.warn("AUDIO play",u.state);var n=u.currentTime,e=u.createOscillator(),a=u.createGain();e.connect(a),a.connect(s),a.gain.setValueAtTime(a.gain.value,u.currentTime),a.gain.exponentialRampToValueAtTime(.001,u.currentTime+t),e.start(0),e.stop(n+t),e.onended=function(){a.disconnect(s),e.disconnect(a)}}(),++r<n&&setTimeout(a,e,r)}(0)};return a.destroy=function(){n.context||u.close()},a},m=t(21);function d(){var n=Object(l.a)(["\n   display:flex;\n   align-items: flex-end;\n   justify-content:center;\n   flex:1;\n   font-size:10em;\n   letter-spacing:1px;\n    max-height: 180px;\n    align-items: center;\n"]);return d=function(){return n},n}var p=m.a.div(d()),x=f({duration:.2}),g=function(n){var e=n.time,t=n.start,o=n.onEnd,i=Object(a.useState)(e),l=Object(c.a)(i,2),u=l[0],s=l[1],f=Object(a.useState)(e),m=Object(c.a)(f,2),d=m[0],g=m[1],b=Object(a.useCallback)((function(){if(t){var n=d-(new Date-t)/1e3;n<=.2?(n=0,s(0),console.warn("ending!"),o()):(Math.ceil(u)>Math.ceil(n)&&(n<=3&&x(1),n<=1&&x(2)),s(n))}}),[t,o,u,d]);return Object(a.useEffect)((function(){var n=requestAnimationFrame(b);return function(){cancelAnimationFrame(n)}}),[u,b]),Object(a.useEffect)((function(){if(t){console.warn("Timer starts! use effect timer start",t,u);var n=requestAnimationFrame(b);return function(){cancelAnimationFrame(n)}}console.log("setting original time"),g(u)}),[t,b,u]),Object(a.useEffect)((function(){console.log("props.time changed, setting",e),g(e)}),[e]),r.a.createElement(p,null,-1!==u?Math.ceil(u):"fin")},b=t(73),v=t(74),w=t(37),h=t.n(w),E=t(36),O=t.n(E),j=t(13);function y(){var n=Object(l.a)(["\n  flex:1;\n  display:flex;\n  flex-direction:column;\n  justify-content:center;\n  align-items:center;\n\n  background:black;\n\n  padding:20px;\n\n  buttondiv {\n    position:relative;\n    display:flex;\n    flex:1;\n    max-height:50px;\n  }\n  button {\n   text-transform:uppercase;\n   flex:1;\n  }\n\n  counter {\n    display: flex;\n    flex-direction:column;\n    flex:1;\n    font-size:20px;\n    max-height: 40px;\n    align-items: center;\n  }\n\n  .progress {\n    padding-top:15px;\n    width:100px;\n    .MuiLinearProgress-root {\n     height:8px;\n    }\n \n  } \n\n  label {\n   text-transform:capitalize;\n   max-height:50px;\n   font-size:30px;\n   flex:1;\n   align-items:flex-start;\n  }\n\n  sublabel {\n   display:flex;\n   cursor:pointer;\n   max-height:40px;\n   font-size:16px;\n   color:grey;\n   flex:1;\n   align-items:center;\n  }\n\n"]);return y=function(){return n},n}var A=new(t(34)),k=f({duration:.2,interval:150}),T=m.a.div(y());var z=function(n){var e=Object(a.useState)(null),t=Object(c.a)(e,2),o=t[0],i=t[1],l=Object(a.useState)(null),u=Object(c.a)(l,2),s=u[0],f=u[1],m=Object(a.useState)(0),d=Object(c.a)(m,2),p=d[0],x=d[1],w=new URLSearchParams(Object(j.d)().search).get("set");w||(w="1,Get ready,5|9,Work/Rest,30/10");if(Object(a.useEffect)((function(){var n=function(n){var e=[],t=n.split("|"),a=!0,r=!1,o=void 0;try{for(var i,l=t[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var u=i.value,s=u.split(","),f=Object(c.a)(s,3),m=f[0],d=f[1],p=f[2];p=p.split("/").map((function(n){return parseInt(n)})),d=d.split("/"),console.log("parts",m,d,p,u);for(var x=0;x<m*d.length;x++){var g={label:d[x%d.length],time:p[x%p.length]};e.push(g)}}}catch(b){r=!0,o=b}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return console.log("parsed",e),e}(w);f(n)}),[w]),Object(a.useEffect)((function(){console.warn("start changed! start from timerset",o)}),[o]),!w)return null;if(!s||!s[p])return null;var E=s.slice(0,p+1).reduce((function(n,e){return n+e.time}),0)/s.reduce((function(n,e){return n+e.time}),0)*100;console.log("progress",E);var y=s[p],z=y.time,C=y.label,S=s[p+1]||{},D=S.time,F=S.label;console.log("label",C,z,p,s);var I=o?r.a.createElement(O.a,null):r.a.createElement(h.a,null);return r.a.createElement(T,null,r.a.createElement("label",null,C),r.a.createElement(g,Object.assign({key:p},{time:z,label:C,running:p},{onEnd:function(){console.warn("on end on timerset!"),i(null),s[p+1]?(x((function(n){return n+1})),i(new Date)):k(3)},start:o})),r.a.createElement("sublabel",{onClick:function(){i(null),s[p+1]&&x((function(n){return n+1}))}},F?"Next: ".concat(F," / ").concat(D):""),r.a.createElement("counter",null,r.a.createElement("div",{className:"progress"},r.a.createElement(v.a,{variant:"determinate",value:E,color:"secondary"}))),r.a.createElement("buttondiv",null,r.a.createElement(b.a,{color:"primary","aria-label":"run",onClick:function(){"suspended"===window.audiocontext.state&&window.audiocontext.resume(),i(o?null:new Date),A.enable()}},I)))},C=t(26);var S=function(){return r.a.createElement(C.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(z,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.76f49fd1.chunk.js.map