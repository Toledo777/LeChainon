import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Unstable_Grid2';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function ResidentInDetailPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showProfile, setShowProfile] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleViewProfile = () => {
    setShowProfile(true);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <Typography variant="h3">Resident Profile Information</Typography>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h4" style={{ textIndent: '9px' }}>
            {' '}
            Basic Information
          </Typography>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>First Name:</strong> John{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Last Name:</strong> Doe{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Age:</strong> 25
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Borough:</strong> Montreal{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Immigration Status: </strong> Refugee{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Monthly Income:</strong> $1000{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Current Accomodation</strong> Hotel XYZ{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Stay Start Date: </strong> 03/2/2024{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Stay End Date: </strong> 04/2/2024{' '}
          </p>
        </Card>
      </Grid>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h4" style={{ textIndent: '9px' }}>
            {' '}
            Assigned Caregivers
          </Typography>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>First Name:</strong> John{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Last Name:</strong> Doe{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Email</strong> 25
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Phone Number:</strong> +1 4392854151{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Role :</strong> Caregiver{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Manager :</strong>{' '}
          </p>
        </Card>
      </Grid>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h4" style={{ textIndent: '9px' }}>
            {' '}
            Chronological Notes
          </Typography>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>First Name:</strong> John Doe{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Last Name:</strong> John Doe{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Age:</strong> 25
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Borough:</strong> Montreal{' '}
          </p>
        </Card>
      </Grid>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        <Card>
          {/* Should be in list */}
          <Typography variant="h4" style={{ textIndent: '9px' }}>
            Goals
          </Typography>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Goal Title</strong> Title{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Goal Description</strong> desrctption{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Health Aspect:</strong> None
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Status:</strong> in progress{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Term:</strong> Short{' '}
          </p>
        </Card>
      </Grid>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h4" style={{ textIndent: '9px' }}>
            {' '}
            Significant Persons
          </Typography>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Name:</strong> Name
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Email:</strong> jd@mail.com{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> phone:</strong> +1 24151245
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>relation:</strong> Montreal{' '}
          </p>
        </Card>
      </Grid>
      &nbsp;&nbsp;
      <Grid xs={12} sm={6} md={3}>
        {/* <h2></h2>
      <ul>
      
      </ul> */}
      </Grid>
    </Container>
  );
}
