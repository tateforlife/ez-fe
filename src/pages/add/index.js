import React from 'react';
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
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
export const LOCATIONS_MAP = {
  1: 'Riga, Valguma iela 4a',
  2: 'Riga International Airport RIX'
};

const DatesLocations = ({ document, setInputData, inputData }) => {
  if (!Object.keys(inputData).length) return null;

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
          value={inputData['contractNumber']}
        />
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
              value={inputData['pickupLocation'] || Number(document.delivery) || 1}
              onChange={e => setInputData(oldData => ({ ...oldData, ['pickupLocation']: e.target.value }))}
            >
              <MenuItem value={1}>{LOCATIONS_MAP[1]}</MenuItem>
              <MenuItem value={2}>{LOCATIONS_MAP[2]}</MenuItem>
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
              value={inputData['dropoffLocation'] || Number(document.admission) || 1}
              onChange={e => setInputData(oldData => ({ ...oldData, ['dropoffLocation']: e.target.value }))}
            >
              <MenuItem value={1}>{LOCATIONS_MAP[1]}</MenuItem>
              <MenuItem value={2}>{LOCATIONS_MAP[2]}</MenuItem>
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

const getPayloadLocations = (inputData) => {
  const {
    pickupLocation,
    dropoffLocation,
    customPickupLocation,
    customDropoffLocation
  } = inputData;

  const pickupLocationText = pickupLocation === 3
    ? customPickupLocation
    : LOCATIONS_MAP[pickupLocation];
  const dropoffLocationText = dropoffLocation === 3
    ? customDropoffLocation
    : LOCATIONS_MAP[dropoffLocation];

  return {
    pickupLocation: pickupLocationText,
    dropoffLocation: dropoffLocationText
  };
};

const AddPage = () => {
  const { id } = useParams();
  const [document, setDocument] = React.useState({});
  const [inputData, setInputData] = React.useState({});

  const getApplications = () => {
    getDocs(collection(db, "ez"))
      .then((querySnapshot) => {
        const applications = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
        const documentById = applications.find(({ id: applicationId }) => id === applicationId);
        setDocument(documentById);
        setInputData({
          contractNumber: `RDV/${documentById.carId}_${documentById.id}`,
          pickupDate: documentById.from,
          dropoffDate: documentById.to,
          pickupLocation: Number(documentById.delivery),
          dropoffLocation: Number(documentById.admission),
          customPickupLocation: '',
          customDropoffLocation: ''
        })
      });
  };

  React.useEffect(() => {
    getApplications();
  }, []);

  const onSaveClick = () => {
    const locations = getPayloadLocations(inputData);

    const payload = {
      contractNumber: inputData['contractNumber'],
      pickupDate: inputData['pickupDate'],
      dropoffDate: inputData['dropoffDate'],
      ...locations
    };

    console.log(payload)
  };

  return (
    <Grid container rowSpacing={2.5}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container justifyContent="space-between">
          <Typography variant="h3">Add document #{id}</Typography>
          <Button
            startIcon={<SaveIcon />}
            color="success"
            variant="contained"
            onClick={() => onSaveClick()}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <MainCard content={false} sx={{ padding: '20px 16px' }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={3}>
              <DatesLocations document={document} setInputData={setInputData} inputData={inputData} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddPage;
