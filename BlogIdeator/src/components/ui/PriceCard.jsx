import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const PriceCard = ({ plan, userID }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const getServiceDescription = (serviceKey, featureValue) => {
    switch (serviceKey) {
      case 'number':
        return `Generate up to ${featureValue} blog ideas per month`;
      case 'saveIdea':
        return "Save favorite blogs & ideas.";
      case 'seo':
        return featureValue ? `${featureValue} SEO optimized blogs` : "SEO optimized blogs";
      case 'outline':
        if (featureValue === 'Unlimited') {
          return "Unlimited Access to outline generator";
        }
        return `Generate up to ${featureValue} blog outlines`;
      case 'Access':
        return `${featureValue} Access to "Trend Explorer"`;
      case 'publish':
        return "Publish blogs with one click";
      case 'support':
        return `${featureValue} support`;
      default:
        return "";
    }
  };

  const cardClasses = `
    bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300
    p-8 flex flex-col items-center text-center border
  `;

  const Order = async (amount, name, userID) => {
    if (userID === null || userID === undefined) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await axios.post(`${apiUrl}/orders`, {
        amount: amount,
        currency: 'USD',
        planName: name,
        userID: userID // Optional: pass plan name for backend use
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      );
      console.log(response);
      if (response.status !== 200) {
        console.log("Error in response:", response);
      }
      const data = response.data;
      console.log(data);
      const { id: order_id, approvalUrl } = data;
      console.log("your order_id  is: ", order_id);
      console.log(approvalUrl);
      window.location.href = approvalUrl;
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cardClasses}>
      <h3 className="text-3xl font-bold text-gray-800 mb-2">
        {plan.name}
      </h3>
      <p className="text-5xl font-extrabold text-indigo-600 mb-6">
        {plan.price}
        <span className="text-lg text-gray-500 font-normal">/month</span>
      </p>

      <ul className="list-none p-0 m-0 space-y-3 mb-8 w-full">
        {Object.keys(plan.features).map((serviceKey) => {
          const featureValue = plan.features[serviceKey];
          let isIncluded = false;
          let displayContent = getServiceDescription(serviceKey, featureValue);

          if (typeof featureValue === 'boolean') {
            isIncluded = featureValue;
          } else if (typeof featureValue === 'number' || typeof featureValue === 'string') {
            isIncluded = true;
          }

          return (
            <li key={serviceKey} className="flex items-center text-gray-700 text-base">
              {isIncluded ? (
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              <span className={`${!isIncluded && 'line-through text-gray-400'}`}>
                {displayContent}
              </span>
            </li>
          );
        })}
      </ul>

      <button
        className={`
          mt-auto w-full py-3 px-6 text-lg font-semibold rounded-lg
          ${plan.isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-indigo-600 border border-indigo-600 hover:bg-gray-200'}
          transition-colors duration-300
        `}
        onClick={() => Order(plan.price, plan.name, userID)}
        disabled={plan.name === 'Free Plan' || loading}
      >
        {loading ? 'Processing...' : `Choose ${plan.name}`}
      </button>
    </div>
  );
};

export default PriceCard;
