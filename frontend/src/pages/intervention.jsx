import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function InterventionPage() {
  return (
    <>
      <Helmet>
        <title> Intervention | Le Chainon </title>
      </Helmet>

      <BlogView />
    </>
  );
}
