import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Grid, Container, Button } from '@mui/material';
import GotIt from './yougot_it.gif';
import Box from '@mui/material/Box';
import NewPost from '../NewPost';
import Link from '@mui/material/Link';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  height: 300,
}));

// Page that appears when no posts are present
const ForumPosts = ({ posts, postText }) => {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (!posts.length) {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs>
            <h1>Nobody has posted yet. Be first and start the party!</h1>
          </Grid>
          <Grid item xs>
            <img src={GotIt} alt='Gif' height='100' />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction='column' alignContent='flex-end'>
            <NewPost />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f2f2f2',
          pl: '20%',
          pr: '20%',
          width: 'auto',
          m: 0,
        }}
      >
        <NewPost />

        {posts &&
          posts.slice(0, 8).map((posts) => (
            <Grid
              sx={{
                mt: 1,
                '&:hover': { border: 0.1 },
              }}
              item
              key={posts._id}
              xs={6}
            >
              <Item
                elevation={1}
                sx={{
                  backgroundColor: '#ffffff',
                  pb: 1,
                  pt: 2,
                  height: '248px',
                }}
              >
                <Link
                  href={`/forum/${posts._id}`}
                  underline='none'
                  style={{ textDecoration: 'none' }}
                  sx={{ color: '#c4c4c4' }}
                >
                  <Typography variant='body2' sx={{ pb: 1 }}>
                    Posted by {posts.username} on {posts.createdAt}
                  </Typography>
                  <Grid>
                    <Typography
                      noWrap
                      variant='h4'
                      sx={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#757575',
                      }}
                    >
                      {posts.postTitle}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ height: '115px', overflow: 'hidden', mb: 2 }}
                  >
                    <Typography sx={{ fontSize: 20 }}>
                      {posts.postText}
                    </Typography>
                  </Grid>
                  <Box
                    Button
                    sx={{
                      color: '#4caf50',
                      width: '150px',
                      p: 1,
                      '&:hover': {
                        background: '#f2f2f2',
                        borderRadius: '5px',
                      },
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    variant='body2'
                  >
                    <ChatBubbleOutlineIcon
                      sx={{
                        mr: 1,
                      }}
                    />
                    <Typography
                    // sx={{
                    //   '&:hover': { fontWeight: 'bold' },
                    // }}
                    >
                      Comments: {posts.commentCount}
                    </Typography>
                  </Box>
                </Link>
              </Item>
            </Grid>
          ))}
      </Box>
    </>
  );
};

export default ForumPosts;
