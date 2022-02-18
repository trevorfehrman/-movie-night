import * as React from 'react'; /* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next';

import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

import { Layout } from '../components/layout';
import { collection, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Home: NextPage = () => {
  const q = query(collection(db, 'movies'));
  const [value, loading, error] = useCollection(collection(db, 'movies'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <Layout>
      <>
        {value &&
          value.docs.map(doc => (
            <React.Fragment key={doc.id}>{JSON.stringify(doc.data())}</React.Fragment>
          ))}
      </>
    </Layout>
  );
};

export default Home;
