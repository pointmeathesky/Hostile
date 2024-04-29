import Browser from "./browser";
import React from "react";

const Form = ()=>{
return(
    
    <form className="flex flex-col mb-2 h-min justify-items-center border border-cus self-center bg-panelgray" action="/api/makepost" method="post">

        <input className=" mx-2 mt-20 px-2 border border-black min-w-40" type="text" placeholder="Title" name="name" id="name"/><br></br>
        <textarea className="h-full shadow min-h-20 mx-2 mt-1 px-3 border border-black min-w-40" placeholder="Body" name="body" id="body"/> <br></br>
        <button className=" mt-2  px-2 bg-bargray border border-cus" type="submit">Create Post</button>

    </form>
   
)
}

const Post = () => {
    return(
    <Browser content={<Form/>}/>
    )
}

export default Post