import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-400">
      <Head>
        <title>Fi-Fusion | Personal Finance Dashboard</title>
      </Head>
      
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-primary-600 text-white font-bold text-4xl p-4 rounded-lg mb-4">
            Fi
          </div>
          <div className="bg-white dark:bg-dark-200 text-primary-600 font-bold text-4xl p-4 rounded-lg mb-4 ml-2">
            Fusion
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6">
          Personal Finance Dashboard
        </h2>
        <div className="animate-pulse flex justify-center">
          <div className="h-2.5 w-2.5 bg-primary-600 rounded-full mr-1"></div>
          <div className="h-2.5 w-2.5 bg-primary-600 rounded-full mr-1 animation-delay-200"></div>
          <div className="h-2.5 w-2.5 bg-primary-600 rounded-full animation-delay-500"></div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">Redirecting...</p>
      </div>
    </div>
  );
}