import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Nav from '../components/ui/Nav';
import Footer from '../components/ui/Footer';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Success = () => {
  const { currentUser } = useAuth();
  const query = useQuery();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Updating your subscription...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function confirmPlan() {
      if (!currentUser) {
        setStatus('You must be logged in to confirm your subscription.');
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/capture/${query.get('token')}`, 
          { uid: currentUser.uid }
        );

        const plan = response.data.plan;
        if (plan) {
          setStatus(`Your subscription has been updated to the ${plan} plan!`);
        } else {
          setStatus('Subscription confirmed, but no plan info returned.');
        }

        // Optional: redirect after a delay
        setTimeout(() => navigate('/dashboard'), 3000);
      } catch (error) {
        console.error('Error capturing payment:', error);
        setError(error);
        setStatus('There was an issue confirming your subscription. Please contact support.');
      }
    }

    confirmPlan();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">{error===null?"Payment Successful!":"An issue occured"}</h1>
        <p className="text-lg text-gray-700 text-center px-6">{status}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
