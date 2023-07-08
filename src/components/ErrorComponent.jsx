export default function Error({ error }) {
  return (
    <div>
      <h4 className="error-text">Error: {error}</h4>;
      {/* Additional error handling UI */}
    </div>
  );
}
