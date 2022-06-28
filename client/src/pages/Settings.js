import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UPDATE_USER } from '../utils/mutations';
import { ME } from '../utils/queries';

import Auth from '../utils/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#64dd20',
    },
  },
});

export default function Settings() {
  const { loading, data } = useQuery(ME);
  const user = data?.me || data?.user || {};
  console.log(user);

  const [formState, setFormState] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.about,
    email: user.email,
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: ME }],
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await updateUser({
        variables: formState,
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ width: '50%', minHeight: '100vh', backgroundColor: '#eeeeee' }}
        component='main'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* profile name and picture */}
          <Typography sx={{ display: 'flex', mb: 2 }}>
            <Avatar sx={{ mr: 1 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography>
                <strong>{user.username}</strong>
              </Typography>
              <Typography sx={{ fontSize: '.7rem' }}>
                Change profile picture
              </Typography>
            </Box>
          </Typography>
          {/* form container */}
          <Box
            component='form'
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 3, width: '100%' }}
          >
            {/* input fields */}
            <Grid item xs={12} sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ minWidth: '26%', textAlign: 'right', pr: 5, mt: 1 }}
              >
                <strong>First Name</strong>
              </Typography>
              <TextField
                sx={{ pr: 12 }}
                onChange={handleChange}
                value={formState.firstName}
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                size='small'
              />
            </Grid>

            <Grid item xs={11} sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ minWidth: '26%', textAlign: 'right', pr: 5, mt: 1 }}
              >
                <strong>Last Name</strong>
              </Typography>
              <TextField
                sx={{ pr: 12 }}
                onChange={handleChange}
                value={formState.lastName}
                required
                fullWidth
                id='lastName'
                name='lastName'
                autoComplete='family-name'
                size='small'
                helperText=" Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name."
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ minWidth: '26%', textAlign: 'right', pr: 5, mt: 1 }}
              >
                <strong>Username</strong>
              </Typography>
              <TextField
                sx={{ pr: 12 }}
                onChange={handleChange}
                value={formState.username}
                required
                fullWidth
                id='username'
                name='username'
                autoComplete='username'
                size='small'
              />
            </Grid>

            <Grid item xs={11} sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ minWidth: '26%', textAlign: 'right', pr: 5, mt: 1 }}
              >
                <strong>Bio</strong>
              </Typography>
              <TextField
                onChange={handleChange}
                value={formState.about}
                id='about'
                name='about'
                fullWidth
                sx={{ pr: 12 }}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', mb: 2 }}>
              <Typography
                sx={{ minWidth: '26%', textAlign: 'right', pr: 5, mt: 1 }}
              >
                <strong>Email</strong>
              </Typography>
              <TextField
                sx={{ pr: 12 }}
                onChange={handleChange}
                value={formState.email}
                required
                helperText='Email is used for logging in and notifications. Your email will not be a part of your public profile.'
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                size='small'
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', mb: 2 }}>
              <Box sx={{ minWidth: '26%', pr: 5 }}></Box>

              <Button
                type='submit'
                variant='contained'
                sx={{
                  mt: 1,
                  mb: 2,
                  width: '12%',
                  color: 'white',
                  ':hover': {
                    bgcolor: 'white',
                    color: 'green',
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
