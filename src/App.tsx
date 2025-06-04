import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Plus, Minus, Settings, Home, BarChart3, Coffee, Car, Briefcase, Gift, Zap, X } from 'lucide-react';

const ZombieFinanceApp = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showCustomCategories, setShowCustomCategories] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ 
    amount: '', 
    description: '', 
    type: 'expense',
    category: 'Otros'
  });
  const [zombieAnimation, setZombieAnimation] = useState('');

  // Categorías predefinidas
  const expenseCategories = [
    { name: 'Comida', icon: '🍔', color: 'text-orange-400' },
    { name: 'Transporte', icon: '🚗', color: 'text-blue-400' },
    { name: 'Entretenimiento', icon: '🎮', color: 'text-purple-400' },
    { name: 'Servicios', icon: '⚡', color: 'text-yellow-400' },
    { name: 'Compras', icon: '🛍️', color: 'text-pink-400' },
    { name: 'Otros', icon: '📦', color: 'text-gray-400' }
  ];

  const incomeCategories = [
    { name: 'Salario', icon: '💼', color: 'text-green-400' },
    { name: 'Freelance', icon: '💻', color: 'text-blue-400' },
    { name: 'Inversiones', icon: '📈', color: 'text-purple-400' },
    { name: 'Regalos', icon: '🎁', color: 'text-pink-400' },
    { name: 'Otros', icon: '💰', color: 'text-yellow-400' }
  ];

  // Animación del zombie
  useEffect(() => {
    const interval = setInterval(() => {
      const health = financialHealth();
      if (health === 'excellent') {
        setZombieAnimation(Math.random() > 0.7 ? 'animate-bounce' : '');
      } else if (health === 'critical') {
        setZombieAnimation(Math.random() > 0.8 ? 'animate-pulse' : '');
      } else {
        setZombieAnimation('');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [monthlyIncome, monthlyExpenses]);

  // Calcular estado financiero
  const financialHealth = () => {
    const ratio = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0;
    if (ratio > 0.3) return 'excellent';
    if (ratio > 0.1) return 'good';
    if (ratio > -0.1) return 'poor';
    return 'critical';
  };

  // Avatar zombie dinámico
  const getZombieDisplay = () => {
    const health = financialHealth();
    const baseSize = 'text-8xl';
    
    switch (health) {
      case 'excellent': 
        return { 
          emoji: '🧟‍♂️', 
          effect: '✨💎✨', 
          size: baseSize,
          glow: 'drop-shadow-2xl filter drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]'
        };
      case 'good': 
        return { 
          emoji: '🧟‍♂️', 
          effect: '😊💚', 
          size: baseSize,
          glow: 'drop-shadow-xl filter drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]'
        };
      case 'poor': 
        return { 
          emoji: '🧟‍♂️', 
          effect: '😰💔', 
          size: baseSize,
          glow: 'drop-shadow-lg filter drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]'
        };
      case 'critical': 
        return { 
          emoji: '🧟‍♂️', 
          effect: '💀🚨', 
          size: baseSize,
          glow: 'drop-shadow-2xl filter drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]'
        };
      default: 
        return { 
          emoji: '🧟‍♂️', 
          effect: '', 
          size: baseSize,
          glow: ''
        };
    }
  };

  const getZombieMessage = () => {
    const health = financialHealth();
    const messages = {
      excellent: [
        '¡Soy un zombie millonario! 💎',
        '¡Mis finanzas están VIVAS! ⚡',
        '¡Cerebros Y dinero! 🧠💰'
      ],
      good: [
        'Me siento revitalizado 💚',
        'Buen trabajo, humano 👍',
        'Vamos por buen camino 📈'
      ],
      poor: [
        'Necesito más cerebros... digo, dinero 🧠',
        'Mis huesos crujen de preocupación 😰',
        'Cuidado con los gastos 👻'
      ],
      critical: [
        '¡MAYDAY! ¡Finanzas zombificadas! 🚨',
        '¡Auxilio! ¡Estoy más muerto que vivo! 💀',
        '¡Emergencia financiera! 🆘'
      ]
    };
    
    const healthMessages = messages[health] || ['Configura tus datos para ayudarte'];
    return healthMessages[Math.floor(Math.random() * healthMessages.length)];
  };

  // Stats calculations
  const getExpensesByCategory = () => {
    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    return categoryTotals;
  };

  const getIncomesByCategory = () => {
    const categoryTotals = {};
    transactions.filter(t => t.type === 'income').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    return categoryTotals;
  };

  const handleSetup = () => {
    if (currentBalance !== '' && monthlyIncome !== '' && monthlyExpenses !== '') {
      setIsSetupMode(false);
    }
  };

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description && newTransaction.category) {
      const transaction = {
        id: Date.now(),
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        type: newTransaction.type,
        category: newTransaction.category,
        date: new Date().toLocaleDateString()
      };
      
      setTransactions([transaction, ...transactions]);
      
      if (newTransaction.type === 'expense') {
        setCurrentBalance(prev => prev - transaction.amount);
        setMonthlyExpenses(prev => prev + transaction.amount);
      } else {
        setCurrentBalance(prev => prev + transaction.amount);
        setMonthlyIncome(prev => prev + transaction.amount);
      }
      
      setNewTransaction({ amount: '', description: '', type: 'expense', category: 'Otros' });
      setShowAddTransaction(false);
    }
  };

  if (isSetupMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-pulse">🧟‍♂️</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              ZombiFinance
            </h1>
            <p className="text-gray-300 mt-2 text-lg">¡Hola! Soy tu zombie financiero. Configura tus datos para empezar.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 transform hover:scale-105 transition-all">
              <label className="block text-purple-300 mb-2 font-semibold">💰 Dinero actual</label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-xl focus:border-purple-500 focus:outline-none transition-all"
                placeholder="$0.00"
              />
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 transform hover:scale-105 transition-all">
              <label className="block text-green-300 mb-2 font-semibold">📈 Ingresos mensuales</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-xl focus:border-green-500 focus:outline-none transition-all"
                placeholder="$0.00"
              />
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20 transform hover:scale-105 transition-all">
              <label className="block text-red-300 mb-2 font-semibold">📉 Gastos mensuales</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-xl focus:border-red-500 focus:outline-none transition-all"
                placeholder="$0.00"
              />
            </div>

            <button
              onClick={handleSetup}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-xl p-5 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 Comenzar mi aventura financiera
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white pb-20">
      {/* Header con zombie dinámico */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-purple-500/20 p-6">
        <div className="max-w-md mx-auto text-center">
          <div className={`${getZombieDisplay().size} ${zombieAnimation} ${getZombieDisplay().glow} mb-2`}>
            {getZombieDisplay().emoji}
          </div>
          <div className="text-2xl mb-2">{getZombieDisplay().effect}</div>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ZombiFinance
          </h2>
          <p className="text-green-300 text-xl font-bold">${currentBalance.toFixed(2)}</p>
          <div className="bg-gray-800/50 rounded-xl p-3 mt-3 border border-purple-500/20">
            <p className="text-gray-200 text-sm font-medium">{getZombieMessage()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-900/30 backdrop-blur-lg rounded-xl p-4 border border-green-500/20 transform hover:scale-105 transition-all">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-400" size={20} />
                  <span className="text-green-300 text-sm">Ingresos</span>
                </div>
                <p className="text-xl font-bold text-white mt-1">${monthlyIncome}</p>
              </div>

              <div className="bg-red-900/30 backdrop-blur-lg rounded-xl p-4 border border-red-500/20 transform hover:scale-105 transition-all">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="text-red-400" size={20} />
                  <span className="text-red-300 text-sm">Gastos</span>
                </div>
                <p className="text-xl font-bold text-white mt-1">${monthlyExpenses}</p>
              </div>
            </div>

            {/* Balance restante */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-xl p-4 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-semibold">Balance mensual</span>
                <span className={`text-2xl font-bold ${
                  (monthlyIncome - monthlyExpenses) > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${(monthlyIncome - monthlyExpenses).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
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

            {/* Transacciones recientes */}
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
                        <span className={`font-bold text-lg ${
                          transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                        }`}>
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

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">📊 Estadísticas</h2>
              <p className="text-gray-300">Análisis de tus finanzas</p>
            </div>

            {/* Resumen general */}
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
                <p className={`font-bold text-xl ${
                  (monthlyIncome - monthlyExpenses) > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  Balance: ${(monthlyIncome - monthlyExpenses).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Gastos por categoría */}
            {Object.keys(getExpensesByCategory()).length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-bold text-red-300 mb-4">📉 Gastos por Categoría</h3>
                <div className="space-y-3">
                  {Object.entries(getExpensesByCategory()).map(([category, amount]) => {
                    const categoryInfo = expenseCategories.find(c => c.name === category);
                    const percentage = monthlyExpenses > 0 ? (amount / monthlyExpenses * 100).toFixed(1) : 0;
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{categoryInfo?.icon || '📦'}</span>
                          <div>
                            <p className="text-white font-medium">{category}</p>
                            <p className="text-gray-400 text-sm">{percentage}% del total</p>
                          </div>
                        </div>
                        <p className="text-red-400 font-bold">${amount.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ingresos por categoría */}
            {Object.keys(getIncomesByCategory()).length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-green-300 mb-4">📈 Ingresos por Categoría</h3>
                <div className="space-y-3">
                  {Object.entries(getIncomesByCategory()).map(([category, amount]) => {
                    const categoryInfo = incomeCategories.find(c => c.name === category);
                    const percentage = monthlyIncome > 0 ? (amount / monthlyIncome * 100).toFixed(1) : 0;
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{categoryInfo?.icon || '💰'}</span>
                          <div>
                            <p className="text-white font-medium">{category}</p>
                            <p className="text-gray-400 text-sm">{percentage}% del total</p>
                          </div>
                        </div>
                        <p className="text-green-400 font-bold">${amount.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-400">No hay transacciones aún</p>
                <p className="text-gray-500 text-sm">Agrega algunas transacciones para ver tus estadísticas</p>
              </div>
            )}
          </div>
        )}

        {/* Modal agregar transacción */}
        {showAddTransaction && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-purple-500/20 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Nueva Transacción</h3>
                <button onClick={() => setShowAddTransaction(false)}>
                  <X className="text-gray-400 hover:text-white" size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNewTransaction({...newTransaction, type: 'expense', category: 'Otros'})}
                    className={`flex-1 p-3 rounded-lg font-semibold ${newTransaction.type === 'expense' ? 'bg-red-600' : 'bg-gray-700'}`}
                  >
                    💸 Gasto
                  </button>
                  <button
                    onClick={() => setNewTransaction({...newTransaction, type: 'income', category: 'Otros'})}
                    className={`flex-1 p-3 rounded-lg font-semibold ${newTransaction.type === 'income' ? 'bg-green-600' : 'bg-gray-700'}`}
                  >
                    💰 Ingreso
                  </button>
                </div>

                <input
                  type="number"
                  placeholder="Cantidad ($)"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-lg focus:border-purple-500 focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Descripción"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white focus:border-purple-500 focus:outline-none"
                />

                {/* Selector de categorías */}
                <div>
                  <p className="text-gray-300 mb-2 font-semibold">Categoría:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(newTransaction.type === 'expense' ? expenseCategories : incomeCategories).map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setNewTransaction({...newTransaction, category: category.name})}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          newTransaction.category === category.name 
                            ? 'bg-purple-600 border-purple-400' 
                            : 'bg-gray-700 border-gray-600 hover:border-purple-400'
                        }`}
                      >
                        <div className="text-xl mb-1">{category.icon}</div>
                        <div>{category.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => setShowAddTransaction(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 rounded-xl p-4 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addTransaction}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-4 transition-all font-semibold"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal categorías personalizadas */}
        {showCustomCategories && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-purple-500/20 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Categorías</h3>
                <button onClick={() => setShowCustomCategories(false)}>
                  <X className="text-gray-400 hover:text-white" size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-3">💸 Categorías de Gastos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {expenseCategories.map((category) => (
                      <div key={category.name} className="bg-gray-800 rounded-lg p-3 text-center border border-red-500/20">
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm text-white">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-300 mb-3">💰 Categorías de Ingresos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {incomeCategories.map((category) => (
                      <div key={category.name} className="bg-gray-800 rounded-lg p-3 text-center border border-green-500/20">
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm text-white">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowCustomCategories(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-4 transition-all font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'home' ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Inicio</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'stats' ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            <BarChart3 size={20} />
            <span className="text-xs">Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === 'settings' ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            <Settings size={20} />
            <span className="text-xs">Config</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZombieFinanceApp;
