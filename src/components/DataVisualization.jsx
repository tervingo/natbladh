import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { format, parseISO } from 'date-fns'

const DataVisualization = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const q = query(collection(db, 'dailyRecords'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const recordsData = []
      
      querySnapshot.forEach((doc) => {
        recordsData.push({ id: doc.id, ...doc.data() })
      })
      
      setRecords(recordsData)
    } catch (error) {
      console.error('Villa við að sækja gögn:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAverageLekar = () => {
    if (records.length === 0) return 0
    const total = records.reduce((sum, record) => sum + (record['fjöldi leka'] || 0), 0)
    return (total / records.length).toFixed(1)
  }

  const getTotalCoffee = () => {
    return records.reduce((sum, record) => sum + (record.upplýsingar?.kaffi || 0), 0)
  }

  const getAlcoholDays = () => {
    return records.filter(record => record.upplýsingar?.áfengi).length
  }

  const getExerciseDays = () => {
    return records.filter(record => record.upplýsingar?.æfing > 0).length
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Yfirlit gagna</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Meðaltal leka á dag
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {getAverageLekar()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">K</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Samtals kaffi
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {getTotalCoffee()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">Á</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Dagar með áfengi
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {getAlcoholDays()}/{records.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">Æ</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Dagar með æfingu
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {getExerciseDays()}/{records.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Skráð gögn ({records.length} dagar)
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      {format(parseISO(record.date), 'dd/MM/yyyy')}
                    </p>
                    <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <span>Lekar: {record['fjöldi leka'] || 0}</span>
                      <span>Kaffi: {record.upplýsingar?.kaffi || 0}</span>
                      <span>Áfengi: {record.upplýsingar?.áfengi ? 'Já' : 'Nei'}</span>
                      <span>Æfing: {record.upplýsingar?.æfing || 0}</span>
                    </div>
                    {record.athugasemd && (
                      <p className="mt-1 text-sm text-gray-600">
                        Athugasemd: {record.athugasemd}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Skoða nánar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for detailed view */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nánar um {format(parseISO(selectedRecord.date), 'dd/MM/yyyy')}
              </h3>
              
              {/* Lekar */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Lekar ({selectedRecord['fjöldi leka'] || 0})
                </h4>
                {selectedRecord.lekar && selectedRecord.lekar.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRecord.lekar.map((leki, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                        <span className="font-medium">{leki.tími}</span>
                        <span className="ml-4">Styrkur: {leki.styrkur}</span>
                        <span className="ml-4">Inní: {leki.inní}</span>
                        <span className="ml-4">Þörf: {leki.þörf}</span>
                        {leki.aðvarun && <span className="ml-4 text-orange-600">(Aðvarun)</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Engir lekar skráðir</p>
                )}
              </div>

              {/* Upplýsingar */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Upplýsingar</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>Hvar: {selectedRecord.upplýsingar?.hvar || '-'}</div>
                  <div>Kaffi: {selectedRecord.upplýsingar?.kaffi || 0}</div>
                  <div>Áfengi: {selectedRecord.upplýsingar?.áfengi ? 'Já' : 'Nei'}</div>
                  <div>Æfing: {selectedRecord.upplýsingar?.æfing || 0}</div>
                  <div>Seðl: {selectedRecord.upplýsingar?.seðl ? 'Já' : 'Nei'}</div>
                  <div>Lip-riv: {selectedRecord.upplýsingar?.['lip-riv'] || '-'}</div>
                  <div>Síð lio: {selectedRecord.upplýsingar?.['síð lio'] || '-'}</div>
                  <div>Kvöldmat: {selectedRecord.upplýsingar?.kvöldmat || '-'}</div>
                  <div>Að sofa: {selectedRecord.upplýsingar?.['að sofa'] || '-'}</div>
                  <div>Natft: {selectedRecord.upplýsingar?.natft ? 'Já' : 'Nei'}</div>
                  <div>Bl: {selectedRecord.upplýsingar?.bl ? 'Já' : 'Nei'}</div>
                  <div>Pap: {selectedRecord.upplýsingar?.pap ? 'Já' : 'Nei'}</div>
                </div>
              </div>

              {selectedRecord.athugasemd && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Athugasemdir</h4>
                  <p className="text-sm text-gray-600">{selectedRecord.athugasemd}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Loka
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataVisualization