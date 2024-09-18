import React from "react";

export default function ErrorComponent({children}: React.PropsWithChildren) {
    return (
        <p>Error: {children}</p>
    )
}