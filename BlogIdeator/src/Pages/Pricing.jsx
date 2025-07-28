import React from 'react'
import PriceCard from '../components/ui/PriceCard'
import Footer from '../components/ui/Footer'
import Nav from '../components/ui/Nav';
import {auth} from '../firebase/Config'



const Pricing = () => {

  const user=auth.currentUser;
  if(!user){
    return <Navigate to="/login" />
  }
  const userID=user.uid;
  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '$0',
      features: {
        number: 5, // Included
        saveIdea: true,
        seo: '',   // Not included
        Access: 'Full',
        outline: '5',
        publish: false,
        support: 'Basic'
      }
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9',
      features: {
        number: 20,
        saveIdea: true,
        seo: 'Advanced',   // Now included
        Access: 'Full', // Now included
        outline: '50',
        publish: false, // Now included
        support: 'Quick'
      }
    },
    {
      id: 'Pro',
      name: 'Pro Plan',
      price: '$15',
      features: {
        number: 50, // Maybe 'Generate up to 50 blog post ideas per month' needs a different description?
        saveIdea: true, // Maybe 'Unlimited ideas and blogs'?
        seo: 'Advanced',
        Access: 'Full', // Full access, perhaps the description needs to reflect this
        outline: 'Unlimited',
        publish: true,
        support: 'Priority' // Maybe 'Priority support'?
      }
    }
  ];

  return (

    <div className=" bg-gray-50  ">
    <Nav/>
      {/* Content wrapper to limit width and center on large screens */}
      <div className="max-w-7xl mx-auto mb-12 pt-12">
        {/* Heading for the pricing section */}
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Pricing
        </h2>

        {/* Container for the pricing cards */}

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 justify-items-center">
          {
            pricingPlans.map((plan) => (
              <PriceCard key={plan.id} plan={plan} userID={userID} />
            ))
          }
        </div>
      </div>
      <Footer />
    </div>


  )
}

export default Pricing