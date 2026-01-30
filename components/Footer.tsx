import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-2xl font-bold text-white mb-2 tracking-tighter">QuickStay</div>
        <p className="mb-4 text-sm">The smartest way to book affordable rooms.</p>
        <div className="flex justify-center gap-4 text-xs mb-6">
          <a href="#" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Teams</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
        <div className="text-xs border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} QuickStay Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;