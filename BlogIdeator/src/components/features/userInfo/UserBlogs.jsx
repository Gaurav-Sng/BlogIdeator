import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../firebase/Config';
import ReactMarkdown from "react-markdown";
import { FaRegCalendarAlt, FaBookOpen } from 'react-icons/fa';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const blogsRef = collection(db, 'users', user.uid, 'blogs');

    const unsubscribeBlogs = onSnapshot(blogsRef, (snapshot) => {
      const blogsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsList);
    });

    return () => {
      unsubscribeBlogs();
    };
  }, []);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <div className="p-4">
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaBookOpen className="text-blue-500" /> Saved Blogs
        </h3>
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img src="https://www.svgrepo.com/show/327408/empty-box.svg" alt="No blogs" className="w-32 h-32 mb-4 opacity-60" />
            <p className="text-gray-500 text-lg">No blogs saved yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => {
              const title = blog.content?.split('\n')[0].slice(2) || 'Untitled Blog';
              const date = blog.createdAt?.toDate ? blog.createdAt.toDate() : (blog.createdAt ? new Date(blog.createdAt) : null);
              const preview = blog.content?.slice(blog.content.indexOf('\n') + 1, 200) || '';
              const isLong = blog.content && blog.content.length > 200;
              return (
                <div key={blog.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg text-blue-700 line-clamp-1">{title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <FaRegCalendarAlt />
                    {date ? date.toLocaleDateString() : 'Unknown date'}
                  </div>
                  <div className="prose prose-sm text-gray-700 line-clamp-4 mb-2">
                    <ReactMarkdown>{preview}</ReactMarkdown>
                  </div>
                  {isLong && (
                    <button
                      className="text-blue-600 text-sm font-medium hover:underline self-start"
                      onClick={() => handleReadMore(blog)}
                    >
                      Read More
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* Modal for Read More */}
      {showModal && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-blue-700">{ selectedBlog.content?.split('\n')[0].slice(2) || 'Untitled Blog'}</h2>
            <div className="text-gray-400 text-xs mb-4 flex items-center gap-2">
              <FaRegCalendarAlt />
              {selectedBlog.createdAt?.toDate ? selectedBlog.createdAt.toDate().toLocaleDateString() : (selectedBlog.createdAt ? new Date(selectedBlog.createdAt).toLocaleDateString() : 'Unknown date')}
            </div>
            <div className="prose max-h-96 overflow-y-auto">
              <ReactMarkdown>{selectedBlog.content.slice(selectedBlog.content.indexOf('\n') + 1)}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
