import { Helmet } from 'react-helmet-async';

import { AppView, ResidentView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function ResidentPage() {
  return (
    <>
      <Helmet>
        <title> Resident Dashboard Le Chainon </title>
      </Helmet>

      <ResidentView />
    </>
  );
}
