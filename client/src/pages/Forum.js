import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QUERY_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ForumPosts from '../components/ForumPosts';
import Search from '../components/ForumPosts/Search';
import NewPost from '../components/NewPost';
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
const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <ThemeProvider theme={theme}>
      {/* <Search /> */}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <ForumPosts posts={posts}></ForumPosts>
      )}
    </ThemeProvider>
  );
};

export default Forum;
