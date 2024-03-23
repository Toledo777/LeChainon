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
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------


export default function AppView() {
    const [value, onChange] = useState(new Date());
    const [username, setUsername] = useState("John Doe")
    const [residentNum, setResidentNum] = useState(150);
    const [caretakerNum, setCaretakertNum] = useState(50);
    const [firstTimers, setFirstTimers] = useState(38);
    const [housingOccupancy, setHouseOccupancy] = useState({
      emergency: { name: "Emergency Housing", capacity: 15, occupied: 5 },
      short: { name: "Short Stay", capacity: 21, occupied: 20 },
      transition: { name: "Transition Unit", capacity: 15, occupied: 13 },
      yvonne: { name: "Yvonne Maisonneuve House", capacity: 15, occupied: 15 },
      sainteMarie: { name: "Sainte-Marie House", capacity: 49, occupied: 43 },
      annexe: { name: "The Annexe", capacity: 25, occupied: 20 },
    });

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
        Hi {username}, Welcome back 👋
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
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Calendar
            style={{ height: 500 }}
            onChange={onChange}
            value={value}
            tileClassName={({ date, view }) => {
                if(mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
                return  'highlight'
              }
            }}


              tileDisabled={({ date }) => date.getDay() === 0}

              minDate={
                new Date()
              }
            />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Occupation Rate for Each Housing Category"
            subheader="(+10%) average than last year"
            chart={{
              series: [
                { label: housingOccupancy.emergency.name, value: housingOccupancy.emergency.occupied / housingOccupancy.emergency.capacity },
                { label: housingOccupancy.short.name, value: housingOccupancy.short.occupied / housingOccupancy.short.capacity },
                { label: housingOccupancy.transition.name, value: housingOccupancy.transition.occupied / housingOccupancy.transition.capacity },
                { label: housingOccupancy.yvonne.name, value: housingOccupancy.yvonne.occupied / housingOccupancy.yvonne.capacity },
                { label: housingOccupancy.sainteMarie.name, value: housingOccupancy.sainteMarie.occupied / housingOccupancy.sainteMarie.capacity },
                { label: housingOccupancy.annexe.name, value: housingOccupancy.annexe.occupied / housingOccupancy.annexe.capacity },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
