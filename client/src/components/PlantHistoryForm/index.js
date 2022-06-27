import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLANT_HISTORY } from '../../utils/mutations';
import { Navigate, useParams } from 'react-router-dom';

import { ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import '../../index.css';
import UpdatePlant from '../UpdatePlant';
import TextareaAutosize from '@mui/base/TextareaAutosize';

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

  // const [isOwner, setIsOwner] = useState();
  // const { data } = useQuery(ME);
  // const user = data?.me || {};
  // const { id } = useParams();

  // useEffect(() => {
  //   user.plants.find((o) => o._id === !id);
  //   console.log('HEY');
  // });

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
          <TextareaAutosize
            onChange={handleChange}
            id='noteBody'
            name='noteBody'
            value={noteBody}
            placeholder='Write a note about your plant'
            rows={4}
            minRows={4}
            maxRows={4}
            sx={{ m: 50 }}
            style={{
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              resize: 'none',
            }}
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
