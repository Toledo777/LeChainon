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

// ----------------------------------------------------------------------

export default function AppEventsOfDay({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <EventItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Create New
        </Button>
      </Box>
    </Card>
  );
}

AppEventsOfDay.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function EventItem({ news }) {
  const { title, notes, date, resident, type, communication_method } = news;

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
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {resident}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
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
  news: PropTypes.shape({
    title: PropTypes.string,
    notes: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    resident: PropTypes.string,
    type: PropTypes.string,
    communication_method: PropTypes.string
  }),
};
