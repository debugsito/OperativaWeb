import Accordion from 'react-bootstrap/Accordion'

export default function CustomAccordion({ children, ...props }) {


    return (
        <div className="accordion-main">
            <Accordion {...props}>
                {
                    children
                    // items.map(item => (                                                                             
                    //     <Accordion.Item eventKey={item.eventKey}>
                    //         <Accordion.Header>{item.title}</Accordion.Header>
                    //         <Accordion.Body>
                    //             {item.body}
                    //         </Accordion.Body>
                    //     </Accordion.Item>
                    // ))
                }
            </Accordion>
        </div>
    )
}
