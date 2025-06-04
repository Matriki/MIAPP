// src/App.tsx
import { useState } from "react";
import { Home, BarChart3, Settings } from "lucide-react";

// Define tus categorías con iconos (puedes cambiar o agregar)
const expenseCategories = [
  { name: "Comida", icon: "🍔" },
  { name: "Transporte", icon: "🚗" },
  { name: "Salud", icon: "💊" },
  { name: "Entretenimiento", icon: "🎬" },
];

const incomeCategories = [
  { name: "Salario", icon: "💼" },
  { name: "Ventas", icon: "🛒" },
  { name: "Inversiones", icon: "📈" },
];

type TransactionType = "income" | "expense";

interface Transaction {
  id: number;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
}

const ZombieFinanceApp = () => {
  // Estado general
  const [activeTab, setActiveTab] = useState<"home" | "stats" | "settings">("home");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Nuevo movimiento en proceso
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    type: "expense",
    category: expenseCategories[0].name,
    amount: 0,
    description: "",
  });

  // Control para mostrar modal de agregar transacción
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Función para agregar nueva transacción
  const addTransaction = () => {
    if (newTransaction.amount <= 0) {
      alert("Ingresa un monto válido");
      return;
    }
    setTransactions((prev) => [
      ...prev,
      { ...newTransaction, id: Date.now() },
    ]);
    setShowAddTransaction(false);
    // Reset newTransaction a valores iniciales
    setNewTransaction({
      id: 0,
      type: "expense",
      category: expenseCategories[0].name,
      amount: 0,
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-purple-700 text-center font-bold text-xl">
        Zombie Finance
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-4 overflow-auto">
        {activeTab === "home" && (
          <>
            <button
              onClick={() => setShowAddTransaction(true)}
              className="mb-4 bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 font-semibold transition"
            >
              + Agregar transacción
            </button>

            <div>
              {transactions.length === 0 && (
                <p className="text-gray-400">No hay transacciones aún.</p>
              )}
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 mb-2 rounded-lg ${
                    t.type === "income"
                      ? "bg-green-700"
                      : "bg-red-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>{t.category}</strong> - {t.description}
                    </div>
                    <div>
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "stats" && (
          <div className="text-center text-gray-400">Estadísticas (en desarrollo)</div>
        )}

        {activeTab === "settings" && (
          <div className="text-center text-gray-400">Configuración (en desarrollo)</div>
        )}
      </main>

      {/* Modal para agregar transacción */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-purple-500/40">
            <h2 className="text-xl font-bold mb-4">Nueva Transacción</h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Tipo:</label>
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: e.target.value as TransactionType,
                    category:
                      e.target.value === "expense"
                        ? expenseCategories[0].name
                        : incomeCategories[0].name,
                  })
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Categoría:</label>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                {(newTransaction.type === "expense"
                  ? expenseCategories
                  : incomeCategories
                ).map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Monto:</label>
              <input
                type="number"
                min={0}
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Descripción:</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddTransaction(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 rounded-lg p-3 font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={addTransaction}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg p-3 font-semibold transition"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === "home" ? "text-purple-400" : "text-gray-500"
            }`}
            aria-label="Inicio"
          >
            <Home size={20} />
            <span className="text-xs">Inicio</span>
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === "stats" ? "text-purple-400" : "text-gray-500"
            }`}
            aria-label="Estadísticas"
          >
            <BarChart3 size={20} />
            <span className="text-xs">Stats</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === "settings" ? "text-purple-400" : "text-gray-500"
            }`}
            aria-label="Configuración"
          >
            <Settings size={20} />
            <span className="text-xs">Config</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ZombieFinanceApp;
