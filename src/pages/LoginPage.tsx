import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuthCard from '../components/GoogleAuthModal';
import { ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-4 md:py-8 flex flex-col justify-center min-h-[calc(100vh-130px)]">
      <div className="mb-3 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A5A7A] hover:text-[#0A2A5E] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
        </Link>
      </div>

      <GoogleAuthCard initialMode="unified" />
    </div>
  );
};

export default LoginPage;
