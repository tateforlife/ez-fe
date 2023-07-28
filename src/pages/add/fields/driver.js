import moment from 'moment';
import {
    Typography,
    Box,
    TextField,
    Grid,
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { Controller } from 'react-hook-form';

const Driver = ({ control }) => {  
    return (
      <MainCard content={false} sx={{ padding: '8px 16px' }}>
        <Box
          component="div"
          sx={{
            '& > :not(style)': { margin: '8px 0', width: '100%' },
          }}
          autoComplete="off"
        >
          <Typography variant="h5">Driver info</Typography>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                component="div"
                sx={{
                  '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
                }}
                autoComplete="off"
              >
                <Typography variant="h6">Person info</Typography>
                <Controller
                  control={control}
                  name="username"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Name and surname"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="birth"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Date of birth"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="tel"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Phone number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Email"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                component="div"
                sx={{
                  '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
                }}
                autoComplete="off"
              >
                <Typography variant="h6">Passport info</Typography>
                <Controller
                  control={control}
                  name="passNumber"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Passport number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="passExp"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Passport expiration date"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="passCountry"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Passport country"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                component="div"
                sx={{
                  '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
                }}
                autoComplete="off"
              >
                <Typography variant="h6">License info</Typography>
                <Controller
                  control={control}
                  name="licenseCountry"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="License country"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="licenseNumber"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="License number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="licenseExp"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="License expiration date"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                component="div"
                sx={{
                  '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
                }}
                autoComplete="off"
              >
                <Typography lg={{ marginTop: '20px' }} variant="h6">Payment info</Typography>
                <Controller
                  control={control}
                  name="bankCard"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Bank card"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="bankCardExp"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Bank card expiration"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    );
};

export default Driver;
