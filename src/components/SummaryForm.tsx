import React, { useState } from 'react';

type SummaryInput = {
  text: string;
  compressionRate: number;
  embeddingType: 'tfidf' | 'bert';
};

type SummaryFormProps = {
  onSubmit: (input: SummaryInput) => void;
};

export function SummaryForm({ onSubmit }: SummaryFormProps) {
  const [text, setText] = useState('');
  const [compressionRate, setCompressionRate] = useState(0.3);
  const [embeddingType, setEmbeddingType] = useState<'tfidf' | 'bert'>('tfidf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ text, compressionRate, embeddingType });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label htmlFor="textInput" className="form-label">Text to Summarize</label>
        <textarea
          id="textInput"
          className="form-control"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="compressionInput" className="form-label">
          Compression Rate: {Math.round(compressionRate * 100)}%
        </label>
        <input
          id="compressionInput"
          type="range"
          className="form-range"
          min={0.1}
          max={1}
          step={0.05}
          value={compressionRate}
          onChange={(e) => setCompressionRate(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="embeddingSelect" className="form-label">Embedding Type</label>
        <select
          id="embeddingSelect"
          className="form-select"
          value={embeddingType}
          onChange={(e) => setEmbeddingType(e.target.value as 'tfidf' | 'bert')}
        >
          <option value="tfidf">TF-IDF</option>
          <option value="bert">Dumitrescu Ștefan's BERT model</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Summarize
      </button>
    </form>
  );
}
