import React from "react";

export const Button = React.forwardRef<HTMLButtonElement>((props, ref) => {
    return <button ref={ref}></button>
})