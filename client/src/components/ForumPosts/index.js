import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
import GotIt from './yougot_it.gif';
import Box from '@mui/material/Box';
import NewPost from '../NewPost';
import Link from '@mui/material/Link';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  height: 300,
  color: theme.palette.text.secondary,
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
      <Container sx={{ backgroundColor: '#f2f2f2' }}>
        <NewPost />

        {posts &&
          posts.slice(0, 8).map((posts) => (
            <Grid
              sx={{
                mt: 5,
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
                  pt: 2,
                }}
              >
                <Link
                  href={`/forum/${posts._id}`}
                  underline='none'
                  style={{ textDecoration: 'none' }}
                >
                  <Typography variant='body2' sx={{ pb: 2 }}>
                    Posted by {posts.username} on {posts.createdAt}
                  </Typography>
                  <Grid>
                    <Typography
                      noWrap
                      variant='h4'
                      gutterBottom
                      sx={{ fontSize: 35, fontWeight: 'bold' }}
                    >
                      {posts.postTitle}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography noWrap sx={{ fontSize: 20, pb: 10 }}>
                      {posts.postText}
                    </Typography>
                  </Grid>
                  <Typography variant='body2'>
                    Comments: {posts.commentCount}
                  </Typography>
                </Link>
              </Item>
            </Grid>
          ))}
      </Container>
    </>
  );
};

export default ForumPosts;
