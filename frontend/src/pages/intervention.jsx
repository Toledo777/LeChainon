import { Helmet } from 'react-helmet-async';

import { ResourceView } from 'src/sections/resource/view';

// ----------------------------------------------------------------------

export default function InterventionPage() {
  return (
    <>
      <Helmet>
        <title> Intervention | Le Chainon </title>
      </Helmet>

      <ResourceView />
    </>
  );
}
