import React, { useState } from 'react'
import { Divider, Grid } from "@material-ui/core";
import { Button, Typography } from "../../../shared/components";
import { editIcon } from "../../images";
import { useSelector } from 'react-redux';
import UploadImage from "./UploadImage";


export default function Showprofile({ setIsEditActive, userData }) {
    const { auth: { user: { account } }, utils: { items } } = useSelector(state => state);

    const getNameSpecialityById = (rubro_id) => {
        if (rubro_id === "") {
            return ""
        } else {
            const rubro = items.filter(item => item.id === rubro_id)
            return rubro[0]?.name
        }
    }
    return (
        <>
            <Grid item xs={9}>
                <Typography variant="h6" component="h6">
                    <strong>{account.role == "business" ? "Datos de la empresa" : "Datos de la municipalidad"}</strong>
                </Typography>
            </Grid>
            <Grid
                item
                xs={3}
                justify="flex-end"
                className="edit-container"
            >
                <Button onClick={() => setIsEditActive(true)}>
                    <img src={editIcon} />
                    <span className="dashboard-title">EDITAR</span>
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="subtitle2" component="h6">
                    <strong>Razón social</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.razon_social}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>RUC</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.document_number}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Teléfono</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.phone}
                </Typography>
                <br />
                {
                    account.role == "business" &&
                    <>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Rubro</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {getNameSpecialityById(userData.rubro)}
                        </Typography>
                    </>
                }

            </Grid>
            <Grid item xs={4}>
                <UploadImage />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    <strong> Datos del representante</strong>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" component="h6">
                    <strong>Nombre</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.first_name}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Apellidos</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.last_name}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Correo electrónico</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.email}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Cargo</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.position}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Área</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {userData.area}
                </Typography>
            </Grid>
        </>
    )
}
