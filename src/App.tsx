'use client';

import { useState } from 'react';
import { BarChart3, Home, Plus, Settings, X } from 'lucide-react';

type Transaction = {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
};

type Category = {
  name: string;
  icon: string;
};

const expenseCategories: Category[] = [
  { name: 'Comida', icon: '🍔' },
  { name: 'Transporte', icon: '🚌' },
  { name: 'Servicios', icon: '💡' },
  { name: 'Entretenimiento', icon: '🎮' },
  { name: 'Salud', icon: '💊' },
  { name: 'Otros', icon: '📦' },
];

const incomeCategories: Category[] = [
  { name: 'Salario', icon: '💼' },
  { name: 'Freelance', icon: '🧑‍💻' },
  { name: 'Regalos', icon: '🎁' },
  { name: 'Otros', icon: '💰' },
];

const getCurrentDate = () => new Date().toISOString().split('T')[0];

const ZombieFinanceApp = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'settings'>('home');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showCustomCategories, setShowCustomCategories] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: 'Otros',
    type: 'expense' as 'income' | 'expense',
    date: getCurrentDate(),
  });

  const addTransaction = () => {
    const amount = parseFloat(newTransaction.amount);
    if (!amount || !newTransaction.description) return;

    const transaction: Transaction = {
      id: Date.now(),
      amount,
      category: newTransaction.category,
      description: newTransaction.description,
      type: newTransaction.type,
      date: newTransaction.date,
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({ amount: '', description: '', category: 'Otros', type: 'expense', date: getCurrentDate() });
    setShowAddTransaction(false);
  };

  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const getExpensesByCategory = () => {
    const grouped: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      });
    return grouped;
  };

  const getIncomesByCategory = () => {
    const grouped: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'income')
      .forEach((t) => {
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pb-28 px-4 pt-6 max-w-md mx-auto">
      {/* Tabs */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          {/* Balance */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-blue-300 font-semibold">Balance mensual</span>
              <span className={`text-2xl font-bold ${monthlyIncome - monthlyExpenses > 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${(monthlyIncome - monthlyExpenses).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setShowAddTransaction(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 font-semibold flex items-center justify-center space-x-2">
              <Plus size={20} />
              <span>Transacción</span>
            </button>
            <button onClick={() => setShowCustomCategories(true)} className="bg-gradient-to-r from-pink-600 to-red-600 rounded-xl p-4 font-semibold flex items-center justify-center space-x-2">
              <Settings size={20} />
              <span>Categorías</span>
            </button>
          </div>

          {/* Lista transacciones */}
          {transactions.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-500/20">
              <h3 className="font-semibold mb-3 text-gray-200 text-lg">Transacciones Recientes</h3>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((t) => {
                  const category = t.type === 'expense'
                    ? expenseCategories.find(c => c.name === t.category)
                    : incomeCategories.find(c => c.name === t.category);
                  return (
                    <div key={t.id} className="flex items-center justify-between py-3 px-2 bg-black/20 rounded-lg border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{category?.icon || '📦'}</div>
                        <div>
                          <p className="text-sm font-medium">{t.description}</p>
                          <p className="text-xs text-gray-400">{t.category} • {t.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${t.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                        {t.type === 'expense' ? '-' : '+'}${t.amount.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">📊 Estadísticas</h2>
            <p className="text-gray-300">Análisis de tus finanzas</p>
          </div>

          {/* Resumen */}
          <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4">💰 Resumen General</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-green-400 font-bold text-2xl">${monthlyIncome.toFixed(2)}</p>
                <p className="text-sm text-gray-300">Ingresos</p>
              </div>
              <div>
                <p className="text-red-400 font-bold text-2xl">${monthlyExpenses.toFixed(2)}</p>
                <p className="text-sm text-gray-300">Gastos</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className={`font-bold text-xl ${monthlyIncome - monthlyExpenses > 0 ? 'text-green-400' : 'text-red-400'}`}>
                Balance: ${(monthlyIncome - monthlyExpenses).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navegación */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-500'}`}>
            <Home size={20} />
            <span className="text-xs">Inicio</span>
          </button>
          <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center ${activeTab === 'stats' ? 'text-purple-400' : 'text-gray-500'}`}>
            <BarChart3 size={20} />
            <span className="text-xs">Stats</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-purple-400' : 'text-gray-500'}`}>
            <Settings size={20} />
            <span className="text-xs">Config</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZombieFinanceApp;
