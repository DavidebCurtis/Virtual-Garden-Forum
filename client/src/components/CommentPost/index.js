import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box, Paper } from '@mui/material';
import styled from '@emotion/styled';
import NewComment from '../NewComment';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_COMMENT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { ME, QUERY_POST, QUERY_POSTS } from '../../utils/queries';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Leftitem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(4),
  textAlign: 'left',
  border: 2,
  color: theme.palette.text.secondary,
}));

const CommentPost = ({ post, postText }) => {
  const { data, loading } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  const postId = post._id;
  const { loading: comments } = useQuery(QUERY_POST, {
    variables: { id: post._id },
  });
  const [formState, setFormState] = useState({ commentBody: '' });
  const { commentBody } = formState;

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const { data: MeData } = useQuery(ME);
  const user = MeData?.me || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(postId);
  const handleFormSubmit = async (event) => {
    //   event.preventDefault();
    try {
      const { data } = await addComment({
        variables: { postId, ...formState },
      });
      Auth.loggedIn();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f2f2f2',
        pl: '20%',
        pr: '20%',
        width: 'auto',
        m: 0,
        minHeight: '100vh',
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
              // height: '115px',
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
          <Box>
            <Typography sx={{ mb: 1, fontSize: 12 }}>
              Comment as {user.username}
            </Typography>
          </Box>
          <Box
            component='form'
            noValidate
            onSubmit={handleFormSubmit}
            elevation={10}
            sx={{
              width: '100%',
            }}
          >
            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
              item
            >
              <TextField
                onChange={handleChange}
                value={formState.commentBody}
                id='commentBody'
                name='commentBody'
                label='Type comment here...'
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{ mb: 2, mt: 1, p: 0.5, width: 100, color: 'white' }}
              >
                Comment
              </Button>
            </Grid>
          </Box>

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
        </Grid>
      </Leftitem>
    </Box>
  );
};

export default CommentPost;
