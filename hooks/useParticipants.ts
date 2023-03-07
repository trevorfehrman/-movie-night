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
import { useCollectionData } from 'react-firebase-hooks/firestore';

export interface Participants {
  participants: string[];
  cursor: number;
}

const participantsConverter: FirestoreDataConverter<Participants> = {
  toFirestore(participants: WithFieldValue<Participants>): DocumentData {
    return {
      participants: participants.participants,
      cursor: participants.cursor,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Participants {
    const data = snapshot.data(options);
    return {
      participants: data.participants,
      cursor: data.cursor,
    };
  },
};
const participantsRef = collection(db, 'participants').withConverter(
  participantsConverter
);
const participantsQuery = query(participantsRef);

export function useParticipants() {
  const [participantsCollection, loading, error] =
    useCollectionData(participantsQuery);

  return {
    participantsCollection: participantsCollection
      ? participantsCollection[0]
      : { participants: [], cursor: 0 },
    loading,
    error,
  };
}
