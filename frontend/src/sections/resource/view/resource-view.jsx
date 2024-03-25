import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';

export default function ResourceView() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2' }),
      };
      const response = await fetch('http://localhost:8000/resources/get', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
      setResources(data.resources); // Store the resources array in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Resources</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Resource
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {resources.map((resource, index) => (
          <PostCard key={index} post={resource} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
