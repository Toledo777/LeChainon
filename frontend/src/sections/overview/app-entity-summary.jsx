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


// ----------------------------------------------------------------------

export default function AppEntitySummary({ title, list, type, onNewItem, ...other }) {

  const [createNewItem, setCreateNewItem] = useState(false);

  const handleCreateNewClick = () => {
    setCreateNewItem(!createNewItem);
  };

  const handleFormSubmit = (item) => {
    onNewItem(item);
    setCreateNewItem(false);
  };

  const img_name = type === 'significantPersons' ? 'significant' : 'treatment';

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

        {list.map((entity) => (
          <Paper
            key={entity.name}
            variant="outlined"
            sx={{ py: 2.5, textAlign: 'left', borderStyle: 'dashed' }}
          >
            <Stack direction="column" alignItems="center" spacing={2}>
              <Box
                component="img"
                alt={entity.name}
                src={`/assets/icons/glass/ic_glass_${img_name}.png`}
                sx={{ width: 80, borderRadius: 1.5, flexShrink: 0 }}
              />
              {Object.entries(entity).map(([key, value]) => (
                <Typography key={key} variant="h7">
                  {`${value}`}
                </Typography>
              ))}
            </Stack>
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
              Add New
            </Button>

                {createNewItem && (
                  type === 'significantPersons' ?
                  <NewSignificantPersonForm
                  onCancel={handleCreateNewClick} 
                  onSubmit={handleFormSubmit} 
                  /> 
                :
                  <NewTreatmentTeamForm
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

AppEntitySummary.propTypes = {
  title: PropTypes.string,  
  onNewItem: PropTypes.func,
  type: PropTypes.string,
  list: PropTypes.array.isRequired,
};

function NewSignificantPersonForm({ onCancel, onSubmit }) {
  const [relation, setRelation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      relation,
      name,
      phone,
      email,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h6" gutterBottom align="left" sx={{ mb: 4 }}>
        Add New Significant Person
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          />

          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            multiline
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

NewSignificantPersonForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

function NewTreatmentTeamForm({ onCancel, onSubmit }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      role,
      phone,
      email,
      address,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h6" gutterBottom align="left" sx={{ mb: 4 }}>
        Add New Treatment Team Member
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <TextField
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            multiline
          />

          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

NewTreatmentTeamForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};