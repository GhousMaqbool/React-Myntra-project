const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{message || "Please try again later."}</p>
      {onRetry && (
        <button type="button" className="btn-secondary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
