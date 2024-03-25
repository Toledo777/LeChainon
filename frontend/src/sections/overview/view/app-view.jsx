import moment from 'moment';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Radio, RadioGroup, FormControlLabel  } from '@mui/material';
import AppHousingOccupancy from '../app-housing-occupancy';
import AppGoalStats from '../app-goal-stats';
import AppMonthlyStats from '../app-monthly-stats';
import EventsTimeline from '../app-events-timeline';
import AppWidgetSummary from '../app-widget-summary';
import AppResidentDemographics from '../app-resident-demographics';
import AppItemsOfDay from '../app-items-by-date';

// ----------------------------------------------------------------------

export default function AppView() {

    /* eslint-disable no-unused-vars */

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [residentNum, setResidentNum] = useState(150);
    const [caretakerNum, setCaretakertNum] = useState(50);
    const [firstTimers, setFirstTimers] = useState(38);

    useEffect(() => {
      fetchData();
    }, []);

    const [housingOccupancy, setHousingOccupancy] = useState([
      { 
        name: "Emergency Housing", 
        capacity: 15, 
        occupancy: 5 
      },
      { 
        name: "Short Stay", 
        capacity: 21, 
        occupancy: 20 
      },
      { 
        name: "Transition Unit", 
        capacity: 15, 
        occupancy: 13 
      },
      { 
        name: "Yvonne Maisonneuve", 
        capacity: 15, 
        occupancy: 15 
      },
      { 
        name: "Sainte-Marie", 
        capacity: 49, 
        occupancy: 43 
      },
      { 
        name: "The Annexe", 
        capacity: 25, 
        occupancy: 20 
      },
    ]);

    const [residentDemoOption, setResidentDemoOption] = useState('age');
    const [residentDemographics, setResidentDemographics] = useState({
      age: {
        category_name: 'Age Group',
        category_data: {
          under_18: 20,
          between_18_30: 60,
          between_31_55: 55,
          over_55: 15 
        }
      },
      immigration: {
        category_name: 'Immigration Status',
        category_data: {
          citizen: 46, 
          permanent_resident: 30, 
          temporary: 30,
          asylum_received: 15,
          asylum_in_progress: 25,
          no_status: 4
        } 
      },
      dependents: {
        category_name: 'Child Dependents',
        category_data: {
          yes: 25,
          no: 125
        }
      },
      veteran: { 
        category_name: 'Veteran Status',
        category_data: {
          yes: 12, 
          no: 138
        }
      },
      indigenous: {
        category_name: 'Indigenous Status',
        category_data: {
          yes: 28, 
          no: 122
        }
      },
      income: { 
        category_name: 'Income Levels',
        category_data: {
          under_500: 40,
          between_500_999: 95, 
          between_1000_1999: 14,
          over_1999: 1,
        }
      },
    })

    const [monthlyStats, setMonthlyStats] = useState([
      {
        name: 'Number of Goals Completed',
        type: 'column',
        fill: 'solid',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 19],
      },
      {
        name: 'Resident Intake',
        type: 'area',
        fill: 'gradient',
        data: [12, 6, 7, 15, 3, 10, 5, 7, 18, 14, 12, 5],
      },
      {
        name: 'Resident Transition to Permanent Housing',
        type: 'line',
        fill: 'solid',
        data: [3, 5, 2, 0, 5, 8, 10, 6, 8, 7, 9, 8],
      },
    ])

    const [events, setEvents] = useState([
      {
        title: 'crisis intervention 1',
        follow_up_date: 'Fri, 22 Mar 2024 04:00:00 GMT',
        communication_method: 'in person',
        type: 'appointment',
        notes: 'Resident was in a crisis situation and needed immediate intervention.',
        resident: 'Jane Doe'
      },
      {
        title: 'follow up 1',
        follow_up_date: 'Fri, 15 Mar 2024 05:00:00 GMT',
        communication_method: 'in person',
        type: 'meeting',
        notes: 'Meeting with treatment team.',
        resident: 'Rita Doe'
      },
      {
        title: 'follow up 1',
        follow_up_date: 'Fri, 15 Mar 2024 12:00:00 GMT',
        communication_method: 'email',
        type: 'checkpoint',
        notes: 'Routine check up. Resident is progressing well.',
        resident: 'Jane Doe'
      }, 
      {
        title: 'follow up 3',
        follow_up_date: 'Sat, 30 Mar 2024 05:00:00 GMT',
        communication_method: 'in person',
        type: 'appointment',
        notes: 'Appointment with legal counselor to get advice on refugee status.',
        resident: 'Rita Doe'
      },
      {
        title: 'follow up 2',
        follow_up_date: 'Fri, 29 Mar 2024 04:00:00 GMT',
        communication_method: 'in person',
        type: 'checkpoint',
        notes: 'Routine check up. Active listening and helped client with employment issue.',
        resident: 'Jane Doe'
      },
      {
        title: 'follow up 2',
        follow_up_date: 'Mon, 25 Mar 2024 04:00:00 GMT',
        communication_method: 'phone',
        type: 'meeting',
        notes: 'Routine check up. Resident is progressing well.',
        resident: 'Rita Doe'
      },
    ])

    const [chronologicalNotes, setChronologicalNotes] = useState([
      {
        date: "Fri, 22 Mar 2024 09:00:00 GMT",
        title: "Register for Legal Clinic",
        type: "action",
        details: "Failed to see the legal clinic in February, re-registers for March.",
        resident_name: "Rita Doe"
      },
      {
        date: "Fri, 22 Mar 2024 18:00:00 GMT",
        title: "Set up a meeting with Mr. X",
        type: "appointment",
        details: "Following registration. Mrs. must call Mr.X, at (514)xxx-xxxx, posted today, until noon or between 2:00 p.m. and 4:30 p.m. He will ask her questions in order to direct her to the right services.",
        resident_name: "Rita Doe"
      },
      {
        date: "Wed, 20 Mar 2024 16:00:00 GMT",
        title: "Offer meeting at Medical Clinic",
        type: "appointment",
        details: "The coordinator came to offer her this appointment, easy to access, to talk with a doctor about her symptoms, (as mentioned since the beginning of February) who has test or analysis results to communicate to her. ",
        resident_name: "Jane Doe"
      },
    ])

    const [mark, setMark] = useState([]);


 const fetchData = async () => {
    let dateArr = [];
    try {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2' })
    };
      let response = await fetch('http://localhost:8000/intervention/get-intervention-plan', requestOptions);
      let result = await response.json();
      setChronologicalNotes(result["plan"]["chronoogical_notes"]);
      for (let c of result["plan"]["chronoogical_notes"]) {
        let date = new Date(c["date"]);
        let day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero if necessary
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1
        let year = date.getFullYear();

        // Combine day, month, and year with '-' separator
        let formattedDate = `${day}-${month}-${year}`;
        dateArr.push(formattedDate);
      }
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuid: 'ls3YYsM7BxctoAXDJzMAMgG4lAg1' })
    };
      response = await fetch('http://localhost:8000/caregiver/get-all-follow-ups', requestOptions);
      result = await response.json();
      setEvents(result["follow_ups"]);
      for (let c of result["follow_ups"]) {
        let date = new Date(c["follow_up_date"]);
        let day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero if necessary
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1
        let year = date.getFullYear();

        // Combine day, month, and year with '-' separator
        let formattedDate = `${day}-${month}-${year}`;
        dateArr.push(formattedDate);
      }
      setMark(dateArr);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const addNewEvent = (event) => {
      setEvents([...events, event]);
    };

    const addNewNote = (note) => {
      setChronologicalNotes([...chronologicalNotes, note]);
    };

    if (mark.length == 0) {
      return <h1>Loading...</h1>
    } else {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, welcome back 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Residents"
              total={residentNum}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_user.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Caretakers"
              total={caretakerNum}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_caretaker.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={(residentNum/caretakerNum > 1) ? "Caretakers Per Resident" : "Caretaker Per Resident"}
              total={residentNum/caretakerNum}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_ratio.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={(firstTimers > 1) ? "First Time Residents" : "First Time Resident"}
              total={firstTimers}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_firsttimer.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppGoalStats
              title="Global Intervention Statistics"
              list={[
                {
                  name: 'Goal Success Rate',
                  value: "80%",
                  icon:  <img src="/assets/icons/glass/ic_glass_reward.png" width={32} alt="success" />,
                },
                {
                  name: 'Goal Pause Rate',
                  value: "15%",
                  icon: <img src="/assets/icons/glass/ic_glass_pause.png" width={32} alt="pause" />,
                },
                {
                  name: 'Average Goal Duration (days)',
                  value: 45,
                  icon: <img src="/assets/icons/glass/ic_glass_duration.png" width={32} alt="duration" />,
                },
                {
                  name: 'Society Reintegration Rate',
                  value: "80%",
                  icon: <img src="/assets/icons/glass/ic_glass_health.png" width={32} alt="health_aspect" />,
                },
                {
                  name: 'Transitions to Permanent Housing',
                  value: 755,
                  icon: <img src="/assets/icons/glass/ic_glass_health.png" width={32} alt="health_aspect" />,
                },
                {
                  name: 'Most Common Health Aspect',
                  value: "Mental Health",
                  icon: <img src="/assets/icons/glass/ic_glass_health.png" width={32} alt="health_aspect" />,
                },
                ]}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppMonthlyStats
              title="Monthly Tracking"
              chart={{
                labels: [
                  '04/01/2023',
                  '05/01/2023',
                  '06/01/2023',
                  '07/01/2023',
                  '08/01/2023',
                  '09/01/2023',
                  '10/01/2023',
                  '11/01/2023',
                  '12/01/2023',
                  '01/01/2024',
                  '02/01/2024',
                  '03/01/2024'
                ],
                series: monthlyStats,
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppHousingOccupancy
              title="Occupation Rate for Each Housing Category"
              subheader="(+10%) average than last year"
              chart={{
                series: housingOccupancy.map(housing => ({
                  label: housing.name,
                  value: housing.occupancy / housing.capacity
                }))
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
          <RadioGroup
            row
            value={residentDemoOption}
            onChange={(event) => setResidentDemoOption(event.target.value)}>
              
            {Object.keys(residentDemographics).map((key) => (
              <FormControlLabel value={key} control={<Radio />} label={key} />
            ))}
            
          </RadioGroup>
          <AppResidentDemographics
            title={residentDemographics[residentDemoOption].category_name}
            chart={{
              categories: Object.keys(residentDemographics[residentDemoOption].category_data),
              series: Object.values(residentDemographics[residentDemoOption].category_data)
            }}
          />
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Calendar
              style={{ height: 800, width: 800}}
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date, view }) => {
                  if(mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
                  return  'highlight'
                }
              }}
              />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <EventsTimeline
              title="Upcoming Events"
              list={events
                .filter(event => new Date(event.follow_up_date) > new Date())
                .sort((a, b) => new Date(b.follow_up_date) - new Date(a.follow_up_date))
                .slice(0, 3)
                .map(event => ({
                  id: event.uid,
                  title: `${event.resident_name}, ${event.title}, ${event.communication_method}`,
                  type: event.type,
                  time: new Date(event.follow_up_date),
              }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <EventsTimeline
              title="Recent Events"
              list={events
                .filter(event => new Date(event.follow_up_date) <= new Date())
                .sort((a, b) => new Date(b.follow_up_date) - new Date(a.follow_up_date))
                .slice(0, 3)
                .map(event => ({
                  id: event.uid,
                  title: `${event.resident_name}, ${event.title}, ${event.communication_method}`,
                  type: event.type,
                  time: new Date(event.follow_up_date),
              }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6}>
            <AppItemsOfDay
              title={`Notes (${moment(selectedDate).format('DD/MM/YYYY')})`}
              itemType="note"
              onNewItem={addNewNote}
              selectedDate={selectedDate}
              list={
                chronologicalNotes
                .filter(note => moment(note.date).isSame(selectedDate, 'day'))
                .map(note => ({
                  title: note.title,
                  date: new Date(note.date),
                  type: note.type,
                  description: note.details,
                  resident_name: note.resident_name
                }))
              }
            />
          </Grid>

          <Grid xs={12} md={6} lg={6}>
            <AppItemsOfDay
              title={`Events (${moment(selectedDate).format('DD/MM/YYYY')})`}
              itemType="event"
              onNewItem={addNewEvent}
              selectedDate={selectedDate}
              list={
                events
                .filter(event => moment(event.follow_up_date).isSame(selectedDate, 'day'))
                .map(event => ({
                  title: event.title,
                  date: new Date(event.follow_up_date),
                  notes: event.notes,
                  resident_name: event.resident,
                  type: event.type,
                  communication_method: event.communication_method
                }))
              }
            />
          </Grid>

        </Grid>
      </Container>
    );
  }
}