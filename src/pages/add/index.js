import React from 'react';
import moment from 'moment';
import { useParams } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useForm } from 'react-hook-form';
import download from 'downloadjs';

import MainCard from 'components/MainCard';

import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import DatesLocations from './fields/dates';
import Driver from './fields/driver';
import Car from './fields/car';
import Other from './fields/other';
import { DD_MM_YYYY, LOCATIONS_MAP, YYYY_MM_DD } from 'utils/constants';

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

const AddPage = () => {
  const { id } = useParams();
  const [document, setDocument] = React.useState({});
  const [isSaveLoading, setSaveLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    type: '',
    message: '',
    visible: false,
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch
  } = useForm();
  const { delivery, admission } = watch();

  const getDocuments = () => {
    getDocs(collection(db, "documents"))
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({...doc.data() }));
        const documentById = documents.find(({ id: documentId }) => documentId == id);

        console.log(documentById)
        setDocument(documentById);
        Object.entries(documentById).forEach(
          ([name, value]) => setValue(name, value));
        // dates/locations
        setValue('contractNumber', `RDV/${documentById.id}`);
        setValue('from', moment(documentById.from, DD_MM_YYYY).format(DD_MM_YYYY));
        setValue('to', moment(documentById.to, DD_MM_YYYY).format(DD_MM_YYYY));
        setValue('delivery', Number(documentById.delivery));
        setValue('admission', Number(documentById.admission));
      });
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  const onSaveClick = async (data) => {
    const {customadmission, customdelivery, ...rest} = getValues();

    const payload = {
      ...rest,
      id,
      carMaxSpeed: 150,
      otherDeposit: 300,
      otherFuelLevel: '100%'
    };

    console.log(payload)
    setSaveLoading(true);
    await fetch(`http://127.0.0.1:10000/api/saveDoc`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(_ => {
      setSaveLoading(false);
      setAlert({
        visible: true,
        type: 'success',
        message: 'Data is saved successfully!'
      })
    });
  };

  const onDownloadClick = async () => {
    const { contractNumber } = getValues();

    const pdfBytes = await fetch('http://127.0.0.1:10000/downloadPdfById', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contractNumber })
    }).then(res => {
      if (res.status === 200) {
        return res.arrayBuffer();
      }

      return null;
    });

    if (pdfBytes) {
      download(pdfBytes, `${contractNumber}`, "application/pdf");
    } else {
      console.log('file not present')
    }
  };

  if (!Object.keys(document).length) return null;

  return (
    <form onSubmit={handleSubmit(onSaveClick)}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.visible} autoHideDuration={5000}>
        <Alert onClose={() => setAlert({ visible: false, message: alert.message })} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container justifyContent="space-between">
            <Typography variant="h3">Edit document #{id}</Typography>
            <Box
              sx={{
                '& > :not(style)': { margin: '0 4px' },
              }}
            >
              <Button
                startIcon={<PictureAsPdfIcon />}
                variant="contained"
                onClick={onDownloadClick}
              >
                Contract
              </Button>
              <Button
                startIcon={<PictureAsPdfIcon />}
                variant="contained"
                onClick={onDownloadClick}
              >
                Invoice
              </Button>
              <LoadingButton
                loading={isSaveLoading}
                color="success"
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Save
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard content={false} sx={{ padding: '20px 16px' }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <Box>
                  <DatesLocations
                    document={document}
                    control={control}
                    delivery={delivery}
                    admission={admission}
                  />
                </Box>
                <Box sx={{ marginTop: '16px' }}>
                  <Other control={control} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={9}>
                  <Driver control={control} />
                  <Box
                    component="div"
                    sx={{
                      '& > :not(style)': { marginTop: '16px', width: '100%' },
                    }}
                    autoComplete="off"
                  >
                    <Car control={control} />
                  </Box>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPage;
