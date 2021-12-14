import { Link } from 'react-router-dom';

export const Button = ({ ...props }) => {
  const { text, type, disabled, onClick, url, ariaLabel, children } = props;
  return url ? (
    <Link to={url}>
      <button
        className={`btn btn-${type} mx-1`}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {text && <span className="text">{text}</span>}
        {children}
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`btn btn-${type} mx-1`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {text && <span className="text">{text}</span>}
      {children}
    </button>
  );
};

export default Button;
