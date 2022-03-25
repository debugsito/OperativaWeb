import Tab from 'react-bootstrap/Tab'

export default function TabCustom({ children, ...props }) {

    return (
        <Tab {...props} tabClassName="nav-asda">
            {children}
        </Tab>
    )
}
