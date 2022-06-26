import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import { ADD_PLANT_HISTORY } from '../../utils/mutations';
import Auth from '../../utils/auth';
import '../../index.css';
import UpdatePlant from '../UpdatePlant';

const NewItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'center',
  overflow: 'hidden',
}));

const PlantHistoryForm = ({ plantId }) => {
  const [addPlantHistory, { error }] = useMutation(ADD_PLANT_HISTORY);
  const [noteBody, setNoteBody] = useState('');

  const handleChange = (event) => {
    setNoteBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addPlantHistory({
        variables: { plantId, noteBody },
      });
      Auth.loggedIn();
      setNoteBody('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='center'
        onSubmit={handleSubmit}
        component='form'
        sx={{
          gap: 4,
          '& .MuiTextField-root': { m: 0, pb: 1, width: '100%' },
          p: 0,
          pt: 1.5,
          pb: 2,
          margin: 'auto',
          width: '60%',
        }}
        noValidate
        autoComplete='off'
      >
        <NewItem elevation={1} sx={{ width: '100%' }}>
          <TextField
            onChange={handleChange}
            id='noteBody'
            name='noteBody'
            value={noteBody}
            label='Plant Note Entry Text'
            variant='outlined'
            sx={{ m: 50 }}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{
              mb: 2,
              width: '100%',
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#4caf50' },
            }}
          >
            Add note
          </Button>
        </NewItem>
      </Grid>
    </>
  );
};

export default PlantHistoryForm;
