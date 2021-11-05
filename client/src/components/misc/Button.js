import { Link } from 'react-router-dom';

export const Button = ({ ...props }) => {
  const { text, type, disabled, onClick, url } = props;
  return url ? (
    <Link to={url}>
      <button className={`btn btn-${type} mx-1`} disabled={disabled}>
        <span className="text">{text}</span>
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`btn btn-${type} mx-1`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
