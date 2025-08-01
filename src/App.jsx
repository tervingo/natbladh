import { useState } from 'react'
import DailyForm from './components/DailyForm'
import DataVisualization from './components/DataVisualization'

function App() {
  const [activeTab, setActiveTab] = useState('form')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Natbladh</h1>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'form'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Skrá gögn
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'data'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Skoða gögn
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'form' ? <DailyForm /> : <DataVisualization />}
        </div>
      </main>
    </div>
  )
}

export default App
