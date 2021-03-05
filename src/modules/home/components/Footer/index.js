import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './index.css';

import logoDarkSVG from './images/logoDark.svg';
import facebookWhiteSVG from './images/facebookWhite.svg';
import instagramWhiteSVG from './images/instagramWhite.svg';
import twitterWhiteSVG from './images/twitterWhite.svg';
import { Link } from 'react-router-dom';


const Footer = () => (
    <Grid item xs={12} justify="center" style={{ background: "var(--paragraphColor)" }}>
        <Grid item xs={12} md={11} lg={11} justify="center" style={{ padding: "1.5rem", margin: "auto" }}>
            <Grid container spacing={3}>
                <Grid item xs={5} justify="center">
                    <img src={logoDarkSVG} alt="Operativa" />
                </Grid>
                <Grid item xs={3} justify="center">
                    <Grid container spacing={1}>
                        <Grid item xs={12} justify="center">
                            <Typography variant="body2" component="p" className="footer-subtitle">
                                REDES
                            </Typography>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <a href="https://www.facebook.com" rel="noopener noreferrer" target="_blank" title="Facebook">
                                <img src={facebookWhiteSVG} alt="Facebook" />
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="https://www.instagram.com" rel="noopener noreferrer" target="_blank" title="Instagram">
                                <img src={instagramWhiteSVG} alt="Instagram" />
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="https://www.twitter.com" rel="noopener noreferrer" target="_blank" title="Twitter">
                                <img src={twitterWhiteSVG} alt="Twitter" />
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} justify="center">
                    <Grid container spacing={1}>
                        <Grid item xs={12} justify="center">
                            <Typography variant="body2" component="p" className="footer-subtitle">
                                CONTACTO
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={4} lg={3}>
                            <Typography variant="body2" component="p" className="footer-text">
                                Teléfono :
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={8} lg={9}>
                            <Typography variant="body2" component="p" className="footer-text">
                                (01) 247-2829 / 923 890 165
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={4} lg={3}>
                            <Typography variant="body2" component="p" className="footer-text">
                                Mail :
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={8} lg={9}>
                            <Typography variant="body2" component="p" className="footer-text">
                                comercial@operativa.com
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={4} lg={3}>
                            <Typography variant="body2" component="p" className="footer-text">
                                Dirección :
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={8} lg={9}>
                            <Typography variant="body2" component="p" className="footer-text">
                                Jr. Alfonso Ugarte 235, Of.103, Barranco
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
)

export default Footer;
