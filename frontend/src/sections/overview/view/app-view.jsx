import { useState } from 'react';
import { faker } from '@faker-js/faker';
import moment from 'moment';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import AppTasks from '../app-tasks';
import AppChronologicalNotes from '../app-chronological-notes';
import AppOrderTimeline from '../app-caretaker-events-timeline';
import AppMonthlyStats from '../app-monthly-stats';
import AppWidgetSummary from '../app-widget-summary';
import AppGoalStats from '../app-goal-stats';
import AppResidentDemographics from '../app-resident-demographics';
import AppHousingOccupancy from '../app-housing-occupancy';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CaretakerEventsTimeline from '../app-caretaker-events-timeline';

// ----------------------------------------------------------------------


export default function AppView() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [residentNum, setResidentNum] = useState(150);
    const [caretakerNum, setCaretakertNum] = useState(50);
    const [firstTimers, setFirstTimers] = useState(38);
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

    const [recentEvents, setEvents] = useState([
      {
        uid: 2,
        title: 'crisis intervention 1',
        follow_up_date: 'Fri, 20 Mar 2024 04:00:00 GMT',
        communication_method: 'in person',
        type: 'regular1',
        resident: 'Jane Doe'
      },
      {
        uid: 1,
        title: 'follow up 1',
        follow_up_date: 'Sat, 15 Mar 2024 04:00:00 GMT',
        communication_method: 'in person',
        type: 'regular2',
        resident: 'John Doe'
      },
      {
        uid: 1,
        title: 'follow up 1',
        follow_up_date: 'Sat, 5 Mar 2024 04:00:00 GMT',
        communication_method: 'zoom meeting',
        type: 'regular',
        resident: 'Jane Doe'
      }
    ])

    const [upcomingEvents, setUpcomingEvents] = useState([
      {
        uid: 1,
        title: 'follow up 2',
        follow_up_date: 'Sat, 30 Mar 2024 04:00:00 GMT',
        communication_method: 'in person',
        type: 'regular2',
        resident: 'John Doe'
      },
      {
        uid: 2,
        title: 'follow up 2',
        follow_up_date: 'Fri, 29 Mar 2024 04:00:00 GMT',
        communication_method: 'zoom meeting',
        type: 'regular',
        resident: 'Jane Doe'
      },
    ])

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

    const [chronologicalNotes, setChronologicalNotes] = useState([
      {
        date: "Fri, 22 Mar 2024 04:00:00 GMT",
        title: "Register for Legal Clinic",
        details: "Failed to see the legal clinic in February, re-registers for March.",
        resident_name: "Jane Doe"
      },
      {
        date: "Sat, 23 Mar 2024 04:00:00 GMT",
        title: "Set up a meeting with Mr. X",
        details: "Following registration. Mrs. must call Mr.X, at (514)xxx-xxxx, posted today, until noon or between 2:00 p.m. and 4:30 p.m. He will ask her questions in order to direct her to the right services.",
        resident_name: "John Doe"
      }
    ])

    const mark = [
      '08-05-2024',
      '03-30-2024',
      '05-03-2024'
  ]       

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

        <Grid xs={12} md={6} lg={4}>
          <AppGoalStats
            title="Goal Completion Statistics"
            list={[
              {
                name: 'Success Rate',
                value: "40%",
                icon:  <img src="/assets/icons/glass/ic_glass_reward.png" width={32} alt="success" />,
              },
              {
                name: 'Pause Rate',
                value: "20%",
                icon: <img src="/assets/icons/glass/ic_glass_pause.png" width={32} alt="pause" />,
              },
              {
                name: 'Average Duration (days)',
                value: 17,
                icon: <img src="/assets/icons/glass/ic_glass_duration.png" width={32} alt="duration" />,
              },
              {
                name: 'Most Common Health Aspect',
                value: "Global Health",
                icon: <img src="/assets/icons/glass/ic_glass_health.png" width={32} alt="health_aspect" />,
              },
            ]}
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

        <Grid xs={12} md={6} lg={4}>
          <CaretakerEventsTimeline
            title="Recent Events"
            list={recentEvents.map(event => ({
              id: event.uid,
              title: `${event.resident}, ${event.title}, ${event.communication_method}`,
              type: event.type,
              time: new Date(event.follow_up_date),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <CaretakerEventsTimeline
            title="Upcoming Events"
            list={upcomingEvents.map(event => ({
              id: event.uid,
              title: `${event.resident}, ${event.title}, ${event.communication_method}`,
              type: event.type,
              time: new Date(event.follow_up_date),
            }))}
          />
        </Grid>

         <Grid xs={12} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Calendar
            style={{ height: 500 }}
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) => {
                if(mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
                return  'highlight'
              }
            }}
              tileDisabled={({ date }) => date.getDay() === 0}
            />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppChronologicalNotes
            title="Chronological Notes"
            list={chronologicalNotes.filter(note => moment(note.date).isSame(selectedDate, 'day'))}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}