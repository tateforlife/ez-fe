import React from 'react';
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import MainCard from 'components/MainCard';

import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const DATE_FORMAT = 'DD.MM.YYYY';

const DatesLocations = ({ document, setInputData, inputData }) => {
  return (
    <MainCard content={false} sx={{ padding: '8px 16px' }}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { margin: '8px 0', width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Dates/locations</Typography>
        <TextField
          disabled
          label="Contract number"
          value={`RDV/${document.carId}_${document.id}`}
          onChange={(e) => setInputData(oldData => ({ ...oldData, ['contractNumber']: e.target.value }))} />
        <DatePicker
          label="Pick up date"
          value={inputData['pickupDate'] ? moment(inputData['pickupDate'], DATE_FORMAT) : moment(document.from, DATE_FORMAT)}
          format={DATE_FORMAT}
          onChange={pickupDate => setInputData(oldData => ({ ...oldData, ['pickupDate']: pickupDate.format(DATE_FORMAT) }))}
        />
        <DatePicker
          label="Drop off date"
          value={inputData['dropoffDate'] ? moment(inputData['dropoffDate'], DATE_FORMAT) : moment(document.to, DATE_FORMAT)}
          format={DATE_FORMAT}
          onChange={pickupDate => setInputData(oldData => ({ ...oldData, ['dropoffDate']: pickupDate.format(DATE_FORMAT) }))}
        />
        <FormControl>
          <InputLabel>Pick up location</InputLabel>
          <Select
              value={inputData['pickupLocation'] || Number(document.delivery)}
              onChange={e => setInputData(oldData => ({ ...oldData, ['pickupLocation']: e.target.value }))}
            >
              <MenuItem value={1}>Valguma iela 4a-3 LV1048, Riga, Latvia</MenuItem>
              <MenuItem value={2}>Airport</MenuItem>
              <MenuItem value={3}>Custom</MenuItem>
            </Select>
        </FormControl>
        {inputData['pickupLocation'] === 3
          ? (
            <TextField
              value={inputData['customPickupLocation'] || ''}
              onChange={e => setInputData(oldData => ({ ...oldData, ['customPickupLocation']: e.target.value }))}
              label="Custom pick up location"
            />
          ) : null}
        <FormControl>
          <InputLabel>Drop off location</InputLabel>
          <Select
              value={inputData['dropoffLocation'] || Number(document.admission)}
              onChange={e => setInputData(oldData => ({ ...oldData, ['dropoffLocation']: e.target.value }))}
            >
              <MenuItem value={1}>Valguma iela 4a-3 LV1048, Riga, Latvia</MenuItem>
              <MenuItem value={2}>Airport</MenuItem>
              <MenuItem value={3}>Custom</MenuItem>
            </Select>
        </FormControl>
        {inputData['dropoffLocation'] === 3
          ? (
            <TextField
              value={inputData['customDropoffLocation'] || ''}
              onChange={e => setInputData(oldData => ({ ...oldData, ['customDropoffLocation']: e.target.value }))}
              label="Custom drop off location"
            />
          ) : null}
      </Box>
    </MainCard>
  );
};

const AddPage = () => {
  const [document, setDocument] = React.useState({});
  const { id } = useParams();
  const [inputData, setInputData] = React.useState({});

  const getApplications = () => {
    getDocs(collection(db, "ez"))
      .then((querySnapshot) => {
        const applications = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
        setDocument(applications.find(({ id: applicationId }) => id === applicationId));
      });
  };

  React.useEffect(() => {
    getApplications();
  }, []);

  console.log(inputData, document)

  return (
    <Grid container rowSpacing={2.5}>
      <Grid item>
        <Typography variant="h3">Add document #{id}</Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard content={false} sx={{ padding: '20px 16px' }}>
          <Grid item xs={12} md={6} lg={3}>
            <DatesLocations document={document} setInputData={setInputData} inputData={inputData} />
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddPage;
