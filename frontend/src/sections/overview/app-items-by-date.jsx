import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { fFormatTime } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function AppItemsOfDay({ title, subheader, itemType, selectedDate, onNewItem, list, ...other }) {
  const [createNewItem, setCreateNewItem] = useState(false);

  const handleCreateNewClick = () => {
    setCreateNewItem(!createNewItem);
  };

  const handleFormSubmit = async (item) => {

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"chronological_notes" :{ ...item, uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2', cuid: "ls3YYsM7BxctoAXDJzMAMgG4lAg1" }})
    };
      const response = await fetch('http://localhost:8000/caregiver/create-note', requestOptions);
      const result = await response.json();
          onNewItem(item);
    setCreateNewItem(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list.map((item) => (
              itemType === 'note' 
              ? (<NoteItem key={item.id} item={item} />) 
              : (<EventItem key={item.id} item={item} />) 
            ))}
          </Stack>
        </Scrollbar>

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
              itemType === 'note' ?
                <NewNoteForm
                date={selectedDate}
                onCancel={handleCreateNewClick} 
                onSubmit={handleFormSubmit} 
                /> 
              :
                <NewEventForm
                date={selectedDate}
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

AppItemsOfDay.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date),
  itemType : PropTypes.string,
  onNewItem: PropTypes.func,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NoteItem({ item }) {
  const { title, description, date, resident, type } = item;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src="/assets/icons/glass/ic_glass_notes.png"
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link 
          color="inherit" 
          variant="subtitle2" 
          underline="hover" 
          noWrap
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {resident}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {type}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap={!isExpanded} >
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fFormatTime(date)}
      </Typography>
    </Stack>
  );
}

NoteItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    type: PropTypes.string,
    resident_name: PropTypes.string,
  }),
};

function EventItem({ item }) {
  const { title, notes, date, resident, type, communication_method } = item;
  const [isExpanded, setIsExpanded] = useState(false);

  let iconSrc = '';
  if (type === 'appointment') {
    iconSrc = 'ic_glass_appointment.png';
  }
  else if (type === 'checkpoint') {
    iconSrc = 'ic_glass_checkin.png';
  }
  else {
    iconSrc = 'ic_glass_meeting.png';
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={`/assets/icons/glass/${iconSrc}`}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link 
          color="inherit" 
          variant="subtitle2" 
          underline="hover" 
          noWrap
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {resident}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {communication_method}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap={!isExpanded}>
          {notes}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fFormatTime(date)}
      </Typography>
    </Stack>
  );
}

EventItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    notes: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    resident_name: PropTypes.string,
    type: PropTypes.string,
    communication_method: PropTypes.string
  }),
};

function NewNoteForm({ date, onCancel, onSubmit }) {
  const [time, setTime] = useState("12:00");
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [resident, setResident] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const [hour, minute] = time.split(':');
    date.setHours(hour, minute);
    onSubmit({ 
      date,
      title,
      type,
      details: notes,
      resident_name: resident,
      isEvent: false,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h6" gutterBottom align="left" sx={{ mb: 4 }}>
        Create New Note
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Resident"
            value={resident}
            onChange={(e) => setResident(e.target.value)}
          />

          <TextField
            id="time"
            label="Select Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <TextField
            fullWidth
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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

NewNoteForm.propTypes = {
  date: PropTypes.instanceOf(Date),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

function NewEventForm({ date, onCancel, onSubmit }) {
  const [time, setTime] = useState("12:00");
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [resident, setResident] = useState('');
  const [type, setType] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const [hour, minute] = time.split(':');
    date.setHours(hour, minute);
    onSubmit({
      title,
      follow_up_date: date,
      communication_method: communicationMethod,
      type,
      notes,
      resident,
      isEvent: true,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h6" gutterBottom align="left" sx={{ mb: 4 }}>
        Create New Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Resident"
            value={resident}
            onChange={(e) => setResident(e.target.value)}
          />

          <TextField
            id="time"
            label="Select Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <TextField
            fullWidth
            label="Communication Method"
            value={communicationMethod}
            onChange={(e) => setCommunicationMethod(e.target.value)}
          />

          <TextField
            fullWidth
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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

NewEventForm.propTypes = {
  date: PropTypes.instanceOf(Date),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};