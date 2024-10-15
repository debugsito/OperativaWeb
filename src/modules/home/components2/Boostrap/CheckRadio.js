import React from 'react'
import Form from 'react-bootstrap/Form'

export default function CheckRadio({ label, ...props }) {


    return (
        <Form.Check type="radio" inline>
            <Form.Check.Input type="radio" {...props} />
            <Form.Check.Label for={props?.id}>{label}</Form.Check.Label>
        </Form.Check>
    )
}
