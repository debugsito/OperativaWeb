import React, { useState } from 'react'
import { Typography, makeStyles } from "@material-ui/core";
import { camaraIcon } from "../../images";

const FILE_STATUS = {
    EMPTY: 0,
    LOADING: 1,
    DONE: 2
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateRows: "8fr 2fr",
        background: "#F5F7F9",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
    },
    text: {
        gridRow: "1/2",
        padding: "1.5rem",
    },
    containerImg: {
        margin: "auto"
    },
    profileImg: {
        width: "10rem",
        height: "10rem",
        objectFit: "cover"
    },
    inputFile: {
        display: "none"
    },
    buttonCam: {
        gridRow: "2/3",
        background: "rgba(55, 55, 55, 0.3)",
    },
    labelInput: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))

export default function UploadImage() {
    const classes = useStyles()
    const [hover, setHover] = useState(false)
    const [profileImg, setProfileImg] = useState(null)

    const handleMouse = () => {
        setHover(prevState => !prevState)
    }

    const handleUploadImage = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === FILE_STATUS.DONE) {
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className={classes.root} onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
            {
                profileImg ?
                    <div className={classes.containerImg}>
                        <img src={profileImg} className={classes.profileImg} alt="profile" />
                    </div>
                    :
                    <div className={classes.text}>
                        <Typography variant="body2">Sube el logo de tu empresa en formato jpg/jpeg/png.</Typography>
                        <Typography variant="body2">Peso máximo de 500kb</Typography>
                    </div>
            }
            <input type="file" id="input-upload" onChange={handleUploadImage} accept="image/png, image/jpg, image/jpeg" className={classes.inputFile} />
            {
                hover &&
                <div className={classes.buttonCam}>
                    <label htmlFor="input-upload" className={classes.labelInput}>
                        <img src={camaraIcon} alt="camará" />
                    </label>
                </div>
            }
        </div>
    )
}
