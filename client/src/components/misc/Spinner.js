export const Spinner = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center pb-4">
      <div
        className="spinner-grow"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
