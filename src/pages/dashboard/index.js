import {
  Grid,
  Typography
} from '@mui/material';

import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';


const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={2.5}>
      <Grid item>
        <Typography variant="h5">Applications</Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
