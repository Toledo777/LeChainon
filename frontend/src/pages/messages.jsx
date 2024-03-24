import { Helmet } from 'react-helmet-async';

import { MessagesView } from 'src/sections/messages/view';

// ----------------------------------------------------------------------

export default function MessagesPage() {
  return (
    <>
      <Helmet>
        <title> Messages | Le Chainon </title>
      </Helmet>

      <MessagesView />
    </>
  );
}
