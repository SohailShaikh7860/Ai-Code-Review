import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from '../config/axios';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here...')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEditorChange = (value) => {
    setCode(value || '')
  }

  const handleReviewCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review')
      return
    }

    setLoading(true)
    setError('')
    setReview('')

    try {
      const response = await axios.post('/ai/generate', { code })
      
      if (response.data.success) {
        setReview(response.data.review)
      } else {
        setError(response.data.error || 'Failed to generate review')
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while generating the review.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setCode('// Write your code here...')
    setReview('')
    setError('')
  }

  return (
    <div className="flex flex-col h-screen p-4 gap-4">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Code Reviewer</h1>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            disabled={loading}
          >
            Clear
          </button>
          <button
            onClick={handleReviewCode}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? 'Reviewing...' : 'Review Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
    
        <div className="flex-1 border rounded-lg overflow-hidden">
          <Editor
            height="100%"
            language="javascript"
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>

        
        <div className="flex-1 border rounded-lg p-4 bg-gray-900 text-white overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Review Results</h2>
          
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {review && !loading && (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{review}</pre>
            </div>
          )}

          {!review && !loading && !error && (
            <p className="text-gray-400 italic">
              Enter your code and click "Review Code" to get AI-powered feedback.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
