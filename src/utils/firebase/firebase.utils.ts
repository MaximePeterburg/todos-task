import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAp3LQgXIb2vPLjFmleCSZlOcR7hkcIboM',
  authDomain: 'uptrader-todos.firebaseapp.com',
  projectId: 'uptrader-todos',
  storageBucket: 'uptrader-todos.appspot.com',
  messagingSenderId: '496426017492',
  appId: '1:496426017492:web:bed47c9e369b0770cc9141'
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};
export type Project = {
  title: string;
  description: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getProjectsAndDocuments = async (): Promise<Project[]> => {
  const collectionRef = collection(db, 'projects');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Project);
};

// export const getProjectAndDocuments = async (id:number):Promise<>=>{

// }