import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../firebase/Config';
import { FaRegLightbulb, FaRegCalendarAlt } from 'react-icons/fa';

const SavedTrends = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ideasRef = collection(db, 'users', user.uid, 'ideas');

    const unsubscribeIdeas = onSnapshot(ideasRef, (snapshot) => {
      const ideasList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIdeas(ideasList);
    });

    return () => {
      unsubscribeIdeas();
    };
  }, []);

  return (
    <div className="p-4">
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaRegLightbulb className="text-yellow-500" /> Saved Ideas
        </h3>
        {ideas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img src="https://www.svgrepo.com/show/397761/idea-light-bulb.svg" alt="No ideas" className="w-28 h-28 mb-4 opacity-60" />
            <p className="text-gray-500 text-lg">No ideas saved yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-1 gap-6">
            {ideas.map((idea) => {
              const date = idea.createdAt?.toDate ? idea.createdAt.toDate() : (idea.createdAt ? new Date(idea.createdAt) : null);
              return (
                <div key={idea.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-700 line-clamp-1">{idea.content?.slice(0, 60) || 'Untitled Idea'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <FaRegCalendarAlt />
                    {date ? date.toLocaleDateString() : 'Unknown date'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SavedTrends;
