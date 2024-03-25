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
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { useEffect } from 'react';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function ResidentInDetailPage({residentData , residentInterventionData}) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showProfile, setShowProfile] = useState(false);
  const [data, setData] = useState(null);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
console.log("test page");
  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2' })
    };
    console.log("test");
      const response = await fetch('http://localhost:8000/intervention/get-intervention-plan', requestOptions);
      const result = await response.json();
     
      console.log(result.plan);
      setData(result.plan);
    } catch (error) {
      console.log("test exception");
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log("test useEffect")
    fetchData();
  }, []);
  console.log(data)
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

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const stayEnddateString = residentData.stay_end_date;
  const stayEnddateObject = new Date(stayEnddateString);
  
  const stayEndDate = `${stayEnddateObject.getMonth() + 1}/${stayEnddateObject.getDate()}/${stayEnddateObject.getFullYear()}`;

  const stayStartdateString = residentData.stay_start_date;
  const stayStartdateObject = new Date(stayStartdateString);
  
  const stayStartDate = `${stayStartdateObject.getMonth() + 1}/${stayStartdateObject.getDate()}/${stayStartdateObject.getFullYear()}`;

 // const notFound = !dataFiltered.length && !!filterName;

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
            <strong>First Name:</strong> {residentData.first_name} {' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Last Name:</strong> {residentData.last_name}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Age:</strong> {residentData.age}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Borough:</strong> {residentData.borough}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Immigration Status: </strong> {residentData.immigration_status}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Monthly Income:</strong> {residentData.monthly_income}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Current Accomodation</strong> {residentData.current_accommodation}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Stay Start Date: </strong> {stayStartDate}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Stay End Date: </strong> {stayEndDate}{' '}
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
            <strong>First Name:</strong> {residentData.assigned_caregivers[0].first_name}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Last Name:</strong> {residentData.assigned_caregivers[0].last_name}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Email</strong> {residentData.assigned_caregivers[0].email}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Phone Number:</strong> {residentData.assigned_caregivers[0].phone}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Role :</strong> {residentData.assigned_caregivers[0].role}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Manager :</strong> None{' '}
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
            <strong>Caregiver:</strong> {residentInterventionData.chronoogical_notes[0].employee}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Goal:</strong> {residentInterventionData.chronoogical_notes[0].goal}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Motive:</strong>  {residentInterventionData.chronoogical_notes[0].motive} {' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Observations</strong> {residentInterventionData.chronoogical_notes[0].observations}{' '}
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
            <strong>Goal Title</strong> {residentInterventionData.goals[0].goal_title}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Goal Description</strong> {residentInterventionData.goals[0].description}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> Health Aspect:</strong> {residentInterventionData.goals[0].health_aspects} {' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Status:</strong> {residentInterventionData.goals[0].status}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>Term:</strong> {residentInterventionData.goals[0].term}{' '}
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
            <strong>Name:</strong>  {residentInterventionData.significant_persons[0].name}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            {' '}
            <strong>Email:</strong> {residentInterventionData.significant_persons[0].email}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong> phone:</strong> {residentInterventionData.significant_persons[0].phone}{' '}
          </p>
          <p style={{ textIndent: '40px' }}>
            <strong>relation:</strong> {residentInterventionData.significant_persons[0].relation}{' '}
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
