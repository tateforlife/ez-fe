import {
  Grid,
  Typography
} from '@mui/material';

import DocumentsTable from './DocumentsTable';
import MainCard from 'components/MainCard';

const DocumentsList = () => {
  return (
    <Grid container rowSpacing={2.5}>
      <Grid item>
        <Typography variant="h5">Documents</Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard content={false}>
          <DocumentsTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DocumentsList;
