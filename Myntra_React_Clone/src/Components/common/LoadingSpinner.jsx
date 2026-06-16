const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="loading-spinner-wrap">
      <span className="loader" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
};

export default LoadingSpinner;
