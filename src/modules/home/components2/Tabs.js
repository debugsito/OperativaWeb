import Tabs from 'react-bootstrap/Tabs'

export default function TabsCustom({ children, ...props }) {

    return (
        <div className="container-tabs">
            <Tabs {...props} fill>
                {children}
            </Tabs>
        </div>
    )
}
