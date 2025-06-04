import React, { useState } from 'react';
import { SummaryForm } from './components/SummaryForm';
import { SummaryResult } from './components/SummaryResult';

export default function App() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarySubmit = async (input: {
    text: string;
    compressionRate: number;
    embeddingType: 'tfidf' | 'roberta';
  }) => {
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const response = await fetch('https://lexrankapp-backend.onrender.com/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input.text,
          compression_rate: input.compressionRate,
          embedding_type: input.embeddingType,
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error.');
      }

      const jsonString = await response.json();  // This is a string, not an object
      const data = JSON.parse(jsonString);
      console.log(data);
      console.log('Full data:', data);
      console.log('data.summary:', data.summary);
      setSummary(data.summary || 'No summary returned.');
    } catch (e) {
      setError('Failed to fetch summary from backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">LexRank Summarizer</h1>
      <SummaryForm onSubmit={handleSummarySubmit} />
      <SummaryResult summary={summary} loading={loading} error={error || undefined} />
    </div>
  );
}
