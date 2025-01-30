import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const ButtonIcon = ({
  icon,
  title,
  className,
  classNameBtn,
  onClick,
  titleColor,
  showArrow = true,
  endIcon,
  linkTo,
  state, // Accept state prop to pass with navigation
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();

    if (linkTo) {
      navigate(linkTo, { state }); // Passing state with navigation
    }
  };

  return (
    <div className="w-auto">
      <button
        className={`w-full text-nowrap flex items-center rounded gap-2 ${classNameBtn}`}
        onClick={handleClick}
      >
        <div className={className}>{icon}</div>
        <div className={`flex items-start text-sm ${titleColor}`}>{title}</div>
        <div className="w-full flex justify-end">
          {showArrow && <ChevronDownIcon className="size-4" />}
          {/* {showArrow &&
            (isOpen ? (
              <></>
            ) : (
              // <ChevronUpIcon className="size-4" />
              // <ChevronDownIcon className="size-4" />
              <></>
            ))} */}
          {endIcon}
        </div>
      </button>
    </div>
  );
};
