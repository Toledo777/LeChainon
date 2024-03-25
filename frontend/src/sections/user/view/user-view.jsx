import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import ResidentInDetailPage from '../residentInDetailView/resident-in-detail-view';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showProfile, setShowProfile] = useState(false); 
  const [data, setData] = useState([]);
  const [interventionData, setinterventionData] = useState([]);
  const [rowData, setUserData] = useState(null);
  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'ls3YYsM7BxctoAXDJzMAMgG4lAg1' })
    };
      const response = await fetch('http://localhost:8000/caregiver/get-user-data', requestOptions);
      const result = await response.json();
      console.log(result.residents);
      console.log("test");
      setData(result.residents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchInterventionData = async () => {
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
      setinterventionData(result.plan);
    } catch (error) {
      console.log("test exception");
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log("test useEffect")
    fetchInterventionData();
  }, []);
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

  const notFound = !dataFiltered.length && !!filterName;

  const handleViewProfile = (selectedUserData) => {
    setShowProfile(true); 
    console.log(selectedUserData);
    setUserData(selectedUserData);
  };
  
  return (
    <Container>
        {!showProfile ? (
          <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'residentname', label: 'Resident Name' },
                  { id: 'accomodation', label: 'Accomodation Unit' },
                  { id: 'stayStartDate', label: 'Stay Start Date' },
                  { id: 'stayEndDate', label: 'Stay End Date' },
                  { id: 'CareTakerName', label: 'CareTaker Name' ,align: 'center'},
                  { id: 'CareTaker', label: 'CareTaker Assigned', align: 'center'},
                  { id: '' },
                ]}
              />
              <TableBody>
                {data.map((row) => (
                    <UserTableRow
                      key={row.uid}
                      name={`${row.first_name} ${row.last_name}`}
                      currentAccomodation={row.current_accommodation}
                      stayEndDate = {row.stay_end_date}
                      stayStartDate = {row.stay_start_date}
                      careTaker = {row.assigned_caregivers[0]?.first_name}
                      handleClick={(event) => handleClick(event, row.name)}
                      onViewProfile={() => handleViewProfile(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      </>

      ) : (
        <ResidentInDetailPage residentData={rowData} residentInterventionData = {interventionData}  />
      )}
    </Container>
    
  );
}
