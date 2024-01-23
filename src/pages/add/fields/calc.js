import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  TextField,
  Checkbox,
  List,
  ListItem,
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { Controller } from 'react-hook-form';

const Calculations = ({
  control, totalRental, totalExtra,
  totalInsurance, total, setValue,
  inputs,
}) => {
  const [insChecked, setInsChecked] = React.useState(false);
  const [bcfChecked, setBcfChecked] = React.useState(false);
  const [unlimChecked, setUnlimChecked] = React.useState(false);
  const [oowChecked, setOOWChecked] = React.useState(false);
  const [optionalChecked, setOptionalChecked] = React.useState(false);
  const [deliveryChecked, setDeliveryChecked] = React.useState(false);

  React.useEffect(() => {
    if (inputs.calcInsuranceDayPrice) setInsChecked(true);
    if (inputs.calcBcfPrice) setBcfChecked(true);
    if (inputs.calcUnlimPrice) setUnlimChecked(true);
    if (inputs.calcOOWPrice) setOOWChecked(true);
    if (inputs.calcOptionalEquipPrice) setOptionalChecked(true);
    if (inputs.calcDeliveryPrice) setDeliveryChecked(true);
  }, [inputs]);

  return (
    <MainCard content={false} sx={{ padding: '8px 16px' }}>
      <Box
        component="div"
        sx={{
          '& > :not(style)': { margin: '8px 0 4px', width: '100%' },
        }}
        autoComplete="off"
      >
        <Typography variant="h5">Calculations</Typography>
        <Controller
          control={control}
          name="calcDaysCount"
          render={({
            field: { onChange, value = '' },
        }) => (
            <TextField
              type="number"
              label="Day count"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="calcDayPrice"
          render={({
            field: { onChange, value = '' },
        }) => (
            <TextField
              type="number"
              label="Price per day, EUR"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <List
          sx={{
            '& > :not(style)': { margin: '12px 0', padding: 0, width: '100%', justifyContent: 'space-between' },
            padding: 0,
            margin: 0
          }}
        >
          <Controller
            control={control}
            name="calcInsuranceDayPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem>
                <FormGroup sx={{ flexBasis: '100%' }}>
                    <FormControlLabel control={
                      <Checkbox
                        checked={insChecked}
                        onChange={event => {
                          setInsChecked(event.target.checked);
                          setValue('calcInsuranceDayPrice', 0);
                        }}
                      />
                    }
                    label="Insurance"
                  />
                  </FormGroup>
                  <TextField
                    type="number"
                    label="Price per insurance day, EUR"
                    disabled={!insChecked}
                    value={value}
                    onChange={onChange}
                  />
              </ListItem>
            )}
          />
          <Controller
            control={control}
            name="calcBcfPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem alignItems="center">
                <FormGroup sx={{ flexBasis: '100%' }}>
                  <FormControlLabel control={
                    <Checkbox
                      checked={bcfChecked}
                      onChange={event => {
                        setBcfChecked(event.target.checked)
                        setValue('calcBcfPrice', 0); 
                      }}
                    />
                  }
                  label="BCF"
                />
                </FormGroup>
                <TextField
                  type="number"
                  label="Price, EUR"
                  disabled={!bcfChecked}
                  value={value}
                  onChange={onChange}
                />
              </ListItem>
            )}
          />
          <Controller
            control={control}
            name="calcUnlimPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem alignItems="center">
                <FormGroup sx={{ flexBasis: '100%' }}>
                  <FormControlLabel control={
                    <Checkbox
                      checked={unlimChecked}
                      onChange={event => {
                        setUnlimChecked(event.target.checked)
                        setValue('calcUnlimPrice', 0);
                      }}
                    />
                  }
                  label="Unlimited mileage"
                />
                </FormGroup>
                <TextField
                  type="number"
                  label="Price, EUR"
                  disabled={!unlimChecked}
                  value={value}
                  onChange={onChange}
                />
              </ListItem>
            )}
          />
          <Controller
            control={control}
            name="calcOOWPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem alignItems="center">
                <FormGroup sx={{ flexBasis: '100%' }}>
                  <FormControlLabel control={
                    <Checkbox
                      checked={oowChecked}
                      onChange={event => {
                        setOOWChecked(event.target.checked)
                        setValue('calcOOWPrice', 0);
                      }}
                    />
                  }
                  label="OOW hours"
                />
                </FormGroup>
                <TextField
                  type="number"
                  label="Price, EUR"
                  disabled={!oowChecked}
                  value={value}
                  onChange={onChange}
                />
              </ListItem>
            )}
          />
          <Controller
            control={control}
            name="calcOptionalEquipPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem alignItems="center">
                <FormGroup sx={{ flexBasis: '100%' }}>
                  <FormControlLabel control={
                    <Checkbox
                      checked={optionalChecked}
                      onChange={event => {
                        setOptionalChecked(event.target.checked)
                        setValue('calcOptionalEquipPrice', 0)
                      }}
                    />
                  }
                  label="Optional equip."
                />
                </FormGroup>
                <TextField
                  type="number"
                  label="Price, EUR"
                  disabled={!optionalChecked}
                  value={value}
                  onChange={onChange}
                />
              </ListItem>
            )}
          />
          <Controller
            control={control}
            name="calcDeliveryPrice"
            render={({
              field: { onChange, value = 0 },
            }) => (
              <ListItem alignItems="center">
                <FormGroup sx={{ flexBasis: '100%' }}>
                  <FormControlLabel control={
                    <Checkbox
                      checked={deliveryChecked}
                      onChange={event => {
                        setDeliveryChecked(event.target.checked)
                        setValue('calcDeliveryPrice', 0)
                      }}
                    />
                  }
                  label="Car delivery"
                />
                </FormGroup>
                <TextField
                  type="number"
                  label="Price, EUR"
                  disabled={!deliveryChecked}
                  value={value}
                  onChange={onChange}
                />
              </ListItem>
            )}
          />
        </List>
        <List
          sx={{
            '& > :not(style)': { margin: '8px 0 4px', padding: 0, width: '100%', justifyContent: 'space-between' },
            padding: 0,
            margin: 0,
            borderTop: '1px solid #e6ebf1',
            marginTop: '20px !important',
            paddingTop: '10px'
          }}
        >
          <ListItem>
            <Typography variant="h6">Total rental:</Typography>
            <Typography variant="h6">{totalRental || 0}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">Total extra:</Typography>
            <Typography variant="h6">{totalExtra || 0}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">Insurance:</Typography>
            <Typography variant="h6">{totalInsurance || 0}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">{total || 0}</Typography>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default Calculations;
