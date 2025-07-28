import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from './Config'; 

export const saveBlog = async (blog) => {
  const user = auth.currentUser;
  if (!user) return;
  console.log(blog);
  try {
    await addDoc(collection(db, 'users', user.uid, 'blogs'), {
      ...blog,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving blog:', error);
  }
};

export const saveIdea = async (idea) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, 'users', user.uid, 'ideas'), {
      ...idea,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving idea:', error);
  }
};

// Plan limits
export const PLAN_LIMITS = {
  free: 5,
  basic: 20,
  pro: 50,
};

export async function getUserPlan() {
  const user = auth.currentUser;
  if (!user) return 'free';
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  return userDoc.exists() ? (userDoc.data().plan || 'free') : 'free';
}

// Count blogs created by the user in the current month
export async function getBlogsThisMonth() {
  const user = auth.currentUser;
  if (!user) return 0;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const blogsRef = collection(db, 'users', user.uid, 'blogs');
  const q = query(blogsRef, where('createdAt', '>=', Timestamp.fromDate(startOfMonth)));
  const snapshot = await getDocs(q);
  return snapshot.size;
}

// Check if the user can generate a new blog this month
export async function canGenerateBlog() {
  const plan = await getUserPlan();
  const limit = PLAN_LIMITS[plan] || PLAN_LIMITS['free'];
  const count = await getBlogsThisMonth();
  return count < limit;
}

// Get total blogs for a user (optionally pass uid, otherwise use current user)
export async function getTotalBlogs(uid) {
  let userId = uid;
  if (!userId) {
    const user = auth.currentUser;
    if (!user) return 0;
    userId = user.uid;
  }
  const blogsRef = collection(db, 'users', userId, 'blogs');
  const snapshot = await getDocs(blogsRef);
  return snapshot.size;
}

// Get total saved ideas for a user (optionally pass uid, otherwise use current user)
export async function getTotalSavedIdeas(uid) {
  let userId = uid;
  if (!userId) {
    const user = auth.currentUser;
    if (!user) return 0;
    userId = user.uid;
  }
  const ideasRef = collection(db, 'users', userId, 'ideas');
  const snapshot = await getDocs(ideasRef);
  return snapshot.size;
}
