import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { resetStore } from "../../../store/actions/global";
import { SectionHeader, SectionLogos, SectionOurProcess, SectionAbout, SectionStatistic, SectionOurPartners, SectionContact } from "../components";

const Home = () => {
    const dispatch = useDispatch()
    
    useState(() => {
        dispatch(resetStore())
    },[])

    return (
        <>
            <SectionHeader />
            <SectionLogos />
            <SectionAbout />
            <SectionOurProcess />
            <SectionStatistic />
            <SectionOurPartners />
            <SectionContact />
        </>
        
    )
}

export default Home;
