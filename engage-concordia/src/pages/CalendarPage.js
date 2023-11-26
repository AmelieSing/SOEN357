import React, { useState, useEffect } from "react";

export default function CalendarPage(){


    const [title, setTitle] = useState("Engage Concordia - Calendar");

    useEffect(() => {
      document.title = title;
    }, [title]);

    return(
        <div>
            <h2>Calendar Page</h2>
        </div>
    )
}