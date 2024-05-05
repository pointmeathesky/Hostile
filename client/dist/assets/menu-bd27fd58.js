import{r as c,a as l,j as e,R as d,c as m}from"./client-6c7af3ad.js";import"./styles-4ed993c7.js";import{W as g,D as b}from"./Desktop-6148bd56.js";import{V as h,R as p}from"./VideoModal-64f77c60.js";import"./js.cookie-edb2da2a.js";import"./Post-24424945.js";const u=({content:i})=>{const[n,a]=c.useState(!1),[t,r]=c.useState("");return l("div",{className:"flex flex-col justify-evenly max-h-screen",children:[l("div",{className:"flex justify-stretch flex-col bg-panelgray 20 border border-cus",children:[l("div",{className:"flex flex-row bg-blue-900 mx-1",children:[e("img",{src:"/channels/eolIM.jpeg",className:"mx-auto h-8",alt:'alt="evergreen online messenger image"'}),e("p",{className:"w-full px-1 text-lg text-white",children:"Main Menu"}),e(g,{onMinimize:()=>{r("minimize"),a(!0),console.log("Minimize action")},onMaximize:()=>{r("maximize"),a(!0),console.log("Maximize action")},onClose:()=>{r("close"),a(!0),console.log("Close action")}})]}),e("div",{className:"mx-2 my-2 border-2 border-bargray md:flex-1 overflow-y-auto",children:e("div",{className:"flex flex-row text-black",children:i})})]}),n&&e(h,{isOpen:n,onRequestClose:()=>a(!1),contentLabel:"Video Modal",videoId:t==="minimize"?"dQw4w9WgXcQ":t==="maximize"?"TLfZ5Sb1EGw":"lAkuJXGldrM"})]})},x=({isOpen:i,onRequestClose:n,contentLabel:a,imageUrl:t})=>e(p,{isOpen:i,onRequestClose:n,contentLabel:a,style:{overlay:{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.5)"},content:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"20px",border:"none",borderRadius:"8px",outline:"none",backgroundColor:"white",overflow:"visible",width:"80%",maxWidth:"500px",height:"300px",boxSizing:"border-box"}},children:e("img",{src:t,alt:"Modal Image",style:{width:"100%"}})}),f=()=>{const i=[{label:"",url:"https://gavin-bowers.arcology.builders/",image:"entertainment.png"},{label:"",url:"",image:"health.png"},{label:"",url:"https://lanchess.arcology.builders/",image:"games.png"},{label:"",url:"https://macin.arcology.builders/",image:"computing.png"},{label:"",url:"https://macin.arcology.builders/",image:"research.png"},{label:"",url:"/api/allusers",image:"connected.png"}],[n,a]=d.useState(!1),t="/channels/E-Mug-shot.jpg",r=()=>{a(!0)};return e("div",{className:"flex",style:{backgroundImage:'url("/channels/subtle-background.jpg")',backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},children:e("div",{className:"flex-3",style:{width:"100%"},children:l("div",{className:"menu",children:[e("div",{children:e("h2",{className:"text-6xl font-bold py-4 px-36 text-center",children:"Channels"})}),e("div",{className:"flex-1 flex justify-center pb-4",children:e("img",{src:"https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/at-t-the-first-banner-1994.png",alt:"The first web banner AT&T 1994",title:"The first web banner AT&T 1994"})}),l("div",{className:"flex flex-wrap items-center",children:[i.map((s,o)=>e("div",{className:"w-1/2 pr-8 pb-8 relative",children:e("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",children:e("div",{className:"bg-bargray hover:bg-panelgray border-black border-2 text-white font-bold py-4 m-2 w-full",style:{height:"50px",boxShadow:"30px 35px 60px -15px rgba(0, 0, 0, 0.9)",backgroundImage:`url(/channels/${s.image})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},children:s.label})})},o)),e("div",{className:"bannerAd flex items-center justify-center w-full h-full pb-6",children:e("a",{children:e("img",{className:"border border-black",src:"https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/macromedia-flash-3-1998.gif",alt:"Macromedia Flash 3.0 1998",title:"Macromedia Flash 3.0 1998"})})})]}),l("div",{className:"flex-1 flex justify-end pr-8 pb-4",children:[e("div",{className:"pr-4",children:e("img",{src:"https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/get-flash-player-1996.gif",alt:"Get Flash Player banner 1996",title:"Get Flash Player 1996"})}),e("div",{className:"pr-4",children:e("img",{src:"https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/netscape-1995.gif",alt:"Netscape banner 1995",title:"Netscape 1995"})}),l("div",{children:[e("div",{className:"pr-4",onClick:r,children:e("img",{src:"https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/internet-explorer-1996.gif",alt:"Internet Explorer banner 1996",title:"Internet Explorer 1996"})}),e(x,{isOpen:n,onRequestClose:()=>a(!1),contentLabel:"Mug shot",imageUrl:t})]})]})]})})})},w=()=>e(b,{content:e(u,{content:e(f,{})})});m.createRoot(document.getElementById("root")).render(e(d.StrictMode,{children:e(w,{})}));
