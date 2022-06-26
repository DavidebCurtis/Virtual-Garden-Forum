import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PlantCard from '../components/PlantCard';

import { QUERY_PLANT } from '../utils/queries';
import Auth from '../utils/auth';
import PlantHistoryForm from '../components/PlantHistoryForm';
import PlantHistory from '../components/PlantHistory';

import { Box, Divider, Paper } from '@mui/material';

const Plant = () => {
  const { id: plantId } = useParams();
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { id: plantId },
  });

  const plant = data?.plant || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      className='image'
      style={{
        color: '#f5f5f5',
        backgroundColor: '#f2f2f2',
        pl: '20%',
        pr: '20%',
        width: 'auto',
        m: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center ',
          backgroundColor: 'transparent',
        }}
      >
        <PlantCard plantInfo={plant} />
        <PlantHistoryForm plantId={plant._id} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: '60%',
          }}
        >
          {plant.plantHistory && <PlantHistory history={plant.plantHistory} />}
          <Divider orientation='vertical' />
          {/* {Auth.loggedIn() && */}

          {/* //  } */}
        </Box>
      </Box>
    </Box>
  );
};

export default Plant;
