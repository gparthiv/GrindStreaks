import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Settings, DayRecord, HistoryData, Task } from '../types';
import * as storage from './storage';

export const syncWithFirebase = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      // Pull and overwrite local data if we have remote data
      if (data.settings) storage.saveSettings(data.settings);
      if (data.todayRecord) storage.saveTodayRecord(data.todayRecord);
      if (data.history) storage.saveHistory(data.history);
      if (data.customTemplates) storage.saveCustomTemplates(data.customTemplates);
      if (data.userName) localStorage.setItem('grindstreaks_user_name_v1', data.userName);
      
      console.log('Successfully pulled data from Firebase.');
      return true;
    } else {
      // First time login - Push local data to firebase
      await pushToFirebase(uid);
      return false; // Indicating this was a push, not a pull
    }
  } catch (error) {
    console.error("Error syncing with Firebase", error);
    return false;
  }
};

export const pushToFirebase = async (uid: string) => {
  if (!uid) return;
  const userRef = doc(db, 'users', uid);
  
  const settings = storage.loadSettings();
  const todayRecord = storage.loadTodayRecord();
  const history = storage.loadHistory();
  const customTemplates = storage.loadCustomTemplates();
  const userName = localStorage.getItem('grindstreaks_user_name_v1') || '';

  try {
    await setDoc(userRef, {
      settings,
      todayRecord,
      history,
      customTemplates,
      userName,
      lastSynced: Date.now()
    }, { merge: true });
    console.log('Successfully pushed data to Firebase.');
  } catch (error) {
    console.error("Error pushing data to Firebase", error);
  }
};
