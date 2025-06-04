type SummaryResultProps = {
  summary: string;
  loading: boolean;
  error?: string;
};

export function SummaryResult({ summary, loading, error }: SummaryResultProps) {
  console.log('Rendering SummaryResult with summary:', summary);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!summary) return null;

  return (
    <div className="mt-4">
      <h3>Summary</h3>
      <p className="alert alert-primary">{summary}</p>
    </div>
  );
}
