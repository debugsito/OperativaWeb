import React, { useEffect, useState } from "react";
import '../styles/Dashboard.css';

// redux
import { useDispatch, useSelector } from "react-redux";
import { getJobsInfo, setPublicationSelected } from "../../../store/actions/dashboard/dashboard.action";

// images
import { checkIcon, fileIcon, registeredIcon } from "../images";

// components
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Grid } from "@material-ui/core";
import { Breadcrumbs, Button, Container, Typography, TitlePage } from "../../shared/components";
import { CustomCard, InputDashboard, OpenPositionsTable } from "../components";

import jobManagementChartOptions from "../constants/jobManagementChartOptions";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

//initial values
const initialValues = {
  from_date:"2019-01-01",
  to_date:"2020-06-30"
}

const Dashboard = ({ history }) => {
  const { user } = useSelector(state => state?.auth);
  const { jobsInfo } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  const [jobManagementInfo, setJobManagementInfo] = useState({})

  const initRoute = SessionRoutes().initRoute;
  const routes = [{ name: "Inicio", to: `${initRoute}` }];

  useEffect(() => {
    dispatch(setPublicationSelected(""));
    dispatch(getJobsInfo(initialValues))
  }, [])

  useEffect(() => {
    jobsInfo.areas = jobsInfo?.areas?.map(area => ({
      name: area?.rubro?.name,
      y: Number(area?.percent)
    }))
    setJobManagementInfo(jobsInfo);
  }, [jobsInfo])

  const getJobs = (values) => {
    dispatch(getJobsInfo(values))
  }

  const goToPublishEmployment = () => history.push(`${initRoute}/crear-empleo`);

  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Breadcrumbs routes={routes} />
        </Grid>
        <Grid item xs={12} style={{ margin: "1rem" }}>

          <Grid container spacing={3}>
            {
             ( user.account.role === "muni" || user.account.role === "sub-muni") &&
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h6" className="title-color">
                      Gestión de empleos
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputDashboard initialValues={initialValues} getJobs={getJobs}/>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomCard borderRadius="4px">
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Grid container spacing={0} justify="center" alignContent="space-around" style={{ height: "100%" }}>
                            <Grid item xs={12}>
                              <DataCard img={registeredIcon} text="Registrados" quantity={jobManagementInfo?.registrados} />
                            </Grid>
                            <Grid item xs={12}>
                              <DataCard img={fileIcon} text="En proceso" quantity={jobManagementInfo?.en_proceso} />
                            </Grid>
                            <Grid item xs={12}>
                              <DataCard img={checkIcon} text="Contratados" quantity={jobManagementInfo?.contratados} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={8}>
                          <HighchartsReact highcharts={Highcharts} options={jobManagementChartOptions("Gestión de empleos", jobManagementInfo.areas)} />
                        </Grid>
                      </Grid>
                    </CustomCard>
                  </Grid>
                </Grid>
              </Grid>
            }
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TitlePage
                        description="A continuación podrás ver el listado de las publicaciones realizadas"
                    >
                        Posiciones abiertas
                    </TitlePage>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="row" justify="flex-end">
                    <Button variant="contained" color="primary" size="large" onClick={goToPublishEmployment}>PUBLICAR EMPLEO</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <OpenPositionsTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>

  );
};

const DataCard = ({ img, text, quantity }) => (
  <Grid container spacing={2} className="dashboard-data-card">
    <Grid item xs={8}>
      <img src={img} />&nbsp;&nbsp;
      <Typography variant="h6" component="span">
        {text}
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography variant="h5" component="p">
        {quantity}
      </Typography>
    </Grid>
  </Grid>
);

export default Dashboard;
