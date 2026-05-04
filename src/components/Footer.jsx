import React, { useState } from "react";

function Footer() {
  const [showDes, setShowDes] = useState(false)
  return (
    <footer className="bg-black text-white px-10 py-16">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-semibold tracking-wide mb-4"
            onClick={() => setShowDes(!showDes)}
          >
            AUXOM
          </h2>
          {showDes && <p className="text-gray-400 text-sm">
            Premium menswear designed for modern style. Elevate your everyday look.
          </p>
          }

        </div>



        <div>
          <h3 className="text-lg font-medium mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get updates on new collections and offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-black outline-none"
            />

          </div>
        </div>
      </div>


      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2026 AUXOM. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;