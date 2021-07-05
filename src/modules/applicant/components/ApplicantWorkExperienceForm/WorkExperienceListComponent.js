import React, { useEffect } from 'react'
import WithExperienceComponent from "./WithExperienceComponent"

export default function Workexperiencelistcomponent({ workExperienceList, handleSaveExperience, handleAddWorkExperience, handleDeleteWorkExperience, handleUpdateWorkExperience }) {
    useEffect(() => {
        // console.log("workExperienceList", workExperienceList)
    })
    return (
        <>
            {
                workExperienceList?.map((workExperience, index) =>
                    <WithExperienceComponent
                        key={index}
                        index={index}
                        user={workExperience}
                        length={workExperienceList.length}
                        handleAddWorkExperience={handleAddWorkExperience}
                        handleSaveExperience={handleSaveExperience}
                        handleUpdateWorkExperience={handleUpdateWorkExperience}
                        handleDeleteWorkExperience={handleDeleteWorkExperience}
                    />
                )
            }
        </>
    )

}
