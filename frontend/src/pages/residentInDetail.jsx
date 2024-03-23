import { Helmet } from 'react-helmet-async';

// import { ResidentProfileInDetailView } from 'src/sections//view';

import { ResidentInDetailView } from 'src/sections/user/residentInDetailView';

// ----------------------------------------------------------------------

export default function ResidentProfileInDetailPage() {
  return (
    <>
      <Helmet>
        <title> Resident Detail | Le Chainon </title>
      </Helmet>

    <ResidentInDetailView/>    
    </>
  );
}
