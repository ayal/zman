(this.webpackJsonpzman=this.webpackJsonpzman||[]).push([[0],{41:function(e,n,t){e.exports=t(59)},46:function(e,n,t){},47:function(e,n,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},48:function(e,n,t){},59:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(17),o=t.n(i),c=(t(46),t(47),t(48),t(14)),l=t(20);window.AudioContext=window.AudioContext||window.webkitAudioContext,window.audiocontext=window.audiocontext||new window.AudioContext;var u=window.audiocontext,s=u.createGain();s.connect(u.destination);var f=function(e){e||(e={}),console.warn("AUDIO",u.state);e.frequency;var n=e.interval||250,t=e.duration||1,a=function(e){e||(e=1),function a(r){!function(){console.warn("AUDIO play",u.state);var e=u.currentTime,n=u.createOscillator(),a=u.createGain();n.connect(a),a.connect(s),a.gain.setValueAtTime(a.gain.value,u.currentTime),a.gain.exponentialRampToValueAtTime(.001,u.currentTime+t),n.start(0),n.stop(e+t),n.onended=function(){a.disconnect(s),n.disconnect(a)}}(),++r<e&&setTimeout(a,n,r)}(0)};return a.destroy=function(){e.context||u.close()},a},m=t(21);function d(){var e=Object(l.a)(["\n   display:flex;\n   align-items: flex-end;\n   justify-content:center;\n   flex:1;\n   font-size:10em;\n   letter-spacing:1px;\n    max-height: 180px;\n    align-items: center;\n"]);return d=function(){return e},e}var p=m.a.div(d()),x=f({duration:.2}),g=function(e){var n=Object(a.useState)(e.time),t=Object(c.a)(n,2),i=t[0],o=t[1],l=Object(a.useState)(e.time),u=Object(c.a)(l,2),s=u[0],f=u[1],m=function(){if(e.start){var n=s-(new Date-e.start)/1e3;n<=.2?(n=0,o(0),console.warn("ending!"),e.onEnd()):(Math.ceil(i)>Math.ceil(n)&&(n<=3&&x(1),n<=1&&x(2)),o(n))}};return Object(a.useEffect)((function(){var e=requestAnimationFrame(m);return function(){cancelAnimationFrame(e)}}),[i]),Object(a.useEffect)((function(){if(e.start){console.warn("Timer starts! use effect timer start",e,i);var n=requestAnimationFrame(m);return function(){cancelAnimationFrame(n)}}console.log("setting original time"),f(i)}),[e.start]),Object(a.useEffect)((function(){console.log("props.time changed, setting",e.time),f(e.time)}),[e.time]),r.a.createElement(p,null,-1!==i?Math.ceil(i):"fin")},v=t(74),b=t(75),w=t(36),h=t.n(w),E=t(35),O=t.n(E),j=t(13);function y(){var e=Object(l.a)(["\n  flex:1;\n  display:flex;\n  flex-direction:column;\n  justify-content:center;\n  align-items:center;\n\n  background:black;\n\n  padding:20px;\n\n  buttondiv {\n    position:relative;\n    display:flex;\n    flex:1;\n    max-height:50px;\n  }\n  button {\n   text-transform:uppercase;\n   flex:1;\n  }\n\n  counter {\n    display: flex;\n    flex-direction:column;\n    flex:1;\n    font-size:20px;\n    max-height: 40px;\n    align-items: center;\n  }\n\n  .progress {\n    padding-top:15px;\n    width:100px;\n    .MuiLinearProgress-root {\n     height:8px;\n    }\n \n  } \n\n  label {\n   text-transform:capitalize;\n   max-height:50px;\n   font-size:30px;\n   flex:1;\n   align-items:flex-start;\n  }\n\n  sublabel {\n   display:flex;\n   cursor:pointer;\n   max-height:40px;\n   font-size:16px;\n   color:grey;\n   flex:1;\n   align-items:center;\n  }\n\n"]);return y=function(){return e},e}var k=f({duration:.2,interval:150}),A=m.a.div(y());var T=function(e){var n=Object(a.useState)(null),t=Object(c.a)(n,2),i=t[0],o=t[1],l=Object(a.useState)(null),u=Object(c.a)(l,2),s=u[0],f=u[1],m=Object(a.useState)(0),d=Object(c.a)(m,2),p=d[0],x=d[1],w=new URLSearchParams(Object(j.d)().search).get("set");w||(w="1,Get ready,5|9,Work/Rest,30/10");if(Object(a.useEffect)((function(){var e=function(e){var n=[],t=e.split("|"),a=!0,r=!1,i=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var u=o.value,s=u.split(","),f=Object(c.a)(s,3),m=f[0],d=f[1],p=f[2];p=p.split("/").map((function(e){return parseInt(e)})),d=d.split("/"),console.log("parts",m,d,p,u);for(var x=0;x<m*d.length;x++){var g={label:d[x%d.length],time:p[x%p.length]};n.push(g)}}}catch(v){r=!0,i=v}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return console.log("parsed",n),n}(w);f(e)}),[]),Object(a.useEffect)((function(){console.warn("start changed! start from timerset",i)}),[i]),!w)return null;if(!s||!s[p])return null;var E=s.slice(0,p+1).reduce((function(e,n){return e+n.time}),0)/s.reduce((function(e,n){return e+n.time}),0)*100;console.log("progress",E);var y=s[p],T=y.time,z=y.label,S=s[p+1]||{},C=S.time,D=S.label;console.log("label",z,T,p,s);var F=i?r.a.createElement(O.a,null):r.a.createElement(h.a,null);return r.a.createElement(A,null,r.a.createElement("label",null,z),r.a.createElement(g,Object.assign({key:p},{time:T,label:z,running:p},{onEnd:function(){console.warn("on end on timerset!"),o(null),s[p+1]?(x((function(e){return e+1})),o(new Date)):k(3)},start:i})),r.a.createElement("sublabel",{onClick:function(){o(null),s[p+1]&&x((function(e){return e+1}))}},D?"Next: ".concat(D," / ").concat(C):""),r.a.createElement("counter",null,r.a.createElement("div",{className:"progress"},r.a.createElement(b.a,{variant:"determinate",value:E,color:"secondary"}))),r.a.createElement("buttondiv",null,r.a.createElement(v.a,{color:"primary","aria-label":"run",onClick:function(){"suspended"===window.audiocontext.state&&window.audiocontext.resume(),o(i?null:new Date)}},F)))},z=t(26);var S=function(){return r.a.createElement(z.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(T,null)))},C=new(t(37));document.addEventListener("click",(function e(){document.removeEventListener("click",e,!1),console.log("enabling no sleep"),C.enable()}),!1);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.cf08def5.chunk.js.map