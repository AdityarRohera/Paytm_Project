import type { ReactElement } from "react";

interface ButtonType {
    variant : 'primary' | 'secondary' | 'tertiary';
    size : 'sm' | 'md' | 'lg';
    text : string
     startIcon? : ReactElement;
    endIcon? : ReactElement;
    onClick? : (e: any) => void;
    type? : "submit" | "reset" | "button";
}

 const buttonVariant = {
    primary : "bg-gray-600 text-white",
    secondary : "bg-purple-200 text-purple-600",
    tertiary : "bg-red-600 text-white"
 }

const buttonSize = {
    sm : "w-[50px] , h-[50px]",
    md : "w-[60px] , h-[50px]",
    lg : "w-[200px] , h-[50px]"
}

const commonVariant = {
    property : " rounded-2xl text-[20px] fond-medium flex justify-center items-center gap-4"
}

function Button({variant , size , text , type, startIcon , endIcon , onClick} : ButtonType) {
  return (
    <div>
      <button className={ ` ${buttonVariant[variant]} ${buttonSize[size]} ${commonVariant["property"]}`} type={type} onClick={onClick}>
        {startIcon ? startIcon : ""}
        {text}
        {endIcon ? endIcon : ""}
      </button>
    </div>
  )
}

export default Button;
