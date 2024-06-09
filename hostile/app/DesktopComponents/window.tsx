import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ButtonPicker from "../components/ButtonPicker";

const DraggableWindow = ({ title, children, onClose, onMinimize, zIndex, bringToFront }) => {
    const nodeRef = useRef(null);
    const [url, setUrl] = useState("");
    const [isMaximized, setIsMaximized] = useState(false);
    const [originalStyles, setOriginalStyles] = useState({
        top: '0px',
        left: '0px',
        width: '60%',
        height: '90%'
    });
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href + title);
        }
    }, []);

    const handleMaximize = () => {
        if (isMaximized) {
            // Restore original size and position
            nodeRef.current.style.transform = `translate(${deltaPosition.x}px, ${deltaPosition.y}px)`;
            nodeRef.current.style.width = originalStyles.width;
            nodeRef.current.style.height = originalStyles.height;
        } else {
            // Save original size and position
            const rect = nodeRef.current.getBoundingClientRect();
            setOriginalStyles({
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`
            });
            setDeltaPosition({
                x: rect.left,
                y: rect.top
            });
            // Maximize window and reset position
            nodeRef.current.style.transform = 'translate(0, 0)';
            nodeRef.current.style.width = '100%';
            nodeRef.current.style.height = 'calc(100vh - 26px)';
        }
        setIsMaximized(!isMaximized);
    };

    return (
        <Draggable
            handle=".draggable-handle"
            nodeRef={nodeRef}
            disabled={isMaximized}
            position={isMaximized ? { x: 0, y: 0 } : null}
            onStop={(e, data) => setDeltaPosition({ x: data.x, y: data.y })}
        >
            <div
                ref={nodeRef}
                className={`fixed flex flex-col bg-panelgray border border-cus min-w-[300px] min-h-[200px] overflow-hidden ${isMaximized ? 'top-0 left-0 w-full h-[calc(100vh-26px)]' : ''}`}
                style={{ zIndex }}
                onClick={(e) => {
                    e.stopPropagation();
                    bringToFront();
                }}
            >
                {/* Top panel */}
                <div className="flex flex-row items-center bg-bargray border-b draggable-handle cursor-move">
                    <img className="object-contain" src="/inet.png" />
                    <p className="text-white text-start">{title}</p>
                    <div className="flex ml-auto justify-end pr-1 font-bold">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMinimize();
                            }}
                            className="bg-panelgray text-xs pr-1 pl-2 border border-cus"
                        >_</button> {/* minimize button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMaximize();
                            }}
                            className="bg-panelgray text-xs pr-1 pl-1 border border-cus"
                        >{isMaximized ? '🗗' : '□'}</button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="bg-panelgray text-xs pr-2 pl-2 border border-cus"
                        >x</button>
                    </div>
                </div>

                {/* Address bar */}
                <div className="flex flex-row mt-1">
                    <div className="ml-1 px-1 border border-cus cursor-default">Address</div>
                    <div className="bg-white w-full border border-cus2 text-black mr-1 px-1 flex flex-row">
                        <input type="text" className="bg-[url(/inet.png)] bg-center bg-left bg-no-repeat bg-contain pl-8 w-full" defaultValue={url} ></input>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow bg-white mr-1 ml-1 mt-1 border-l-2 border-r border-t-2 border-bargray">
                    <div className="overflow-auto p-2 flex-grow">
                        {children}
                    </div>
                    <div className="flex flex-row h-fit align-bottom w-full justify-center border-b border-bargray">
                        <ButtonPicker />
                    </div>
                </div>

                {/* Bottom panel */}
                <div className="flex flex-row bg-panelgray text-black">
                    <img className="my-1 px-1 self-center" src="/inet.png" />
                    <p className="text-sm self-center">Done</p>
                </div>
            </div>
        </Draggable>
    );
};

export default DraggableWindow;