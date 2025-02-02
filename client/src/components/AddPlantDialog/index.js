import * as React from 'react';
import { useState, useRef } from 'react';
//destructure all the items from "@mui/material"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
  Fab,
  Input,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

import { green } from '@mui/material/colors';
import { searchPlants } from '../../utils/API';
import { useMutation } from '@apollo/client';
import { QUERY_PLANT, ME } from '../../utils/queries';
import { ADD_PLANT } from '../../utils/mutations';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function AddPlantDialog({ open, handleClose }) {
  //loading bar items
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();
  //loading icon special effects
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  //loading icon useEffect
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //starts timer for load icon
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 6000);
    }
  };

  const plantFile = useRef();
  const [plantImg, setPlantImg] = useState([]);
  const [commonName, setcommonName] = useState();
  const [scientificName, setscientificName] = useState();
  const [imagePath, setImagePath] = useState();
  const [pruning, setPruning] = useState('');
  const [water, setWatering] = useState('');
  const [fertilization, setFertilization] = useState('');

  //upload plant file
  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };
  //send plant file to API
  const handleSearch = () => {
    const plantArr = Object.values(plantImg);
    searchPlants(plantArr).then((res) => {
      setcommonName(res.suggestions[0].plant_details.common_names[0]);
      setscientificName(res.suggestions[0].plant_details.scientific_name);
      setImagePath(res.suggestions[0].similar_images[0].url);

      // console.log(plant_name);
      // console.log(res.suggestions[0].plant_details.scientific_name);
      // console.log(res.suggestions[0].similar_images[0].url);
    });
  };

  const handleCommonName = (event) => {
    setcommonName(event.target.value);
  };

  const handleScientificName = (event) => {
    setscientificName(event.target.value);
  };

  const handlePruning = (event) => {
    setPruning(event.target.value);
  };

  const handleWatering = (event) => {
    setWatering(event.target.value);
  };

  const handleFertilization = (event) => {
    setFertilization(event.target.value);
  };

  // add plant on sumbission
  const [addPlant, { error }] = useMutation(ADD_PLANT, {
    refetchQueries: [{ query: ME }],
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addPlant({
        variables: {
          scientificName,
          commonName,
          imagePath,
          pruning,
          fertilization,
          water,
        },
      });
      console.log(data);
      // clear form values
      setPlantImg('');
      setImagePath('');
      setcommonName('');
      setscientificName('');
      setPruning('');
      setWatering('');
      setFertilization('');
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog align='center' open={open} onClose={handleClose}>
        <DialogTitle>Upload an image to identify a new plant!</DialogTitle>

        <DialogContent>
          <div>
            <Input
              accept='image/*'
              style={{ input: 'hidden' }}
              id='raised-button-file'
              multiple
              type='file'
              ref={plantFile}
              onChange={onFileChange}
            />

            <DialogActions>
              <Button
                variant='contained'
                onClick={() => {
                  handleSearch();
                  handleButtonClick();
                }}
                sx={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  '&:hover': { backgroundColor: '#4caf50' },
                  margin: 'auto',
                  mt: 2,
                }}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
                Identify Plant
              </Button>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                    marginTop: 8,
                    marginLeft: 3,
                  }}
                />
              )}
            </DialogActions>
          </div>
        </DialogContent>
        <DialogContent>
          <TextField
            margin='dense'
            label='Common Plant Name'
            type='text'
            fullWidth
            variant='standard'
            value={commonName || ''}
            onChange={handleCommonName}
          />
          <TextField
            margin='dense'
            label='Scientific Plant Name'
            type='text'
            fullWidth
            variant='standard'
            value={scientificName || ''}
            onChange={handleScientificName}
          />
          <TextField
            margin='dense'
            label='Pruning Info'
            type='text'
            fullWidth
            variant='standard'
            value={pruning}
            onChange={handlePruning}
          />
          <TextField
            margin='dense'
            label='Watering Info'
            type='text'
            fullWidth
            variant='standard'
            value={water}
            onChange={handleWatering}
          />
          <TextField
            margin='dense'
            label='Fertilizing Info'
            type='text'
            fullWidth
            variant='standard'
            value={fertilization}
            onChange={handleFertilization}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleClose}
            sx={{
              color: '#4caf50',
              border: '1px solid #4caf50',
              '&:hover': { border: '1px solid #4caf50', fontWeight: 'bold' },
            }}
          >
            Close
          </Button>
          <Button
            variant='outlined'
            onClick={handleSubmit}
            sx={{
              color: '#4caf50',
              border: '1px solid #4caf50',
              '&:hover': { border: '1px solid #4caf50', fontWeight: 'bold' },
            }}
          >
            Add Plant
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
