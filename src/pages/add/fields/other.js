import {
  Typography,
  Box,
  TextField,
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { Controller } from 'react-hook-form';

const Other = ({ control }) => {  
    return (
      <MainCard content={false} sx={{ padding: '8px 16px' }}>
        <Box
          component="div"
          sx={{
            '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
          }}
          autoComplete="off"
        >
          <Typography variant="h5">Other info</Typography>
          <Controller
            control={control}
            name="otherDriverAddress"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                label="Driver's address"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="otherAdditionalDriverData"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                label="Additional driver data"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="otherDeposit"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                type="number"
                label="Deposit, EUR"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="otherFuelLevel"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                label="Fuel level"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="lang"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                label="Language"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="comment"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                label="Comment"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Box>
      </MainCard>
    );
};

export default Other;
