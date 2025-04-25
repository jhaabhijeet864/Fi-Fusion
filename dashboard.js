import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import StatCard from '../components/dashboard/StatCard';
import BudgetProgressBar from '../components/dashboard/BudgetProgressBar';
import TransactionItem from '../components/dashboard/TransactionItem';
import GoalProgressCard from '../components/dashboard/GoalProgressCard';
import AIInsightCard from '../components/dashboard/AIInsightCard';
import FinancialHealthIndicator from '../components/dashboard/FinancialHealthIndicator';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import Layout from '../components/layout/Layout';
import { FaWallet, FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header'; // Consistent naming
import ExpenseTracker from '../components/dashboard/ExpenseTracker'; // You'll need to create this
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const router = useRouter();
  const { user, loading: authLoading, getUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'expenses'
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        const profile = await getUserProfile();
        setUserProfile(profile);
      }
    };
    
    loadUserProfile();
  }, [user, getUserProfile]);

  // Auth protection
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else {
      setPageLoaded(true);
    }
  }, [authLoading, user, router]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    // Apply dark mode class to document
    if (document.documentElement) {
      if (!darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  // Mock data
  const insights = [
    {
      id: '1',
      title: 'Subscription Optimization',
      description: 'You could save $32/month by consolidating your streaming subscriptions.',
      type: 'saving',
      tag: 'Expense Reduction',
      date: '2023-10-15'
    },
    {
      id: '2',
      title: 'Restaurant Spending Increase',
      description: 'Your dining out expenses have increased by 22% this month compared to your average.',
      type: 'spending-increase',
      tag: 'Spending Pattern',
      date: '2023-10-14'
    },
    {
      id: '3',
      title: 'Emergency Fund Progress',
      description: "You're on track to reach your emergency fund goal 2 months ahead of schedule.",
      type: 'goal-tracking',
      tag: 'Savings',
      date: '2023-10-12'
    },
    {
      id: '4',
      title: 'DeFi Opportunity',
      description: 'Based on your risk profile, stablecoin yield farming could improve your savings rate by 3.5%.',
      type: 'investment',
      tag: 'Investment',
      date: '2023-10-10'
    }
  ];

  // Add the rest of your mock data here (similar to what I provided earlier)
  const stats = [
    { title: 'Monthly Spending', value: '$2,400', icon: <FaWallet className="h-5 w-5" />, trend: { value: 9 } },
    { title: 'Monthly Income', value: '$3,800', icon: <FaDollarSign className="h-5 w-5" />, trend: { value: 0 } },
    { title: 'Savings Rate', value: '$530', icon: <FaPiggyBank className="h-5 w-5" />, trend: { value: 12 } }
  ];
  
  const budgets = [
    { category: 'Housing', allocated: 1200, spent: 1150, color: '#4F46E5' },
    { category: 'Food & Dining', allocated: 500, spent: 425, color: '#10B981' },
    { category: 'Transportation', allocated: 300, spent: 285, color: '#F59E0B' },
    { category: 'Entertainment', allocated: 200, spent: 175, color: '#EF4444' },
    { category: 'Shopping', allocated: 250, spent: 300, color: '#8B5CF6' }
  ];
  
  const transactions = [
    {
      id: '1',
      amount: 42.50,
      category: 'Food & Dining',
      description: 'Restaurant - The Italian Place',
      date: '2023-10-15',
      type: 'expense'
    },
    {
      id: '2',
      amount: 9.99,
      category: 'Subscriptions',
      description: 'Streaming Service',
      date: '2023-10-14',
      type: 'expense'
    },
    {
      id: '3',
      amount: 35.00,
      category: 'Transportation',
      description: 'Uber ride',
      date: '2023-10-13',
      type: 'expense'
    },
    {
      id: '4',
      amount: 1200.00,
      category: 'Income',
      description: 'Salary payment',
      date: '2023-10-10',
      type: 'income'
    }
  ];
  
  const goals = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2023-12-31',
      category: 'Savings'
    },
    {
      id: '2',
      name: 'Vacation',
      targetAmount: 2500,
      currentAmount: 1200,
      deadline: '2023-06-01',
      category: 'Travel'
    }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Head>
        <title>Dashboard | Fi-Fusion</title>
        <meta name="description" content="Your personal financial dashboard" />
      </Head>

      <div className={`flex flex-col lg:flex-row min-h-screen bg-gray-50 
                      transition-opacity duration-500 ease-in-out 
                      ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          {/* Tab Navigation */}
          <div className="bg-white border-b px-4 sm:px-6 py-2 shadow-sm">
            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2 sm:px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 
                          ${activeTab === 'overview'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'}`}
              >
                Overview Dashboard
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-2 sm:px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 
                          ${activeTab === 'expenses'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'}`}
              >
                Expense Tracker
              </button>
            </div>
          </div>
          
          {/* Main Content with initial animation */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {activeTab === 'overview' ? (
              <div className="p-6 space-y-6">
                {/* Welcome Banner */}
                <WelcomeBanner />
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <StatCard 
                      key={index}
                      title={stat.title}
                      value={stat.value}
                      icon={stat.icon}
                      trend={stat.trend}
                    />
                  ))}
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Budget Overview */}
                  <div className="lg:col-span-2 card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Budget Overview</h2>
                      <a href="/budgets" className="text-primary-500 text-sm hover:underline">View All</a>
                    </div>
                    {budgets.map((budget, index) => (
                      <BudgetProgressBar
                        key={index}
                        category={budget.category}
                        allocated={budget.allocated}
                        spent={budget.spent}
                        color={budget.color}
                      />
                    ))}
                  </div>
                  
                  {/* Right Column - Financial Health */}
                  <div className="card p-6">
                    <FinancialHealthIndicator score={75} />
                  </div>
                  
                  {/* Recent Transactions */}
                  <div className="lg:col-span-2 card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Recent Transactions</h2>
                      <a href="/transactions" className="text-primary-500 text-sm hover:underline">View All</a>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-dark-100">
                      {transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Financial Goals */}
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Financial Goals</h2>
                      <a href="/goals" className="text-primary-500 text-sm hover:underline">View All</a>
                    </div>
                    {goals.map((goal) => (
                      <GoalProgressCard key={goal.id} goal={goal} />
                    ))}
                  </div>
                </div>
                
                {/* AI Insights */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {insights.map((insight) => (
                      <AIInsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 sm:p-6">
                <ExpenseTracker />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;