import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';


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

        {list.map((goal) => (
          <Paper
            key={goal.uid}
            variant="outlined"
            sx={{ py: 2.5, textAlign: 'left', borderStyle: 'dashed' }}
          >
            <Typography variant="h5">{goal.goal_title}</Typography>
            <Typography variant="h6">Term: {goal.term}</Typography>
            <Typography variant="h6">Status: {goal.status}</Typography>
            <Typography variant="h6">Health aspects: {goal.health_aspects}</Typography>

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

            {/* {createNewItem && (
              
            )} */}
        </Box>
        </>
      )}

    </Card>
  );
}

AppGoalSummary.propTypes = {
  title: PropTypes.string,  
  subheader: PropTypes.string,
  onNewItem: PropTypes.func,
  list: PropTypes.array.isRequired,
};