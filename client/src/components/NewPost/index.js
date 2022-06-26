import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Igor from '../../assets/images/igor.jpg';
import { Container, Box } from '@mui/material';
import { ADD_POST } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const NewItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  overflow: 'hidden',
}));

export default function NewPost() {
  const [formState, setFormState] = useState({ postTitle: '', postText: '' });
  const { postTitle, postText } = formState;

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const { data } = await addPost({
        variables: { ...formState },
      });
      Auth.loggedIn(data.login.token);
    } catch (e) {
      console.error(e);
    }
    if (Auth.loggedIn() === false) {
      // event.preventDefault();
      window.alert('You must sign in to create a post.');
    }
  };

  return (
    <Box sx={{ pt: 2, pb: 1 }}>
      <Grid container onSubmit={handleSubmit}>
        <Grid container component='form' noValidate autoComplete='off'>
          <NewItem sx={{ width: '100%', height: 'auto', pb: 1 }} elevation={1}>
            <Button
              type='submit'
              variant='contained'
              size='large'
              sx={{ mb: 4, mr: '3%', p: 0.7, color: 'white' }}
              style={{
                width: '25%',
                minWidth: '25%',
                maxWidth: '25%',
              }}
            >
              Create Post
            </Button>
            <TextareaAutosize
              onChange={handleChange}
              id='postTitle'
              name='postTitle'
              value={formState.postTitle}
              variant='outlined'
              sx={{
                mb: 2,
                display: 'inline-block',
              }}
              rows={1}
              maxRows={1}
              noWrap
              placeholder='Create a Title'
              style={{
                resize: 'none',
                width: '72%',
                minWidth: '72%',
                maxWidth: '72%',
                height: '38px',
                textAlign: 'center',
                fontSize: '27px',
                fontFamily: 'sans-serif',
              }}
            ></TextareaAutosize>
            {postTitle && (
              <TextField
                onChange={handleChange}
                id='postText'
                name='postText'
                value={formState.postText}
                label='Post Body'
                multiline
                rows={4}
                sx={{ mb: 2, width: '100%' }}
              />
            )}
          </NewItem>
        </Grid>
      </Grid>
    </Box>
  );
}
