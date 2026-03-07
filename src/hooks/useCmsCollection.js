import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase/client';

function normalizeDocs(snapshotDocs) {
  return snapshotDocs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

export default function useCmsCollection(
  collectionName,
  { live = false, orderByField = 'order', orderDirection = 'asc' } = {}
) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(firebaseEnabled ? 'loading' : 'disabled');
  const [error, setError] = useState(null);

  const canRun = useMemo(() => firebaseEnabled && db && collectionName, [collectionName]);

  useEffect(() => {
    if (!canRun) return undefined;

    queueMicrotask(() => {
      setStatus('loading');
      setError(null);
    });

    const q = query(collection(db, collectionName), orderBy(orderByField, orderDirection));

    if (live) {
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          setItems(normalizeDocs(snap.docs));
          setStatus('ready');
        },
        (err) => {
          setError(err);
          setStatus('error');
        }
      );
      return () => unsubscribe();
    }

    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(q);
        if (cancelled) return;
        setItems(normalizeDocs(snap.docs));
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setError(err);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [canRun, collectionName, live, orderByField, orderDirection]);

  return { items, status, error, firebaseEnabled };
}
