import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  stayEndDate,
  stayStartDate,
  currentAccomodation,
  careTaker,
  handleClick,
  onViewProfile,
}) {

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleViewProfile = () => {
    onViewProfile();
  //  navigate('/user/residentInDetail');
    handleCloseMenu();
  };
  // const addDays = (date, days) => {
  //   const result = new Date(date);
  //   result.setDate(result.getDate() + days);
  //   return result;
  // };
  // const addRandomDays = (date) => {
  //   const result = new Date(date);
  //   const randomDays = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
  //   result.setDate(result.getDate() + randomDays);
  //   return result;
  // };
//  let shortLongStayBoolean = housing === 'EMMERGENCY HOSTING' || housing === 'SHORT STAY UNIT' ||  housing === 'TRANSITION UNIT' ||  housing === 'YVONNE MAISONNEUVE HOUSE' ? false : true;
//  let endDate = shortLongStayBoolean ? addDays(Dates, 10).toLocaleDateString()  : addRandomDays(Dates).toLocaleDateString(); 
const stayEnddateString = stayEndDate;
const stayEnddateObject = new Date(stayEnddateString);

const stayEndDateFormatted = `${stayEnddateObject.getMonth() + 1}/${stayEnddateObject.getDate()}/${stayEnddateObject.getFullYear()}`;

const stayStartdateString = stayStartDate;
const stayStartdateObject = new Date(stayStartdateString);

const stayStartDateFormatted = `${stayStartdateObject.getMonth() + 1}/${stayStartdateObject.getDate()}/${stayStartdateObject.getFullYear()}`;
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{currentAccomodation}</TableCell>

        <TableCell>{stayStartDateFormatted}</TableCell>
        <TableCell>{stayEndDateFormatted}</TableCell>
        <TableCell align="center">{careTaker}</TableCell>

        <TableCell align = 'center'>
          <Label color={(careTaker === 'None' && 'error') || 'success'}>{(careTaker === 'None' && 'Not Assigned') || 'Assigned'}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 170 },
        }}
      >
        <MenuItem onClick={handleViewProfile}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          Intervention
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  currentAccomodation : PropTypes.any,
  stayStartDate : PropTypes.any,
  stayEndDate : PropTypes.any,
  careTaker : PropTypes.any,
  selected: PropTypes.any,
  onViewProfile: PropTypes.func.isRequired,
};
