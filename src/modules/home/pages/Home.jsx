import React from 'react';
import '../styles/Home.css'

import { CardMedia, Grid } from '@material-ui/core';
import { callcenterAndSalesSVG, constructionAndWorksSVG, maintenanceAndCleaningSVG, motorizedAndCourierSVG, productionAndOperationsSVG, warehouseAndTransportationSVG, workersSVG, gloriaPNG, talmaPNG, manpowerPNG, g4sPNG, eulenPNG, ngrPNG, chinalcoPNG, neptuniaPNG, rokysPNG, centralPNG, aratoPNG, autopistaPNG, goldPNG, iqfarmaPNG, adexPNG, casapalcaPNG, camposolPNG, antapaccayPNG, sunpharmaPNG, haugPNG, cipsaPNG, dbPNG, cruzPNG, latinaPNG, skanskaPNG, aresPNG, tataPNG, sgsPNG, tailoyPNG, civaPNG, workerManSVG } from '../images';

import { Button, Link, Typography } from '../../shared/components';
import { BusinessCarousel, Footer } from '../components';

const mostProductiveSectors = [
    { id: "productionAndOperations", img: productionAndOperationsSVG, name: "Producción y operaciones" },
    { id: "maintenanceAndCleaning", img: maintenanceAndCleaningSVG, name: "Mantenimiento y limpieza" },
    { id: "warehouseAndTransportation", img: warehouseAndTransportationSVG, name: "Almacén y transporte" },
    { id: "callcenterAndSales", img: callcenterAndSalesSVG, name: "Call-center y ventas" },
    { id: "constructionAndWorks", img: constructionAndWorksSVG, name: "Construcción y obras" },
    { id: "motorizedAndCourier", img: motorizedAndCourierSVG, name: "Motorizados y courier" },
]

const businessItems1 = [
    {
        name: "Electronics",
        items: [
            {
                name: "Gloria",
                image: gloriaPNG
            },
            {
                name: "Talma",
                image: talmaPNG
            },
            {
                name: "Manpower",
                image: manpowerPNG
            },

        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "G4S",
                image: g4sPNG
            },
            {
                name: "Eulen",
                image: eulenPNG
            },
            {
                name: "Ngr",
                image: ngrPNG
            }
        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "Chinalco",
                image: chinalcoPNG
            },
            {
                name: "Neptunia",
                image: neptuniaPNG
            },
            {
                name: "Rokys",
                image: rokysPNG
            }
        ]
    },
]

const businessItems2 = [
    {
        name: "Electronics",
        items: [
            {
                name: "Central",
                image: centralPNG
            },
            {
                name: "Arato",
                image: aratoPNG
            },
            {
                name: "Autopista",
                image: autopistaPNG
            }
        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "Gold",
                image: goldPNG
            },
            {
                name: "IqFarma",
                image: iqfarmaPNG
            },
            {
                name: "Adex",
                image: adexPNG
            }
        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "CasaPalca",
                image: casapalcaPNG
            },
            {
                name: "CampoSol",
                image: camposolPNG
            },
            {
                name: "Antapaccay",
                image: antapaccayPNG
            }
        ]
    },
]

const businessItems3 = [
    {
        name: "Electronics",
        items: [
            {
                name: "SunPharma",
                image: sunpharmaPNG
            },
            {
                name: "haug",
                image: haugPNG
            },
            {
                name: "Cipsa",
                image: cipsaPNG
            }
        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "Db",
                image: dbPNG
            },
            {
                name: "Cruz",
                image: cruzPNG
            },
            {
                name: "Latina",
                image: latinaPNG
            }
        ]
    },
]

const businessItems4 = [
    {
        name: "Electronics",
        items: [
            {
                name: "Skanska",
                image: skanskaPNG
            },
            {
                name: "Ares",
                image: aresPNG
            },
            {
                name: "Tata",
                image: tataPNG
            }
        ]
    },
    {
        name: "Electronics",
        items: [
            {
                name: "Sgs",
                image: sgsPNG
            },
            {
                name: "Tailoy",
                image: tailoyPNG
            },
            {
                name: "Civa",
                image: civaPNG
            }
        ]
    }
]

const Home = ({ history }) => {
    console.log("PATH",process.env.REACT_APP_PATH_LANDING)
    const goSignUpPage = () => {
        history.push("/tipo-de-cuenta")
    }
    const  goLoginPage = () => {
        history.push("/iniciar-sesion")
    }
    window.location.href = process.env.REACT_APP_PATH_LANDING

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} justify="center">
                <Grid item xs={12} md={10} lg={9} justify="center" style={{ paddingBottom: "4rem", margin: "auto" }}>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginTop: "5rem" }}>
                                    <Typography variant="h3" component="h3">
                                        Encuentra el trabajo que buscabas en nuestra plataforma especializada en personal operativo.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" size="large" onClick={goLoginPage}>inicia sesión</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" size="large" onClick={goSignUpPage}>crea tu cuenta</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" component="p">
                                        Si eres una Municipalidad y quieres unirte a nuestra red, llena la&nbsp;
                                        <Link href="#" underline="always">solicitud de registro</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} className="home__image-container" style={{ marginTop: "2rem" }}>
                            <img src={workersSVG} alt="" />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} justify="center" style={{ background: "var(--smokeWhiteColor)" }}>
                <Grid item xs={12} md={10} lg={9} justify="center" style={{ padding: "4rem", margin: "auto" }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h4" align="center" className="title-color">
                                Los sectores más productivos
                            </Typography><br />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                {
                                    mostProductiveSectors.map(sector => (
                                        <Grid item xs={2} key={sector.id} style={{ padding: "1rem" }}>
                                            <CardMedia
                                                component="img"
                                                image={sector.img}
                                                alt={sector.name}
                                                title={sector.name}
                                            />
                                            <Typography paragraph align="center">
                                                {sector.name}
                                            </Typography>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} justify="center">
                <Grid item xs={12} md={10} lg={9} justify="center" style={{ padding: "4rem", margin: "auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h5" className="title-color">
                                Trabaja con las empresas más reconocidas del país
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <BusinessCarousel items={businessItems1} />
                                </Grid>
                                <Grid item xs={6}>
                                    <BusinessCarousel items={businessItems2} />
                                </Grid>
                                <Grid item xs={6}>
                                    <BusinessCarousel items={businessItems3} />
                                </Grid>
                                <Grid item xs={6}>
                                    <BusinessCarousel items={businessItems4} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} justify="center" style={{ background: "var(--smokeWhiteColor)" }}>
                <Grid item xs={12} md={10} lg={9} justify="center" style={{ padding: "1rem", margin: "auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={7} justify="center">
                            <img src={workerManSVG} alt="Operativa" style={{ display: "flex", margin: "auto" }} />
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: "2rem" }}>
                            <Typography variant="h4" component="h4" className="title-color">
                                ¿Cómo inscribirte?
                            </Typography><br />
                            <Typography variant="h5" component="h5" className="title-color">
                                Inscríbete completando el formulario con tus datos.
                            </Typography><br />
                            <Button variant="contained" size="large" onClick={goSignUpPage}>buscar empleo</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </Grid>
    )
}

export default Home;
