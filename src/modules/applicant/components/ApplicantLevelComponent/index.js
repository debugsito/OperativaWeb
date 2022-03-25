import React from "react";
import './index.css';
import {
    goldSvg,
    silverSvg,
    woodSvg,
    bronceSvg
} from '../../../shared/images/postulant/levels'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}));



const ApplicantLevelComponent= (props) =>{
    const classes = useStyles();
    const { job_hunting_account } = props;
    const size = 95;

    const getImageByLevel = (level_id) => {
        switch (level_id) {
            case 1:
                return <img src={woodSvg} alt="" width={size} heigth={size}></img>;
            case 2:
                return <img src={bronceSvg} alt="" width={size}  heigth={size} ></img>;
            case 3:
                return <img src={silverSvg} alt="" width={size}  heigth={size} ></img>;
            case 4:
                return <img src={goldSvg} alt="" width={size}  heigth={size} ></img>;
            default:
                return <></>;
        }
    }

    return (
        <> {
            job_hunting_account ? <div className="container-base-level">
                <div className="container-points">
                    <span>Llevas</span>
                    <span> {job_hunting_account?.points} pts</span>
                </div>
                <div className="container-level">
                    {getImageByLevel(job_hunting_account?.level?.id)}
                    <span>Nivel {job_hunting_account?.level?.name}</span>
                </div>
            </div> : <></>
        }
        </>
    )
}

export default ApplicantLevelComponent;