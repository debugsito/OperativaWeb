import React, { createContext, useState } from "react";

export const defaultValues = {
    open: false,
    message: "",
    vertical: 'top',
    horizontal: 'right',
    severity: "success"
}
export const ContextNotification = createContext({})

export default function NotificationAlertContext({children}){
    const [notification, setNotification] = useState(defaultValues)

    return (
        <ContextNotification.Provider
            value={{ notification, setNotification }}
        >
            {children}
        </ContextNotification.Provider>
    )
}

