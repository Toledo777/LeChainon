import React, { useState } from 'react';

import { Grid, Button, TextField, Typography, IconButton } from '@mui/material';

// Component for individual item
const Item = ({ label, value, onChange, onRemove }) => (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField fullWidth value={value} onChange={(e) => onChange(e.target.value)} label={label} />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={onRemove} aria-label={`Remove ${label}`}>
          {/* You can add your icon here */}
        </IconButton>
      </Grid>
    </Grid>
  );

// Component for a section with multiple items
const Section = ({ title, items, onChange, onAdd, onRemove }) => {
    // Function to unpluralize a title
    const unpluralizeTitle = (title) => {
      if (title.endsWith('s')) {
        return title.slice(0, -1);
      }
      return title;
    };
  
    return (
      <>
        <Typography variant="h6">{unpluralizeTitle(title)}</Typography>
        {items.map((item, index) => (
          <Item
            key={index}
            label={`${unpluralizeTitle(title)} ${index + 1}`}
            value={item}
            onChange={(value) => onChange(index, value)}
            onRemove={() => onRemove(index)}
          />
        ))}
        <Button onClick={onAdd} variant="outlined" size="small">
          Add {unpluralizeTitle(title)}
        </Button>
      </>
    );
  };
  

// Main InterventionForm component
const InterventionForm = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [caseworker, setCaseworker] = useState('');
  const [planStartDate, setPlanStartDate] = useState('');
  const [entourage, setEntourage] = useState('');
  const [treatingTeam, setTreatingTeam] = useState('');
  const [diagnostics, setDiagnostics] = useState('');
  const [communityServices, setCommunityServices] = useState('');
  const [means, setMeans] = useState(['']); // Initial means state with one empty item
  const [goalTracking, setGoalTracking] = useState(['']); // Initial goal tracking state with one empty item
  const [longTermGoals, setLongTermGoals] = useState(['']); // Initial long term goals state with one empty item
  const [pending, setPending] = useState('');
  const [possibleInterventions, setPossibleInterventions] = useState('');
  const [chronologicalNotes, setChronologicalNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

    // Function to handle adding a new item to the list
    const handleAddItem = (state, setState) => {
        setState([...state, '']); // Add an empty item to the list
    };
    
    // Function to handle changing an item
    const handleChangeItem = (index, value, state, setState) => {
        const newItems = [...state];
        newItems[index] = value;
        setState(newItems);
    };
    
    // Function to handle removing an item
    const handleRemoveItem = (index, state, setState) => {
        const newItems = [...state];
        newItems.splice(index, 1); // Remove the item at the specified index
        setState(newItems);
    };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Create Intervention Plan</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} placeholder="YYYY-MM-DD"/>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Caseworker(s)" value={caseworker} onChange={(e) => setCaseworker(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Plan Start Date" type="date" value={planStartDate} onChange={(e) => setPlanStartDate(e.target.value)} InputLabelProps={{ shrink: true }} placeholder="YYYY-MM-DD"/>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Entourage" value={entourage} onChange={(e) => setEntourage(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Treating Team" value={treatingTeam} onChange={(e) => setTreatingTeam(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Diagnostics and Medications" value={diagnostics} onChange={(e) => setDiagnostics(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Community Services" value={communityServices} onChange={(e) => setCommunityServices(e.target.value)} />
        </Grid>
        

        <Grid item xs={12}>
  <Section
    title="Means"
    items={means}
    onChange={(index, value) => handleChangeItem(index, value, means, setMeans)}
    onAdd={() => handleAddItem(means, setMeans)}
    onRemove={(index) => handleRemoveItem(index, means, setMeans)}
  />
</Grid>

<Grid item xs={12}>
  <Section
    title="Long Term Goals"
    items={longTermGoals}
    onChange={(index, value) => handleChangeItem(index, value, longTermGoals, setLongTermGoals)}
    onAdd={() => handleAddItem(longTermGoals, setLongTermGoals)}
    onRemove={(index) => handleRemoveItem(index, longTermGoals, setLongTermGoals)}
  />
</Grid>

<Grid item xs={12}>
  <Section
    title="Goal Tracking"
    items={goalTracking}
    onChange={(index, value) => handleChangeItem(index, value, goalTracking, setGoalTracking)}
    onAdd={() => handleAddItem(goalTracking, setGoalTracking)}
    onRemove={(index) => handleRemoveItem(index, goalTracking, setGoalTracking)}
  />
</Grid>


 
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Pending" value={pending} onChange={(e) => setPending(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Possible Interventions" value={possibleInterventions} onChange={(e) => setPossibleInterventions(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Chronological Notes" value={chronologicalNotes} onChange={(e) => setChronologicalNotes(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InterventionForm;
