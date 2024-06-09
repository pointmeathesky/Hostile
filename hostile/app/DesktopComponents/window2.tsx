import React, { useState, useRef } from "react";
import Draggable from 'react-draggable';

const Window = ({ title, children, onClose, onMinimize, zIndex, bringToFront }) => {
  const nodeRef = useRef(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoType, setVideoType] = useState("");

  const handleMinimize = () => {
    setVideoType("minimize");
    setVideoModalOpen(true);
  };

  const handleMaximize = () => {
    setVideoType("maximize");
    setVideoModalOpen(true);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
      <Draggable handle=".draggable-handle" nodeRef={nodeRef}>
        <div
            ref={nodeRef}
            className="fixed bg-panelgray border border-cus max-w-[60%] max-h[90%] min-w-[300px] min-h-[200px] overflow-auto"
            style={{ zIndex }}
            onClick={(e) => {
              e.stopPropagation();
              bringToFront();
            }}
        >
          {/* Top panel */}
          <div className="flex flex-row items-center bg-blue-900 border-b draggable-handle cursor-move">
            <p className="pl-2 text-white text-start">{title}</p>
            <div className="flex ml-auto justify-end pr-1 font-bold">
              <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="bg-panelgray text-xs pr-2 pl-2 border border-cus"
              >
                x
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white mr-1 ml-1 mt-1 mb-2 border-l-2 border-r border-t-2 border-bargray">
            <div className="overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </Draggable>
  );
};

export default Window;
