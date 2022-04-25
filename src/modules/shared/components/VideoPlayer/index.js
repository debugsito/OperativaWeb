import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    containerVideo: {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "450px",
        height: "300px"
    },
    closeButton: {
        background: "#000",
        color: "#fff",
        
        width: "32px",
        height: "32px",
        position:"absolute",
        top:"-33px",
        right:"0",

        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",

        fontSize:"1.2em",
        fontWeight:"600"
    }
}))

const VideoPlayer = ({ openVideo, onClose, url="https://www.youtube.com/watch?v=E6JTH9Q40A8" }) => {
    const classes = useStyles()

    const youTubeGetID = (url) => {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    if (!openVideo) {
        return null
    }
    return (
        <div className={classes.containerVideo}>
            <iframe id="player" type="text/html"
            allowfullscreen='allowfullscreen'
                // width="640" height="360"
                style={{ width: "100%", height: "100%" }}
                src={`https://www.youtube.com/embed/${youTubeGetID(url)}`}
                frameborder="0">
            </iframe>
            <div className={classes.closeButton} onClick={onClose}>X</div>
        </div>
    )
}

VideoPlayer.propTypes = {
    openVideo: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}

export default VideoPlayer
