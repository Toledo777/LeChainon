import { Helmet } from 'react-helmet-async';

import { ResidentView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function ResidentPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Le Chainon </title>
      </Helmet>

      <ResidentView />
    </>
  );
}
