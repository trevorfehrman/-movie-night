import * as React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { Participants, useParticipants } from 'hooks/useParticipants';

interface ParticipantsContextValue {
  participants: Participants | undefined;
  setParticipants: React.Dispatch<React.SetStateAction<Participants | undefined>>;
}

export const ParticipantsContext = React.createContext<ParticipantsContextValue>({
  participants: { participants: [], cursor: 0 },
  setParticipants: () => undefined,
});

function MyApp({ Component, pageProps }: AppProps) {
  const participantsCollection = useParticipants();

  React.useEffect(() => {
    setParticipants(participantsCollection[0]);
  }, [participantsCollection]);

  const [participants, setParticipants] = React.useState<Participants>();
  return (
    <ParticipantsContext.Provider value={{ participants, setParticipants }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ParticipantsContext.Provider>
  );
}

export default MyApp;
