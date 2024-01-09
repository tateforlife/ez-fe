import React from 'react';
import moment from 'moment';
import { useParams } from "react-router-dom";
import {
  Stack,
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
import DrawIcon from '@mui/icons-material/Draw';
import { useForm } from 'react-hook-form';
import download from 'downloadjs';

import MainCard from 'components/MainCard';

import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import DatesLocations from './fields/dates';
import Driver from './fields/driver';
import Car from './fields/car';
import Other from './fields/other';
import { DD_MM_YYYY } from 'utils/constants';
import Dot from 'components/@extended/Dot';
import SignDialog from './dialog';

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

import { getStorage, ref, uploadString } from "firebase/storage";

const storage = getStorage();

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case false:
      color = 'error';
      title = 'Not Signed';
      break;
    case true:
      color = 'success';
      title = 'Signed';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const AddPage = () => {
  const { id } = useParams();
  const [document, setDocument] = React.useState({});
  const [isSaveLoading, setSaveLoading] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({
    type: 'success',
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
        setValue('contractNumber', documentById.contractNumber);
        setValue('from', documentById.from);
        setValue('to', documentById.to);
        setValue('delivery', Number(documentById.delivery));
        setValue('admission', Number(documentById.admission));
      });
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  const onSaveClick = async () => {
    const {customadmission, customdelivery, ...rest} = getValues();

    const payload = {
      ...rest,
      id,
      carMaxSpeed: 150,
      otherDeposit: 300,
      otherFuelLevel: '100%',
      customadmission,
      customdelivery,
    };

    console.log(payload)
    setSaveLoading(true);
    setAlert(old => ({
      ...old,
      visible: false,
    }));

    await fetch(`${process.env.REACT_APP_API_BASE}api/saveDoc`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }).then(_ => {
      getDocuments();
      setSaveLoading(false);
      setAlert({
        visible: true,
        type: 'success',
        message: 'Data is saved successfully!'
      })
    });
  };

  const onDownloadContract = async () => {
    console.log(document)
    const pdfBytes = await fetch(`${process.env.REACT_APP_API_BASE}api/downloadContract`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: document.id, contractNumber: document.contractNumber })
    }).then(res => {
      if (res.status === 200) {
        return res.arrayBuffer();
      }

      return null;
    });

    if (pdfBytes) {
      download(pdfBytes, `${document.contractNumber}`, "application/pdf");
    } else {
      setAlert({
        visible: true,
        type: 'error',
        message: 'Contract file is not present'
      })
    }
  };

  const onDownloadInvoice = async () => {
    const pdfBytes = await fetch(`${process.env.REACT_APP_API_BASE}api/downloadInvoice`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: document.id, contractNumber: document.contractNumber })
    }).then(res => {
      if (res.status === 200) {
        return res.arrayBuffer();
      }

      return null;
    });

    if (pdfBytes) {
      download(pdfBytes, `${document.contractNumber}_invoice`, "application/pdf");
    } else {
      setAlert({
        visible: true,
        type: 'error',
        message: 'Invoice file is not present'
      })
    }
  };

  const onSignClick = () => {
    setDialogOpen(true);
  };

  const onSaveSign = (signImage) => {
    const storageRef = ref(storage, `sign/RDV-${document.id}.png`);

    console.log(signImage)
    setSaveLoading(true);

    uploadString(storageRef, signImage.split(',')[1], 'base64').then(async (snapshot) => {
      console.log('Uploaded a base64 string!');
      const payload = getValues();

      await fetch(`${process.env.REACT_APP_API_BASE}api/saveDoc`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          isSigned: true
        })
      }).then(_ => {
        getDocuments();
        setSaveLoading(false);
        setDialogOpen(false);
        setAlert({
          visible: true,
          type: 'success',
          message: 'Signed successfully!'
        })
      });
    });
  };

  const { contractNumber } = getValues();

  if (!Object.keys(document).length) return null;

  return (
    <>
      <SignDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        setImage={onSaveSign}
        isLoading={isSaveLoading}
      />
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.visible} autoHideDuration={5000}>
        <Alert onClose={() => setAlert({ visible: false, message: alert.message })} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Grid container rowSpacing={2.5}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid sx={{ gap: '10px' }} container justifyContent="space-between">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <Typography variant="h3">Edit document #{id}</Typography>
              <OrderStatus status={!!document.isSigned} />
            </Box>
            <Box
              sx={{
                '& > :not(style)': { margin: '0 4px' },
                'display': 'flex',
                'rowGap': '8px',
                'flexWrap': 'wrap'
              }}
            >
              <Button
                disabled={!document.wasSaved || isSaveLoading}
                startIcon={<DrawIcon />}
                variant="contained"
                onClick={onSignClick}
              >
                Sign
              </Button>
              <Button
                disabled={!document.wasSaved || isSaveLoading}
                startIcon={<PictureAsPdfIcon />}
                variant="contained"
                onClick={onDownloadContract}
              >
                Contract
              </Button>
              <Button
                disabled={!document.wasSaved || isSaveLoading}
                startIcon={<PictureAsPdfIcon />}
                variant="contained"
                onClick={onDownloadInvoice}
              >
                Invoice
              </Button>
              <LoadingButton
                disabled={!contractNumber}
                loading={isSaveLoading}
                color="success"
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                onClick={onSaveClick}
              >
                Save & Generate
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
    </>
  );
};

export default AddPage;
