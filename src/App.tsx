import React, { useState } from 'react';
import { Plus, Settings, X, Home, BarChart3 } from 'lucide-react';

const expenseCategories = [
  { name: 'Comida', icon: '🍔' },
  { name: 'Transporte', icon: '🚌' },
  { name: 'Servicios', icon: '💡' },
  { name: 'Entretenimiento', icon: '🎮' },
  { name: 'Salud', icon: '🩺' },
  { name: 'Otros', icon: '📦' },
];

const incomeCategories = [
  { name: 'Salario', icon: '💼' },
  { name: 'Freelance', icon: '🧑‍💻' },
  { name: 'Inversiones', icon: '📈' },
  { name: 'Regalos', icon: '🎁' },
  { name: 'Otros', icon: '💰' },
];

const ZombieFinanceApp = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'settings'>('home');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showCustomCategories, setShowCustomCategories] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: 'Otros',
    type: 'expense',
    date: new Date().toLocaleDateString(),
  });

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    setTransactions([{ ...newTransaction, id: Date.now() }, ...transactions]);
    setShowAddTransaction(false);
    setNewTransaction({ amount: '', description: '', category: 'Otros', type: 'expense', date: new Date().toLocaleDateString() });
  };

  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const getExpensesByCategory = () => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        return acc;
      }, {} as Record<string, number>);
  };

  const getIncomesByCategory = () => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        return acc;
      }, {} as Record<string, number>);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-semibold">Balance mensual</span>
                <span className={`text-2xl font-bold ${monthlyIncome - monthlyExpenses > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${(monthlyIncome - monthlyExpenses).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowAddTransaction(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Plus size={20} />
                <span>Transacción</span>
              </button>
              <button
                onClick={() => setShowCustomCategories(true)}
                className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 rounded-xl p-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Settings size={20} />
                <span>Categorías</span>
              </button>
            </div>

            {transactions.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-500/20">
                <h3 className="font-semibold mb-3 text-gray-200 text-lg">Transacciones Recientes</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => {
                    const category = transaction.type === 'expense'
                      ? expenseCategories.find(c => c.name === transaction.category)
                      : incomeCategories.find(c => c.name === transaction.category);
                    return (
                      <div key={transaction.id} className="flex items-center justify-between py-3 px-2 bg-black/20 rounded-lg border border-gray-700/30">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{category?.icon || '📦'}</div>
                          <div>
                            <p className="text-sm text-white font-medium">{transaction.description}</p>
                            <p className="text-xs text-gray-400">{transaction.category} • {transaction.date}</p>
                          </div>
                        </div>
                        <span className={`font-bold text-lg ${transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                          {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
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
            <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-bold text-white mb-4">💰 Resumen General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-green-400 font-bold text-2xl">${monthlyIncome}</p>
                  <p className="text-sm text-gray-300">Total Ingresos</p>
                </div>
                <div className="text-center">
                  <p className="text-red-400 font-bold text-2xl">${monthlyExpenses}</p>
                  <p className="text-sm text-gray-300">Total Gastos</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className={`font-bold text-xl ${monthlyIncome - monthlyExpenses > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  Balance: ${(monthlyIncome - monthlyExpenses).toFixed(2)}
                </p>
              </div>
            </div>
            {/* Aquí puedes continuar con Gastos por Categoría, Ingresos por Categoría, etc. */}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-500'}`}>
            <Home size={20} />
            <span className="text-xs">Inicio</span>
          </button>
          <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'stats' ? 'text-purple-400' : 'text-gray-500'}`}>
            <BarChart3 size={20} />
            <span className="text-xs">Stats</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'settings' ? 'text-purple-400' : 'text-gray-500'}`}>
            <Settings size={20} />
            <span className="text-xs">Config</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZombieFinanceApp;
