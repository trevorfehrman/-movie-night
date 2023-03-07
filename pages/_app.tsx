import * as React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { Participants, useParticipants } from 'hooks/useParticipants';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { db } from 'lib/firebase';

interface ParticipantsContextValue {
  participantsCollection: Participants[] | undefined;
}

export const ParticipantsContext =
  React.createContext<ParticipantsContextValue>({
    participantsCollection: undefined,
  });

function MyApp({ Component, pageProps }: AppProps) {
  // const { participantsCollection } = useParticipants();

  return (
    // <ParticipantsContext.Provider value={{ participantsCollection }}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </ParticipantsContext.Provider>
  );
}

export default MyApp;
