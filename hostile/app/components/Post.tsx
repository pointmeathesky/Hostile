import Browser from "./browser";
import React, {useState} from "react";
import PostModal from "./postModal";
import Desktop from "../Desktop";

const Contents = () => {
    const [showModal, setShowModal] = useState(false);

    const Form = () => {
        return (

            <form
                className="flex flex-col pt-6   min-w-full justify-items-center content-center  self-center bg-panelgray"
                action="/api/makepost" method="post">

                <input className=" mx-4 p-2 xs:min-w-80 sm:min-w-96  text-l border border-black " type="text" placeholder="Title"
                       name="name" id="name"/><br></br>
                <textarea className="mx-4 min-h-48 mt-2 p-2  text-m   border border-black min-w-40" placeholder="Body" name="body"
                          id="body"/> <br></br>
                <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">Create Post</button>

            </form>

        )
    }
    const openModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <button
                className="bg-panelgray active:bg-bargray font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg
                border border-cus outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={openModal}
            >
                Modify Account
            </button>
            <PostModal showModal={showModal} setShowModal={setShowModal}>

                <Form/>
            </PostModal>

        </div>
    )
}

const Post = () => {
    return (

        <form
            className="flex flex-col pt-6   min-w-full justify-items-center content-center  self-center bg-panelgray"
            action="/api/makepost" method="post">

            <input className=" mx-4 p-2 xs:min-w-80 sm:min-w-96  text-l border border-black " type="text" placeholder="Title"
                   name="name" id="name"/><br></br>
            <textarea className="mx-4 min-h-48 mt-2 p-2  text-m   border border-black min-w-40" placeholder="Body" name="body"
                      id="body"/> <br></br>
            <button className="w-full mt-2 px-2 bg-bargray border border-cus" type="submit">Create Post</button>

        </form>

    )
}


export default Post