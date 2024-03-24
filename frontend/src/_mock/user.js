import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  Housing:  sample([
    'EMMERGENCY HOSTING',
    'SHORT STAY UNIT',
    'TRANSITION UNIT',
    'YVONNE MAISONNEUVE HOUSE',
    'SAINTE-MARIE HOUSE',
    'UN TOIT POUR ELLES',
    'THE « ANNEXE »',
  ]),
  // hosting24_7:  sample([
  //   'EMERGENCY HOSTING',
  //   'SHORT STAY UNIT',
  //   'TRANSITION UNIT',
  //   'YVONNE MAISONNEUVE HOUSE',
  // ]),
  // postHousing:  sample([
  //   'SAINTE-MARIE HOUSE',
  //   'UN TOIT POUR ELLES',
  //   'THE « ANNEXE »',
  // ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['Assigned', 'Not Assigned']),
  role: sample([
    'John Doe',
    'John Samuel',
    'Kingston Jackson',
    'Johanathan King',
    'Cyril Raj',
    'Jean Paul',
    'None'
  ]),
  Dates: sample([
    '2024-03-26',
    '2024-03-29',
    '2024-02-13',
    '2024-01-25',
    '2024-02-01',
    '2024-01-23', 
  ]),  
  careTaker: sample([
    'John Doe',
    'John Samuel',
    'Kingston Jackson',
    'Johanathan King',
    'Cyril Raj',
    'Jean Paul',
    'None'
  ]),
}));
