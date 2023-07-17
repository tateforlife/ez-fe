import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {
    Typography,
    Box,
    TextField,
    MenuItem,
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { Controller } from 'react-hook-form';
import { DD_MM_YYYY, LOCATIONS_MAP } from 'utils/constants';

const DatesLocations = ({ document, control, delivery, admission }) => {  
    return (
      <MainCard content={false} sx={{ padding: '8px 16px' }}>
        <Box
          component="div"
          sx={{
            '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
          }}
          autoComplete="off"
        >
          <Typography variant="h5">Dates/locations</Typography>
          <Controller
            control={control}
            name="contractNumber"
            render={({
              field: { value = '' },
          }) => (
              <TextField
                disabled
                label="Contract number"
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="from"
            render={({
              field: { onChange, value = '' },
          }) => (
              <DatePicker
                label="Pick up date"
                value={value ? moment(value, DD_MM_YYYY) : moment(document.from, DD_MM_YYYY)}
                format={DD_MM_YYYY}
                onChange={change => onChange(change.format(DD_MM_YYYY))}
              />
          )}
          />
          <Controller
            control={control}
            name="to"
            render={({
              field: { onChange, value = '' },
          }) => (
              <DatePicker
                label="Drop off date"
                value={value ? moment(value, DD_MM_YYYY) : moment(document.to, DD_MM_YYYY)}
                format={DD_MM_YYYY}
                onChange={change => onChange(change.format(DD_MM_YYYY))}
              />
            )}
          />
          <Controller
            control={control}
            name="delivery"
            render={({
              field: { onChange, value = '' },
          }) => (
              <TextField
                value={value}
                onChange={e => onChange(e.target.value)}
                select
                label="Pick up location"
              >
                  <MenuItem value={1}>{LOCATIONS_MAP[1]}</MenuItem>
                  <MenuItem value={2}>{LOCATIONS_MAP[2]}</MenuItem>
                  <MenuItem value={3}>Custom</MenuItem>
              </TextField>
            )}
          />
          {delivery === 3
            ? (
              <Controller
                control={control}
                name="customdelivery"
                render={({
                  field: { onChange, value = '' },
              }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Custom pick up location"
                  />
                )}
              />
            ) : null
          }
          <Controller
            control={control}
            name="admission"
            render={({
              field: { onChange, value = '' },
            }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  select
                  label="Drop off location"
                >
                  <MenuItem value={1}>{LOCATIONS_MAP[1]}</MenuItem>
                  <MenuItem value={2}>{LOCATIONS_MAP[2]}</MenuItem>
                  <MenuItem value={3}>Custom</MenuItem>
              </TextField>
            )}
          />
          {admission === 3
            ? (
              <Controller
                control={control}
                name="customadmission"
                render={({
                  field: { onChange, value = '' },
              }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Custom drop off location"
                  />
                )}
              />
            ) : null
          }
        </Box>
      </MainCard>
    );
};

export default DatesLocations;
