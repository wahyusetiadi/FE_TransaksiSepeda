import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };
  return (
    <div className="w-auto">
      <Link to={linkTo}>
        <button
          className={`w-full text-nowrap flex items-center rounded gap-2 ${classNameBtn}`}
          onClick={handleClick}
        >
          <div className={className}>{icon}</div>
          <div className={`flex items-start text-sm ${titleColor}`}>
            {title}
          </div>
          <div className="w-full flex justify-end">
            {showArrow &&
              (isOpen ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              ))}
            {endIcon}
          </div>
        </button>
      </Link>
    </div>
  );
};
