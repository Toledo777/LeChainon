import { Helmet } from 'react-helmet-async';

import {InterventionView } from '../sections/user/intervention-view';

// ----------------------------------------------------------------------

export default function InterventionPage() {
  return (
    <>
      <Helmet>
        <title> Intervention | Le Chainon </title>
      </Helmet>

      <InterventionView />
    </>
  );
}
