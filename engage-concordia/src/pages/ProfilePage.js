import React, { useState, useEffect } from "react";

export default function ProfilePage(){

    const [title, setTitle] = useState("Engage Concordia - Profile");

    useEffect(() => {
      document.title = title;
    }, [title]);

    return(
        <div>
            <h2>Profile Page</h2>
        </div>
    )
}