import {
  Grid,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { Controller } from 'react-hook-form';

const DatesLocations = ({ control }) => {  
    return (
      <MainCard content={false} sx={{ padding: '8px 16px' }}>
        <Box
          component="div"
          sx={{
            '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
          }}
          autoComplete="off"
        >
          <Typography variant="h5">Car</Typography>
          <Grid container>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                component="div"
                sx={{
                  '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
                }}
                autoComplete="off"
              >
                <Controller
                  control={control}
                  name="carModel"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Make and model"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carPlates"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Number plates"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carChassisNumber"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Chassis number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carRegPassNumber"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Registration pass number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carYear"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Car year"
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
                  '@media (min-width: 1024px)': {
                    paddingLeft: '16px'
                  }
                }}
                autoComplete="off"
              >
                <Controller
                  control={control}
                  name="carColor"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Color"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carFuelType"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      label="Fuel type"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carValueEur"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      type="number"
                      label="Value, EUR"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="carMaxSpeed"
                  render={({
                    field: { onChange, value = '' },
                }) => (
                    <TextField
                      type="number"
                      label="Max speed, KM/h"
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

export default DatesLocations;
