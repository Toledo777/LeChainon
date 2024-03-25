import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


// ----------------------------------------------------------------------

export default function AppGoalSummary({ title, list, onNewItem, ...other }) {

  const [createNewItem, setCreateNewItem] = useState(false);

  const handleCreateNewClick = () => {
    setCreateNewItem(!createNewItem);
  };

  const handleFormSubmit = (item) => {
    onNewItem(item);
    setCreateNewItem(false);
  };

  return (
    <Card {...other}>

    <CardHeader title={title} />

      <Box
        sx={{
          p: 3,
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >

        {list
        .sort((a, b) => b.term.localeCompare(a.term))
        .map((goal) => (
          <Paper
            key={goal.title}
            variant="outlined"
            sx={{ p: 4, textAlign: 'left', borderStyle: 'dashed' }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>{goal.goal_title}</Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item style={{ flex: '0 1 auto' }}>
                    <Typography variant="h7">Term:</Typography>
                  </Grid>
                  <Grid item style={{ flex: '1 1 auto' }}>
                    <Typography variant="body1">{goal.term}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item style={{ flex: '0 1 auto' }}>
                    <Typography variant="h7">Status:</Typography>
                  </Grid>
                  <Grid item style={{ flex: '1 1 auto' }}>
                    <Typography variant="body1">{goal.status}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item style={{ flex: '0 1 auto' }}>
                    <Typography variant="h7">Health aspects:</Typography>
                  </Grid>
                  <Grid item style={{ flex: '1 1 auto' }}>
                    <Typography variant="body1">{goal.health_aspects}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {goal.means}
            </Typography>
          </Paper>
        ))}
      </Box>
      
      {onNewItem && (
          <>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ p: 2, textAlign: 'right' }}>
            <Button
              size="small"
              color="inherit"
              endIcon={<Iconify icon={createNewItem ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"} />}
              onClick={handleCreateNewClick}
            >
              Create New
            </Button>

                {createNewItem && (
                  <NewGoalForm
                  onCancel={handleCreateNewClick} 
                  onSubmit={handleFormSubmit} 
                  /> 
                )}
        </Box>
        </>
      )}
    </Card>
  );
}

AppGoalSummary.propTypes = {
  title: PropTypes.string,  
  onNewItem: PropTypes.func,
  list: PropTypes.array.isRequired,
};

function NewGoalForm({ onCancel, onSubmit }) {
  const [goal_title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [health_aspects, setHealthAspects] = useState('');
  const [term, setTerm] = useState('');
  const [means, setMeans] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      goal_title,
      status,
      health_aspects,
      term,
      means,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h6" gutterBottom align="left" sx={{ mb: 4 }}>
        Create New Goal
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            value={goal_title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <TextField
            fullWidth
            label="Term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <TextField
            fullWidth
            label="Health Aspects"
            value={health_aspects}
            onChange={(e) => setHealthAspects(e.target.value)}
            multiline
          />

          <TextField
            fullWidth
            label="Means"
            value={means}
            onChange={(e) => setMeans(e.target.value)}
          />

          <Stack direction="row" justifyContent="flex-end">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

NewGoalForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};