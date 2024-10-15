import React from 'react'
import WithExperienceComponent from "./WithExperienceComponent"

export default function Workexperiencelistcomponent({ workExperienceList, handleSaveWithExperience, handleAddWorkExperience, handleDeleteWorkExperience, handleUpdateWorkExperience,setOption }) {
    return (
        <>
            {
                workExperienceList?.map((workExperience, index) =>
                    <>
                        <WithExperienceComponent
                            handleUpdateWorkExperience={handleUpdateWorkExperience}
                            handleDeleteWorkExperience={handleDeleteWorkExperience}
                            handleAddWorkExperience={handleAddWorkExperience}
                            handleSaveWithExperience={handleSaveWithExperience}
                            index={index}
                            length={workExperienceList.length}
                            key={index}
                            user={workExperience}
                            setOption = {setOption}
                        />
                    </>
                )

            }
        </>
    )

}
