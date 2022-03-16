const ApplicantRoutes = [
    '/postulante',
    '/postulante/ver-publicacion',
    '/postulante/mi-perfil',
    '/postulante/formulario-postular',
    '/postulante/postulacion/aviso/:id',
    '/postulante/postulaciones/:option(\\d+)?',
    '/postulante/postulaciones/detalle/:id',
    '/postulante/formulario-postular/info',
    '/postulante/mensajes/:publication_account_id',
    '/postulante/mensajes/:publication_account_id/detalle/:message_id',
    '/postulante/evaluaciones/:publication_account_id',
    '/postulante/question/:publication_account_id',
    '/postulante/interview/:publication_account_id',
    '/postulante/medital_test/:publication_account_id',
    '/postulante/postulacion/detalle/:publication_account_id(\\d+)/:back(\\d+)',
];
export default ApplicantRoutes;
