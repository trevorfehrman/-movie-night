import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import * as React from 'react';
import { db } from 'lib/firebase';

export function useCollectionData<T>(collectionPath: string) {
  const [docs, setDocs] = React.useState<T[]>([]);

  React.useEffect(() => {
    const q = query(collection(db, collectionPath), orderBy('createdAt'));
    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const docs: T[] = [];
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() } as unknown as T);
        });
        setDocs(docs);
      },
      err => {
        console.log(err);
      }
    );

    return unsubscribe;
  }, [collectionPath]);

  const memoizedDocs = React.useMemo(() => {
    return docs;
  }, [docs]);

  return memoizedDocs;
}
