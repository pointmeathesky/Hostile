import React, { useEffect, useRef } from "react";
import WindowButtons from "./WindowButtons";

const PostModal: React.FC<{ showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode }> = ({ showModal, setShowModal,
                                        children }) => {
    const elRef = useRef<HTMLDivElement>(document.createElement("div"));

    useEffect(() => {
        const modalRoot = document.getElementById("modal");

        if (!modalRoot || !elRef.current) return;

        modalRoot.appendChild(elRef.current);

        return () => {
            if (modalRoot && elRef.current) {
                modalRoot.removeChild(elRef.current);
            }
        };
    }, []);

    const closeHandler = () => {
        setShowModal(false);
    };
    const handleMinimize = () => {

        console.log("Minimize action");
    };

    const handleMaximize = () => {

        console.log("Maximize action");
    };



    return showModal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative  my-6 w-3/4 xl:w-1/2  mx-auto ">

                    <div
                        className="border border-cus  shadow-lg relative flex flex-col min-w-full bg-panelgray outline-none focus:outline-none">
                        <div className={`flex w-full flex-row  bg-blue-900 `}>
                            {/*<img*/}
                            {/*    src="/channels/eolIM.jpeg"*/}
                            {/*    className="mx-auto h-8"*/}
                            {/*    alt={"alt=\"evergreen online messenger image\""}*/}
                            {/*/>*/}
                            <p className="w-full px-1 text-lg text-white">Post</p>
                            <WindowButtons
                                onMinimize={handleMinimize}
                                onMaximize={handleMaximize}
                                onClose={closeHandler}
                            />
                        </div>
                        <div >
                            {children}
                        </div>
                        {/*<button*/}
                        {/*    className="mt-2 px-2 bg-panelgray border border-cus"*/}
                        {/*    type="button"*/}
                        {/*    onClick={closeHandler}*/}
                        {/*>*/}
                        {/*    Close*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null;
};

export default PostModal;
