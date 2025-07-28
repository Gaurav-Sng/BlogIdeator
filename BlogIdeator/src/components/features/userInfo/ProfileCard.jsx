import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/Config';

const ProfileCard = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setUserData(userDoc.exists() ? userDoc.data() : {});
      setLoading(false);
    }
    fetchUserData();
  }, [user]);

  function formatDate(dateVal) {
    if (!dateVal) return '';
    if (typeof dateVal === 'string') return new Date(dateVal).toLocaleDateString();
    if (dateVal.toDate) return dateVal.toDate().toLocaleDateString();
    return '';
  }

  if (loading) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-1">Profile</h2>
      <div><span className="font-semibold">Email:</span> {user.email}</div>
      <div><span className="font-semibold">Plan:</span> {userData?.plan || 'free'}</div>
      {userData?.createdAt && (
        <div><span className="font-semibold">Joined:</span> {formatDate(userData.createdAt)}</div>
      )}
    </div>
  );
};

export default ProfileCard;