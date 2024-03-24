// // import { faker } from '@faker-js/faker';

// // ----------------------------------------------------------------------

// // const POST_TITLES = [
// //   'Whiteboard Templates By Industry Leaders',
// //   'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
// //   'Designify Agency Landing Page Design',
// //   '✨What is Done is Done ✨',
// //   'Fresh Prince',
// //   'Six Socks Studio',
// //   'vincenzo de cotiis’ crossing over showcases a research on contamination',
// //   'Simple, Great Looking Animations in Your Project | Video Tutorial',
// //   '40 Free Serif Fonts for Digital Designers',
// //   'Examining the Evolution of the Typical Web Design Client',
// //   'Katie Griffin loves making that homey art',
// //   'The American Dream retold through mid-century railroad graphics',
// //   'Illustration System Design',
// //   'CarZio-Delivery Driver App SignIn/SignUp',
// //   'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
// //   'Tylko Organise effortlessly -3D & Motion Design',
// //   'RAYO ?? A expanded visual arts festival identity',
// //   'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
// //   'Inside the Mind of Samuel Day',
// //   'Portfolio Review: Is This Portfolio Too Creative?',
// //   'Akkers van Margraten',
// //   'Gradient Ticket icon',
// //   'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
// //   'How to Animate a SVG with border-image',
// // ];

// // export const posts1 = [...Array(23)].map((_, index) => ({
// //   id: faker.string.uuid(),
// //   cover: `/assets/images/covers/cover_${index + 1}.jpg`,
// //   title: POST_TITLES[index + 1],
// //   createdAt: faker.date.past(),
// //   view: faker.number.int(99999),
// //   comment: faker.number.int(99999),
// //   share: faker.number.int(99999),
// //   favorite: faker.number.int(99999),
// //   author: {
// //     name: faker.person.fullName(),
// //     avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
// //   },
// // }));

// // need to connect to db
// // export const posts = [...Array(23)].map((_, index) => ({
// //   id: faker.string.uuid(),
// //   title: 'title',
// //   description: 'description',
// //   type: 'type',
// //   link: 'link',
// //   issues: 'issues',
// // }));
// export const posts = [
//   {
//     description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus',
//     issues: 'issue9,issue10',
//     link: 'http://youtube.com',
//     title: 'Temporibus Autem',
//     type: 'Type I,Type J',
//     uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
//   },
//   {
//     description: 'Nam libero tempore, cum soluta nobis est eligendi',
//     issues: 'issue7,issue8',
//     link: 'http://example.info',
//     title: 'Nam Libero',
//     type: 'Type G,Type H',
//     uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
//   },
//   {
//     description: 'Lorem ipsum dolor sit amet',
//     issues: 'issue1,issue2',
//     link: 'http://example.com',
//     title: 'Lorem Ipsum',
//     type: 'Type A,Type B',
//     uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
//   },
//   {
//     description: 'dfbehjf',
//     issues: 'sdche,dsvujevhf',
//     link: 'http://sdgcgh',
//     title: 'aaaaa',
//     type: 'sdhvbcf,bsjhdvc',
//     uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
//   },
//   {
//     description: 'At vero eos et accusamus et iusto odio dignissimos',
//     issues: 'issue5,issue6',
//     link: 'http://example.net',
//     title: 'At Vero',
//     type: 'Type E,Type F',
//     uid: 'YM5Qa9IGAAO7dyD0JJgTrTVyk0U2',
//   },
// ];
// // export const posts = [...Array(23)].map((_, index) => ({
// //   textTitle: POST_TITLES[index + 1], // Assuming POST_TITLES is an array containing text titles
// //   textDescription: faker.lorem.paragraph(), // Assuming you want a random lorem ipsum text for description
// //   type: faker.random.arrayElement(["Activity", "Video", "Document"]), // Randomly select type
// //   link: faker.internet.url(), // Random URL
// //   issues: faker.random.arrayElements(["Related issues", "challenges"], faker.random.number({ min: 1, max: 2 })), // Randomly select related issues / challenges
// // }));
