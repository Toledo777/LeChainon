import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { faker } from '@faker-js/faker';
import 'react-calendar/dist/Calendar.css';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import EventsTimeline from '../app-events-timeline';
import AppWidgetSummary from '../app-widget-summary';
import AppItemsOfDay from '../app-items-by-date';
import AppGoalStats from '../app-goal-stats';
import AppGoalSummary from '../app-goal-summary';

// ----------------------------------------------------------------------


export default function ResidentView() {

    /* eslint-disable no-unused-vars */

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [tasks, setTasks] = useState([
      {
        id : 1,
        details: "Read a book on quitting cigarettes",
      },
      {
        id : 2,
        details: "Read a book on quitting alcohol",
      },
      {
        id : 3,
        details: "Read a book on Happiness",
      },
      {
        id : 4,
        details: " Try eating healthy",
      },
      
      {
        id : 5,
        details: "Read a book on quitting gambaling ",
      },
      {
        id : 6,
        details: "Start learning Yoga",
      }
    ]);

    const [treatmentTeam, setTreatmentTeam] = useState([
      {
        name: "Dr. Beau Gessel",
        role: "Psychologist",
        phone: "555-555-5555",
        email: "abc@gmail.com",
        address: "4865 St Laurent Blvd, Montreal, QC H2W 1Z8"
      },
      {
        name: "Dr. Kimberly Bertotti",
        role: "Therapist",
        phone: "777-777-7777",
        email: "def@gmail.com",
        address: "4701 Rue Saint-Urbain, Montreal, QC H2T 2V9"
      },
      {
        name: "Dr. Anita Figueras",
        role: "Social Worker",
        phone: "999-999-9999",
        email: "ghi@gmail.com",
        address: "1045 Av. Laurier O, Outremont, QC H2V 2L1"
      },
      {
        name: "Dr. Christian Scriver",
        role: "MD (specialty)",
        phone: "000-000-0000",
        email: "jkl@gmail.com",
        address: "9187 Bd de l'Acadie, Montreal, QC H4N 3K1"
      }
    ]);

    const [goals, setGoals] = useState([
      {
        uid: 1,
        goal_title: "Greatly Reduce Alcohol Consumption and Quit Smoking",
        health_aspects: "Mental",
        means: "Become aware of alcohol consumption and risk factors that lead to it",
        status: "In progress",
        term: "Short"
      },
      {
        uid: 2,
        goal_title: "Finding Apartment/Affordable Housing",
        health_aspects: "Economic Health",
        means: "Determine which organization or resources she could use to access housing with her income.",
        status: "Future",
        term: "Long"
      },
      {
        uid: 3,
        goal_title: "Start Hockey Training and Join Team",
        health_aspects: "Physical",
        means: "Conduct research related to sportts activities. Obtain sources of funding if possible.",
        status: "Completed",
        term: "Medium"
      }
    ]);

    const [significantPersons, setSignificantPersons] = useState([
      {
        relation: "Mother",
        name: "John Doe",
        phone: "555-555-5555",
        email: "abc@gmail.com"
      },
      {
        relation: "Daughter",
        name: "Jason D",
        phone: "555-522-5555",
        email: "pqr@gmail.com"
      },
      {
        relation: "Sister",
        name: "Janna Rachel",
        phone: "555-555-5523",
        email: "qwe@gmail.com"
      }
      
    ])

    const [communityServices, setCommunityServices] = useState([
      {
        org_name: 'The Shield of Montreal',
        contact: 'Fransis Coles',
        phone: '541-333-234',
        email: 'abc@gmail.com',
        mission: 'Providing a safe and empowering environment',
      },
      {
        org_name: 'The Shield of Mont Royal',
        contact: 'Ranndy',
        phone: '233-456-1234',
        email: 'qwr@gmail.com',
        mission: 'Providing protection to refugees',
      },
      {
        org_name: 'West Island Women Shelter',
        contact: 'John Matthews',
        phone: '234-344-2344',
        email: 'pqr@gmail.com',
        mission: 'Providing protection to refugees',
      }
    ])

    const [events, setEvents] = useState([
      {
        title: 'crisis intervention 1',
        follow_up_date: 'Fri, 22 Mar 2024 04:00:00 GMT',
        communication_method: 'In person',
        type: 'appointment',
        notes: 'Resident was in a crisis situation and needed immediate intervention.',
        resident: 'Jane Doe'
      },
      {
        title: 'follow up 1',
        follow_up_date: 'Fri, 15 Mar 2024 12:00:00 GMT',
        communication_method: 'Email',
        type: 'checkpoint',
        notes: 'Routine check up. Resident is progressing well.',
        resident: 'Jane Doe'
      },
      {
        title: 'follow up 2',
        follow_up_date: 'Fri, 29 Mar 2024 04:00:00 GMT',
        communication_method: 'In person',
        type: 'checkpoint',
        notes: 'Routine check up. Active listening and helped client with employment issue.',
        resident: 'Jane Doe'
      }
    ])

    const state = {
      'date': '04-03-2024'
    }

    const mark = [
      '08-05-2024',
      '03-03-2024',
      '05-03-2024'
  ]

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Days in Stay"
            total={12}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_day.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Days on Plan"
            total={9}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_planday.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tasks Completed"
            total={6}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_task.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Goals Completed"
            total={4}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_goal.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppGoalSummary
            title="Goal Summary"
            list={goals}
            onNewItem={(item) => setGoals((prev) => [...prev, item])}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Calendar
            style={{ height: 800, width: 800}}
            onChange={setSelectedDate}
            value={selectedDate}
            // eslint-disable-next-line consistent-return
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
                title: `${event.resident}, ${event.title}, ${event.communication_method}`,
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
                title: `${event.resident}, ${event.title}, ${event.communication_method}`,
                type: event.type,
                time: new Date(event.follow_up_date),
            }))}
          />
        </Grid>
        
        <Grid xs={12} md={6} lg={4}>
          <AppItemsOfDay
            title={`Events (${moment(selectedDate).format('DD/MM/YYYY')})`}
            itemType="event"
            selectedDate={selectedDate}
            list={
              events
              .filter(event => moment(event.follow_up_date).isSame(selectedDate, 'day'))
              .map(event => ({
                title: event.title,
                date: new Date(event.follow_up_date),
                notes: event.notes,
                resident: event.resident,
                type: event.type,
                communication_method: event.communication_method
              }))
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Goal Task Tracking"
            list={tasks.map((task) => ({
              id: task.id,
              name: task.details,
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
