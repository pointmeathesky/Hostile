import{j as e,a as r,c as t,R as o}from"./client-6c7af3ad.js";import{B as a}from"./browser-5ce86322.js";import"./styles-4ed993c7.js";import"./js.cookie-edb2da2a.js";const m=()=>r("form",{action:"/api/makepost",method:"post",children:[e("input",{className:" mx-2 mt-20 px-2 border border-cus min-w-40",type:"text",placeholder:"Title",name:"name",id:"name"}),e("br",{}),e("textarea",{className:" mx-2 mt-1 px-3 border border-cus min-w-40",placeholder:"Body",name:"body",id:"body"})," ",e("br",{}),e("button",{className:"mt-2 px-2 bg-panelgray border border-cus",type:"submit",children:" Post"})]}),s=()=>e(a,{content:e(m,{})});t.createRoot(document.getElementById("root")).render(e(o.StrictMode,{children:e(s,{})}));