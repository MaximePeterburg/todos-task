import { initializeApp } from 'firebase/app';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import {
  TaskItemInProject,
  TaskItemsInProject
} from '../../store/project/project.action';
import { ProjectItem, TASK_STATUS } from '../../store/projects/projects.types';

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

export const getProjectsAndDocuments = async (): Promise<ProjectItem[]> => {
  const collectionRef = collection(db, 'projects');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as ProjectItem);
};

export const getProjectDocument = async (title: string): Promise<ProjectItem> => {
  const collectionRef = collection(db, 'projects');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((docSnapshot) => docSnapshot.data())
    .find((project) => project.title === title) as ProjectItem;
};

export const addTaskToDocument = async ({ projectId, taskItem }: TaskItemInProject) => {
  const projectDocRef = doc(collection(db, 'projects'), projectId);
  try {
    await updateDoc(projectDocRef, {
      tasks: arrayUnion(taskItem)
    });
  } catch (error) {
    console.log('error adding task item to an array', error);
  }
};

export const deleteTaskFromDocument = async ({
  projectId,
  taskItem
}: TaskItemInProject) => {
  const projectDocRef = doc(collection(db, 'projects'), projectId);
  try {
    await updateDoc(projectDocRef, {
      tasks: arrayRemove(taskItem)
    });
  } catch (error) {
    console.log('error deleting task item to an array', error);
  }
};

export const sortTaskInDocument = async ({
  projectId,
  taskItems
}: TaskItemsInProject) => {
  const projectDocRef = doc(collection(db, 'projects'), projectId);

  try {
    const docSnapshot = await getDoc(projectDocRef);

    if (!docSnapshot.exists()) {
      console.log('Document not found.');
      return;
    }

    const projectData = docSnapshot.data() as ProjectItem;

    const index1 = projectData.tasks.findIndex((task) => task.id === taskItems[0].id);
    const index2 = projectData.tasks.findIndex((task) => task.id === taskItems[1].id);

    if (index1 === -1 || index2 === -1) {
      console.log('One or both items not found.');
      return;
    }

    projectData.tasks.splice(index1, 1);
    projectData.tasks.splice(index2, 0, taskItems[0]);

    projectData.tasks[index2].status = projectData.tasks[index1].status;

    await updateDoc(projectDocRef, {
      tasks: projectData.tasks
    });
  } catch (error) {
    console.error('Error swapping items in Firestore:', error);
  }
};

export const updateTaskStatusInDocument = async ({
  projectId,
  taskItem,
  status
}: TaskItemInProject & { status: TASK_STATUS }) => {
  const projectDocRef = doc(collection(db, 'projects'), projectId);
  try {
    const docSnapshot = await getDoc(projectDocRef);

    if (!docSnapshot.exists()) {
      console.log('Document not found.');
      return;
    }

    const projectData = docSnapshot.data() as ProjectItem;

    taskItem.status = status;

    const index = projectData.tasks.findIndex((item) => item.id === taskItem.id);

    projectData.tasks[index] = taskItem;

    await updateDoc(projectDocRef, {
      tasks: projectData.tasks
    });
  } catch (error) {
    console.error('Error updating status of item in Firestore:', error);
  }
};
