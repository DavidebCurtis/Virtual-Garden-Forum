import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Paper, Box } from '@mui/material';
import styled from '@emotion/styled';
import NewComment from '../NewComment';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME, QUERY_POST, QUERY_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Leftitem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  color: theme.palette.text.secondary,
}));

const Onepost = ({ post, postText }) => {
  const { data, loading } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  const postId = post._id;
  const { loading: comments } = useQuery(QUERY_POST, {
    variables: { id: post._id },
  });

  return (
    <Box
      sx={{
        backgroundColor: '#f2f2f2',
        pl: '20%',
        pr: '20%',
        width: 'auto',
        m: 0,
        height: '100vh',
      }}
    >
      <Leftitem>
        <Grid item xs={6}>
          <Typography variant='body1' sx={{ pb: 1 }}>
            Post was created on {post.createdAt} by {post.username}
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#5f5e5e',
            }}
          >
            {post.postTitle}
          </Typography>
          <Typography
            variant='h5'
            sx={{
              height: '115px',
              overflow: 'hidden',
              mb: 1,
              color: '#606060',
            }}
          >
            <Typography sx={{ fontSize: 20 }}>{post.postText}</Typography>
          </Typography>
          <Box
            sx={{
              color: '#4caf50',
              width: '150px',
              p: 1,
              pl: 0.5,
              mb: 4,
              display: 'flex',
              flexDirection: 'row',
              '&:hover': { cursor: 'default' },
            }}
            variant='body2'
          >
            <ChatBubbleOutlineIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography>Comments: {post.commentCount}</Typography>
          </Box>
        </Grid>

        {post.comments?.map((post, index) => {
          return <h1>{posts.postTitle}</h1>;
        })}
        {post.comments.map((comments, index) => {
          if (post.comments.length) {
            return (
              <div key={index}>
                <Typography variant='body2'>
                  {comments.username} {comments.createdAt}{' '}
                </Typography>
                <Typography variant='h6' sx={{ pb: 4 }}>
                  {comments.commentBody}
                </Typography>
              </div>
            );
          }
        })}
      </Leftitem>
    </Box>
  );
};

export default Onepost;
