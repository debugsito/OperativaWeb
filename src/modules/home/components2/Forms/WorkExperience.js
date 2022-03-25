import React, { useState } from 'react';
import FormWithWorkExperience from "./Forms/FormWithWorkExperience";
import FormWithoutWorkExperience from "./Forms/FormWithoutWorkExperience";
import CheckRadio from './Boostrap/CheckRadio';
import Form from 'react-bootstrap/Form'

const OPTIONS = [
    { label: "Sin experiencia", value: "without_experience" },
    { label: "Con experiencia", value: "with_experience" },
]

export default function WorkExperienceType({ ...props }) {
    const [hasExperience, setHasExperience] = useState("with_experience")

    const handleChange = (e) => {
        setHasExperience(e.target.value)
    }

    return (
        <div className="mt-4">
            <div>
                <Form.Group>
                    {
                        OPTIONS.map((option, index) => (
                            <CheckRadio
                                label={option.label}
                                name="hasExperience"
                                value={option.value}
                                checked={hasExperience === option.value}
                                id={`${option.value}-${index + 1}`}
                                onChange={handleChange}
                            />
                        ))
                    }
                </Form.Group>
            </div>
            {
                hasExperience === "with_experience" &&
                <FormWithWorkExperience {...props} />
            }
            {
                hasExperience === "without_experience" &&
                <FormWithoutWorkExperience {...props} />
            }
        </div>
    )
}
