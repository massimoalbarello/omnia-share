import React from "react";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
};

const Button: React.FC<IProps> = (props) => {
  return (
    <button {...props} className={"bg-white uppercase text-black py-1 px-2 " + props.className}>
      {props.children}
    </button>
  );
};

export default Button;