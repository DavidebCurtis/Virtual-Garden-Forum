import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import UpdatePlant from '../UpdatePlant';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';

export default function PlantCard({ plantInfo }) {
  console.log(plantInfo);

  const [open, setOpen] = React.useState(false);

  // //button open/close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        mx: '20px',
        my: '20px',
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        ml: '20%',
        mr: '20%',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        sx={{ width: '100%' }}
        component='img'
        height='auto'
        image={`${plantInfo.image_path}`}
        alt={`picture of ${plantInfo.common_name}`}
      />
      <CardContent
        sx={{
          width: '100%',
        }}
      >
        <Typography gutterBottom variant='h4' component='div'>
          {plantInfo.common_name}
          <Chip
            sx={{
              fontSize: '11px',
              width: 125,
              height: 28,
              cursor: 'pointer',
              ml: 1,
              ':hover': {
                borderColor: 'green',
              },
            }}
            icon={<AddIcon />}
            onClick={handleClickOpen}
            label='Edit Plant Info'
            variant='outlined'
          />
        </Typography>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          style={{ fontStyle: 'italic' }}
        >
          {plantInfo.scientific_name}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          <strong>Pruning:</strong> {plantInfo.pruning}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          <strong>Fertilization:</strong> {plantInfo.fertilization}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          <strong>Water:</strong> {plantInfo.water}
        </Typography>

        <UpdatePlant
          open={open}
          handleClose={handleClose}
          plantInfo={plantInfo}
        />
      </CardContent>
    </Paper>
  );
}
