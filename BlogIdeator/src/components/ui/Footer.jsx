import React from 'react'

const Footer = () => {
  return (
    
     <>
     <footer className="bg-gray-800 text-white">
     <div className="container mx-auto px-6 py-8">
       <div className="flex flex-col md:flex-row justify-between">
         <div className="mb-6 md:mb-0">
           <h2 className="font-bold text-2xl mb-4">TrendBuddy</h2>
           <p className="text-gray-400 max-w-xs">
             Discover trending topics and create high-quality blog content
             powered by AI.
           </p>
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
           <div>
             <h3 className="font-semibold text-lg mb-4">Links</h3>
             <ul className="space-y-2">
               <li>
                 <a
                   href="/About"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   About
                 </a>
               </li>
               <li>
                 <a
                   href="https://medium.com/@FinanceWithGaurav"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   Blog
                 </a>
               </li>
               <li>
                 <a
                   href="#"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   Contact
                 </a>
               </li>
             </ul>
           </div>

           <div>
             <h3 className="font-semibold text-lg mb-4">Resources</h3>
             <ul className="space-y-2">
               <li>
                 <a
                   href="#"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   Documentation
                 </a>
               </li>
               <li>
                 <a
                   href="#"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   GitHub
                 </a>
               </li>
               <li>
                 <a
                   href="#"
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   Privacy
                 </a>
               </li>
             </ul>
           </div>

           <div>
             <h3 className="font-semibold text-lg mb-4">Connect</h3>
             <div className="flex space-x-4">
               <a
                 href="https://x.com/hustlrGaurav"
                 className="text-gray-400 hover:text-white transition-colors"
               >
                 <svg
                   className="w-6 h-6"
                   fill="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                 </svg>
               </a>
               <a
                 href="https://github.com/Gaurav-Sng"
                 className="text-gray-400 hover:text-white transition-colors"
               >
                 <svg
                   className="w-6 h-6"
                   fill="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                 </svg>
               </a>
               <a
                 href="https://www.linkedin.com/in/gaurav-a346432a7/"
                 className="text-gray-400 hover:text-white transition-colors"
               >
                <svg
  className="w-6 h-6"
  fill="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.08 8.12h4.84V24H.08V8.12zM8.54 8.12h4.64v2.16h.07c.65-1.22 2.25-2.5 4.64-2.5 4.96 0 5.88 3.26 5.88 7.5V24h-4.84v-7.84c0-1.87-.03-4.27-2.6-4.27-2.6 0-3 2.02-3 4.12V24H8.54V8.12z"/>
</svg>

               </a>
             </div>
           </div>
         </div>
       </div>

       <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
         <p className="text-gray-400">
           © 2025 TrendBuddy. All rights reserved.
         </p>
         <p className="text-gray-400 mt-4 md:mt-0">
           Built with ❤️ by Gaurav
         </p>
       </div>
     </div>
   </footer>
   </>
  )
}

export default Footer;