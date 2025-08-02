import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { format } from 'date-fns'

const DailyForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    upplýsingar: {
      hvar: '',
      ki: 0,
      áfengi: false,
      æfing: 0,
      sðl: false,
      'lip-riv': '',
      'síð lio': '',
      kvöldmatur: '',
      'síð lát': '',
      'að sofa': '',
      natft: false,
      bl: false,
      pap: false,
    },
    lekar: [],
    lát: [],
    athugasemd: ''
  })

  const [currentLeki, setCurrentLeki] = useState({
    tími: '',
    aðvarun: false,
    styrkur: 1,
    þörf: 0,
  })

  const [currentLát, setCurrentLát] = useState({
    tími: '',
    flaedi: 0,
  })

  const addLeki = () => {
    if (currentLeki.tími) {
      setFormData(prev => ({
        ...prev,
        lekar: [...prev.lekar, { ...currentLeki }]
      }))
      setCurrentLeki({
        tími: '',
        aðvarun: false,
        styrkur: 1,
        þörf: 0,
      })
    }
  }

  const removeLeki = (index) => {
    setFormData(prev => ({
      ...prev,
      lekar: prev.lekar.filter((_, i) => i !== index)
    }))
  }

  const addLát = () => {
    if (currentLát.tími) {
      setFormData(prev => ({
        ...prev,
        lát: [...prev.lát, { ...currentLát }]
      }))
      setCurrentLát({
        tími: '',
        flaedi: 0,
      })
    }
  }

  const removeLát = (index) => {
    setFormData(prev => ({
      ...prev,
      lát: prev.lát.filter((_, i) => i !== index)
    }))
  }

  const handleUpplýsingarChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      upplýsingar: {
        ...prev.upplýsingar,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Sending data:', formData)
    setLoading(true)
    try {
      const dataToSave = {
        ...formData,
        'fjöldi leka': formData.lekar.length,
        timestamp: new Date()
      }
      
      console.log('Data to save:', dataToSave)
      const docRef = await addDoc(collection(db, 'dailyRecords'), dataToSave)
      console.log('Document written with ID: ', docRef.id)
      alert('Gögnum vistaðum! ID: ' + docRef.id)
      
      // Reset form
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        upplýsingar: {
          hvar: '',
          ki: 0,
          áfengi: false,
          æfing: 0,
          sðl: false,
          'lip-riv': '',
          'síð lio': '',
          kvöldmatur: '',
          'síð lát': '',
          'að sofa': '',
          natft: false,
          bl: false,
          pap: false,
        },
        lekar: [],
        lát: [],
        athugasemd: ''
      })
    } catch (error) {
      console.error('Villa við vistun:', error)
      alert('Villa kom upp við vistun: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skrá daglegar upplýsingar</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dagsetning</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Lekar Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lekar</h3>
          
          {/* Add new leki */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tími</label>
              <input
                type="time"
                value={currentLeki.tími}
                onChange={(e) => setCurrentLeki(prev => ({ ...prev, tími: e.target.value }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aðvarun</label>
              <input
                type="checkbox"
                checked={currentLeki.aðvarun}
                onChange={(e) => setCurrentLeki(prev => ({ ...prev, aðvarun: e.target.checked }))}
                className="mt-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Styrkur</label>
              <select
                value={currentLeki.styrkur}
                onChange={(e) => setCurrentLeki(prev => ({ ...prev, styrkur: parseInt(e.target.value) }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Þörf</label>
              <select
                value={currentLeki.þörf}
                onChange={(e) => setCurrentLeki(prev => ({ ...prev, þörf: parseInt(e.target.value) }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            
            <div className="md:col-span-4">
              <button
                type="button"
                onClick={addLeki}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Bæta við leka
              </button>
            </div>
          </div>
          
          {/* List of lekar */}
          {formData.lekar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Skráðir lekar ({formData.lekar.length}):</h4>
              {formData.lekar.map((leki, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                  <span>
                    {leki.tími} - Styrkur: {leki.styrkur}, Þörf: {leki.þörf}
                    {leki.aðvarun && ' (Aðvarun)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLeki(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Fjarlægja
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lát Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lát</h3>
          
          {/* Add new lát */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tími</label>
              <input
                type="time"
                value={currentLát.tími}
                onChange={(e) => setCurrentLát(prev => ({ ...prev, tími: e.target.value }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flæði</label>
              <select
                value={currentLát.flaedi}
                onChange={(e) => setCurrentLát(prev => ({ ...prev, flaedi: parseInt(e.target.value) }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={addLát}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Bæta við lát
              </button>
            </div>
          </div>
          
          {/* List of lát */}
          {formData.lát.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Skráð lát ({formData.lát.length}):</h4>
              {formData.lát.map((lát, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                  <span>
                    {lát.tími} - Flæði: {lát.flaedi}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLát(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Fjarlægja
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upplýsingar Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upplýsingar</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hvar</label>
              <input
                type="text"
                value={formData.upplýsingar.hvar}
                onChange={(e) => handleUpplýsingarChange('hvar', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ki</label>
              <input
                type="number"
                min="0"
                value={formData.upplýsingar.ki}
                onChange={(e) => handleUpplýsingarChange('ki', parseInt(e.target.value) || 0)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.upplýsingar.áfengi}
                onChange={(e) => handleUpplýsingarChange('áfengi', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Áfengi</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Æfing</label>
              <select
                value={formData.upplýsingar.æfing}
                onChange={(e) => handleUpplýsingarChange('æfing', parseInt(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.upplýsingar.sðl}
                onChange={(e) => handleUpplýsingarChange('sðl', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Sðl</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lip-riv</label>
              <input
                type="time"
                value={formData.upplýsingar['lip-riv']}
                onChange={(e) => handleUpplýsingarChange('lip-riv', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Síð lio</label>
              <input
                type="time"
                value={formData.upplýsingar['síð lio']}
                onChange={(e) => handleUpplýsingarChange('síð lio', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kvöldmatur</label>
              <input
                type="time"
                value={formData.upplýsingar.kvöldmatur}
                onChange={(e) => handleUpplýsingarChange('kvöldmatur', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Síð lát</label>
              <input
                type="time"
                value={formData.upplýsingar['síð lát']}
                onChange={(e) => handleUpplýsingarChange('síð lát', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Að sofa</label>
              <input
                type="time"
                value={formData.upplýsingar['að sofa']}
                onChange={(e) => handleUpplýsingarChange('að sofa', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.upplýsingar.natft}
                onChange={(e) => handleUpplýsingarChange('natft', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Natft</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.upplýsingar.bl}
                onChange={(e) => handleUpplýsingarChange('bl', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Bl</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.upplýsingar.pap}
                onChange={(e) => handleUpplýsingarChange('pap', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Pap</label>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Athugasemdir</label>
          <textarea
            value={formData.athugasemd}
            onChange={(e) => setFormData(prev => ({ ...prev, athugasemd: e.target.value }))}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Vistar...' : 'Vista gögn'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DailyForm