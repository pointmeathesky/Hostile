import{j as t,r as n,a as r,c as s,R as i}from"./client-6c7af3ad.js";import"./styles-4ed993c7.js";import{W as l}from"./windowFeed-006bef41.js";import{D as m}from"./Desktop-6148bd56.js";import"./VideoModal-64f77c60.js";import"./js.cookie-edb2da2a.js";import"./Post-24424945.js";function d(){const[a,c]=n.useState([]);return n.useEffect(()=>{fetch("/allposts").then(e=>e.json()).then(e=>{console.log(e),c(e)}).catch(e=>{console.error("Error fetching data:",e)})},[]),t("div",{children:a.map((e,o)=>t("div",{className:"pr-8 pb-8 relative ",children:t("div",{className:`flex-wrap bg-gradient-to-l ${o%2===0?"from-cyan-500 to-blue-500 ":" from-purple-500 to-pink-500"} hover:bg-gradient-to-r border-black border-2 text-center text-black font-bold p-4 mb-4`,children:r("a",{href:`/viewpost/?id=${e.id}`,children:[r("h2",{className:"text-2xl",children:[e.name," "]}),"  ",t("br",{}),r("h2",{className:"text-sm",children:[" by ",e.belongsTo.username]})]})})},o))})}const p=()=>t(m,{content:t(l,{content:t(d,{})})});s.createRoot(document.getElementById("root")).render(t(i.StrictMode,{children:t(p,{})}));
