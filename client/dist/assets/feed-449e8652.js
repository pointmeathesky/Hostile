import{r as a,a as l,j as o}from"./client-6c7af3ad.js";import{W as r,V as c,D as d}from"./Desktop-60d1b681.js";const m=({content:s})=>{const[n,e]=a.useState(!1),[t,i]=a.useState("");return l("div",{className:"flex flex-col justify-evenly w-1/2 h-full mr-6 ",children:[l("div",{className:"flex justify-stretch flex-col bg-panelgray border border-cus",children:[l("div",{className:"flex flex-row bg-blue-900 mx-1",children:[o("img",{src:"/channels/eolIM.jpeg",className:"mx-auto h-8",alt:'alt="evergreen online messenger image"'}),o("p",{className:"w-full px-1 text-lg text-white",children:"Feed"}),o(r,{onMinimize:()=>{i("minimize"),e(!0),console.log("Minimize action")},onMaximize:()=>{i("maximize"),e(!0),console.log("Maximize action")},onClose:()=>{i("close"),e(!0),console.log("Close action")}})]}),o("div",{className:"mx-2 my-2 border-2 bg-[url('../static/background.jpg')] md:flex-1 overflow-y-auto ",children:o("div",{className:"flex flex-row text-black overflow-y-auto max-h-[80vh] justify-center mt-2",children:s})})]}),n&&o(c,{isOpen:n,onRequestClose:()=>e(!1),contentLabel:"Video Modal",videoId:t==="minimize"?"dQw4w9WgXcQ":t==="maximize"?"TLfZ5Sb1EGw":"lAkuJXGldrM"})]})};function h(){const[s,n]=a.useState([]);return a.useEffect(()=>{fetch("/allposts").then(e=>e.json()).then(e=>{console.log(e),n(e)}).catch(e=>{console.error("Error fetching data:",e)})},[]),o("div",{children:s.map((e,t)=>o("div",{className:"pr-8 pb-8 relative ",children:l("div",{className:`flex-wrap bg-gradient-to-l ${t%2===0?"from-cyan-500 to-blue-500 ":" from-purple-500 to-pink-500"} hover:bg-gradient-to-r border-black border-2 text-center text-black font-bold p-4 mb-4`,children:[l("h2",{className:"text-2xl",children:[e.name," "]}),"  ",o("br",{}),l("h2",{className:"text-sm",children:["  by ",e.belongsTo.username]}),o("p",{className:"text-md",children:e.body})]})},t))})}const p=()=>o(d,{content:o(m,{content:o(h,{})})});export{p as C};