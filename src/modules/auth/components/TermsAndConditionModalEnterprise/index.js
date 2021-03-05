import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, Typography } from '@material-ui/core';
import { Button } from '../../../shared/components';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const randValue = rand();
    const top = 50 + randValue;
    const left = 50 + randValue;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        outline: 'none'
    };
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "90vw",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 8, 4),
    },
}))

export default function TermsAndConditionModal({ handleClose, ...props }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" className="title-color" style={{ textAlign: "center", marginBottom: "2rem" }}>
                    TÉRMINOS Y CONDICIONES DEL SERVICIO
                </Typography>
            </Grid>
            <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: "hidden" }}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                            1. ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES DEL SERVICIO
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="span" style={{ fontWeight: 100 }}>
                            Gracias por utilizar los servicios de <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong>. El servicio que desea contratar está sujeto a los Términos y Condiciones que usted <strong>EMPRESA CLIENTE</strong> ha aceptado al suscribir el Contrato de Servicios o Alianza Estratégica.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> proveerá a usted <strong>EMPRESA CLIENTE</strong> sus servicios de acuerdo a lo establecido en el Contrato o Alianza Estratégica y los siguientes Términos y Condiciones de Servicio (TCS), los cuales, podrán ser periódicamente actualizados por <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> sin notificación previa. Usted <strong>EMPRESA CLIENTE</strong> podrá revisar la versión más reciente de los TCS en todo momento en esta misma ubicación: <em>"Términos y Condiciones de Servicio"</em>.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Es importante hacer de conocimiento de los TCS a los colaboradores usuarios del servicio brindado para evitar el uso inadecuado de los informes proporcionados y no vulnerar la confidencialidad de la información.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            2. DESCRIPCIÓN DEL SERVICIO
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Usted <strong>EMPRESA CLIENTE</strong> conviene en contratar a <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong>, para que preste el servicio de bolsa laboral; los procesos de reclutamiento de personal proporcionan datos personales, laborales, académicos y verificación de datos personales de los postulantes, en base a información brindada bajo su consentimiento para uso público. <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> generará reportes o informes con estimaciones de contratación, riesgo y nivel de permanencia para la gestión de Recursos Humanos de usted <strong>EMPRESA CLIENTE</strong>.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> no se hace responsable por la inexactitud que pudiera llegar a existir en la información brindada por los postulantes o por cualquier daño o perjuicio que pudiera resultar de su uso no autorizado. Toda vez que, el uso de esos datos personales se encuentra protegida por la Ley Nº 29733 - Ley de Protección de Datos Personales.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> brinda información obtenida por los usuarios registrados y de carácter público, difundida a las empresas registradas en nuestro sistema al contar con autorización del Ministerio de Justicia y Derechos Humanos, a través de <strong>RESOLUCIÓN DIRECTORAL Nº 32-2019-JUS/DGTAIPD-DPDP. SOLUCIONES EN GESTIÓN DE PERSONAL</strong> de acuerdo a la <strong>Ley N° 27806</strong> - <em>Ley de Transparencia y Acceso a Información Pública</em>, no vulnera de forma alguna el derecho al trabajo y el principio de igualdad de oportunidades sin discriminación.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> no se hace responsable ni reconoce el uso o empleo posterior que usted <strong>EMPRESA CLIENTE</strong> le dé al documento de la información. Usted <strong>EMPRESA CLIENTE</strong> es responsable del uso de los datos del postulante y resultados de verificación de datos.
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> sólo recibirá requerimientos de publicación de ofertas laborales de las personas autorizadas por usted <strong>EMPRESA CLIENTE</strong> y registradas como usuarios en la Plataforma Operativa.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            3. OBLIGACIONES DE LA EMPRESA CLIENTE
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Como una condición esencial para usar el servicio, usted <strong>EMPRESA CLIENTE</strong> declara que posee capacidad legal para contratar y que no posee ningún impedimento para recibir servicios bajo las leyes del Perú. Asimismo, usted <strong>EMPRESA CLIENTE</strong> se obliga a proveer los datos completos para su registro de usuario.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Si usted <strong>EMPRESA CLIENTE</strong> suministra información que es falsa, inexacta, desactualizada o incompleta, o si <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> tiene bases razonables para sospechar que dicha información es falsa, inexacta, desactualizada o incompleta, tendrá el derecho de resolver el Contrato o Alianza Estratégica de pleno derecho y negarle el uso presente o futuro del servicio. <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> se preocupa por la seguridad y privacidad de sus usuarios.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            4. CUENTA DE USUARIO, CONTRASEÑA Y SEGURIDAD
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Luego de completar el proceso de registro, usted <strong>EMPRESA CLIENTE</strong> recibirá una contraseña y una designación de cuenta. La <strong>EMPRESA CLIENTE</strong> será responsable de mantener la confidencialidad de la contraseña y de la cuenta, siendo también único y absoluto responsable por todos los eventos que ocurran bajo su contraseña o cuenta. Usted <strong>EMPRESA CLIENTE</strong> se compromete a: a) notificar inmediatamente a <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> de cualquier uso no autorizado de su contraseña o cuenta o de cualquier otra violación de seguridad, y b) asegurarse de que su cuenta sea cerrada al final de cada sesión. <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> no será responsable por ninguna pérdida o daño que resulte como consecuencia de su incumplimiento a las disposiciones de este artículo.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            La Plataforma Operativa puede contener enlaces a otros sitios web, si usted <strong>EMPRESA CLIENTE</strong> da clic a estos enlaces, abandonará la plataforma y al no tener control sobre el sitio web redireccionado, <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> no se responsabiliza de la privacidad ni protección de sus datos personales en sitios terceros.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            5. INDEMNIDAD
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Usted <strong>EMPRESA CLIENTE</strong> se compromete a indemnizar, mantener indemne y libre de daños a <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong>, de cualquier reclamo o demanda iniciados por terceros debido a o con origen del uso inadecuado del informe de verificación personal de los postulantes registrados en la Plataforma Operativa, facilitados por usted <strong>EMPRESA CLIENTE</strong> vulnerando la confidencialidad de la información.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            6. PROHIBICIÓN DE REVENDER EL SERVICIO
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Usted <strong>EMPRESA CLIENTE</strong> se compromete a no reproducir, duplicar, copiar, vender, comercializar, revender o explotar con cualquier propósito comercial ninguna parte del servicio <em>(incluyendo su nombre de usuario o contraseña de Plataforma Operativa)</em>, uso del servicio o acceso al servicio a terceros que no forman parte de la relación contractual, bajo causal expresa de resolver el Contrato o Alianza Estratégica.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            7. TERMINACIÓN
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Usted <strong>EMPRESA CLIENTE</strong> acepta que <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> puede, bajo ciertas circunstancias y sin necesidad de notificación previa, cancelar y terminar inmediatamente su cuenta en Plataforma Operativa, cualquier dirección de correo electrónico asociada y su acceso al servicio. Entre las causales de terminación se incluyen, sin limitarse: a) incumplimientos o violaciones a estos TCS, Contrato de o Alianza Estratégica; b) requerimientos de autoridades legales o gubernamentales; c) su solicitud (terminación de cuenta por requerimiento del usuario); d) terminación o modificaciones sustanciales al servicio (o cualquier parte del mismo); e) problemas técnicos o de seguridad inesperados (caso fortuito o fuerza mayor). La terminación de su cuenta en Plataforma Operativa incluye: a) la cancelación del acceso a todas las funciones de la Plataforma Operativa; b) el borrado de su clave y de toda la información relacionada, ofertas laborales dentro de su cuenta y c) prohibir el uso posterior del servicio. Asimismo, usted <strong>EMPRESA CLIENTE</strong> acepta que todas las causales de terminación con causa podrán ser invocadas por <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> a su única discreción y que <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> no será responsable frente a usted <strong>EMPRESA CLIENTE</strong> ni frente a ningún tercero por cualquier terminación de su cuenta, y las direcciones de correo electrónico asociada o acceso al servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            8. NOTIFICACIÓN
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Las notificaciones, incluyendo aquellas relativas a cambios a los TCS, podrán ser enviadas por medio del correo electrónico o correo regular o anunciar en el servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            9. INFORMACIÓN DE LAS MARCAS REGISTRADAS
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Las marcas del servicio de <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> y <strong>PLATAFORMA OPERATIVA</strong>, así como otros servicios son de titularidad de <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong>. Usted <strong>EMPRESA CLIENTE</strong> se obliga a no mostrar o usar de ninguna manera las marcas <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> y <strong>PLATAFORMA OPERATIVA</strong> sin autorización previa o escrita de <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong>.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            10. INFORMACIÓN GENERAL
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Acuerdos Únicos: Los TCS, el Contrato y/o Alianza Estratégica constituyen los únicos acuerdos entre usted <strong>EMPRESA CLIENTE</strong> y <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> y gobiernan su uso del servicio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Ley Aplicable y Jurisdicción: Los TCS, el Contrato y/o Alianza Estratégica y la relación entre usted <strong>EMPRESA CLIENTE</strong> y <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> serán regidos por las leyes de la República del Perú, sin perjuicio de las disposiciones aplicables acerca de conflicto de leyes.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" style={{ fontWeight: 100 }}>
                            Usted <strong>EMPRESA CLIENTE</strong> y <strong>SOLUCIONES EN GESTIÓN DE PERSONAL</strong> acuerdan expresamente en someterse a la jurisdicción de los tribunales ordinarios de la provincia de Lima, Perú; renunciando a cualquier otro fuero o jurisdicción que pudiera corresponder. Además, acuerda que su cuenta en Plataforma Operativa es intransferible y que cualquier derecho o contenidos dentro de su cuenta se extinguen a la finalización del Contrato y/o Alianza Estratégica. Los títulos de los artículos de estos TCS tienen fines de referencia y se destinan a facilitar la lectura, careciendo de efectos para la interpretación del Contrato y/o Alianza Estratégica.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: "center", marginTop: "1rem" }}>
                    <Button variant="contained" size="large" onClick={handleClose}>Aceptar</Button>
                </Grid>
            </div>




        </div >
    );

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            {...props}
        >
            {body}
        </Modal>
    );
}