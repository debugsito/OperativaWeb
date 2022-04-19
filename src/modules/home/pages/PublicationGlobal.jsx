
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function PublicationGlobal() {
    const { title } = useParams();

    return (

        <div>
            <h1>{title}</h1>
        </div>

    )

}