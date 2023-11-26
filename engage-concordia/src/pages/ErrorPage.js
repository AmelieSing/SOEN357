import React, { useState, useEffect } from "react";

export default function ErrorPage(){


    const [title, setTitle] = useState("Engage Concordia - Error");

    useEffect(() => {
      document.title = title;
    }, [title]);

    return(
        <div>
            <h2>Error Page</h2>
        </div>
    )
}