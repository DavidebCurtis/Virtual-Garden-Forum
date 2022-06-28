import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
import { ADD_USER } from '../utils/mutations';
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

export default function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      if (data.addUser.token) {
        navigate('/profile');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const { loading, data } = useQuery(ME);
  const user = data?.me || data?.user || {};
  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ maxWidth: '60%', minHeight: '100vh', backgroundColor: '#eeeeee' }}
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
          {/* form container */}
          <Box
            component='form'
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 3, minWidth: '280px' }}
          >
            {/* input fields section */}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>First Name</Typography>
                <TextField
                  onChange={handleChange}
                  value={formState.firstName}
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Last Name</Typography>
                <TextField
                  onChange={handleChange}
                  value={formState.lastName}
                  required
                  fullWidth
                  id='lastName'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Username</Typography>
                <TextField
                  onChange={handleChange}
                  value={formState.username}
                  required
                  fullWidth
                  id='username'
                  name='username'
                  autoComplete='username'
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField
                  onChange={handleChange}
                  value={formState.email}
                  required
                  fullWidth
                  id='email'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
            </Grid>
            {/* submit button section */}
            <Button
              type='submit'
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
                color: 'white',
                ':hover': {
                  bgcolor: 'white',
                  color: 'green',
                },
              }}
            >
              Submit
            </Button>
            {/* already have an account? section */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
