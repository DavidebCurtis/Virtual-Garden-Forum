import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Box,
  Link,
  ListItem,
  ListItemText,
  Divider,
  List,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';

const PlantHistory = ({ history }) => {
  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ p: 2, bgcolor: green[500], color: 'white' }}
      >
        Plant Notes
      </Typography>
      <Divider />
      <List sx={{ width: '100%', backgroundColor: '#ecf8e0' }}>
        {history &&
          history.map((history) => (
            <ListItem
              className='plantList'
              style={{ textDecoration: 'none' }}
              sx={{ mt: 1, backgroundColor: '#fcfffc' }}
            >
              <ListItemText>
                <h6>{history.createdAt}</h6>
                <Divider component='li' sx={{ mb: 1 }} />
                {history.note_body}
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </Box>

    // {/*
    //     <Paper className="card mb-3">
    //       <div className="card-header">
    //         <span className="text-light">Plant History</span>
    //       </div>
    //       <div className="card-body">
    //         {history &&
    //           history.map((history) => (
    //             <Paper>
    //               <p className="pill mb-3" key={history._id}>
    //                 {history.createdAt}: {history.note_body}
    //               </p>
    //             </Paper>
    //           ))}
    //       </div>
    //     </Paper> */}
  );
};

export default PlantHistory;
