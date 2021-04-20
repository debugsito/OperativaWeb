import React from 'react';
import { SectionHeader, SectionOurProcess, SectionAbout, SectionStatistic, SectionOurPartners, SectionContact } from "../components";
import '../styles/index.css'



const Home = () => {
    

    return (
        <>
            <SectionHeader />
            <SectionAbout />
            <SectionOurProcess />
            <SectionStatistic />
            <SectionOurPartners />
            <SectionContact />
        </>
        
    )
}

export default Home;
