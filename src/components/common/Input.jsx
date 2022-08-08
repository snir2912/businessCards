import classNames from "classnames";

function Input({ label, name, error, ...rest }) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className={classNames("form-control", { "is-invalid": error })}
        {...rest}
      />
      <span className='invalid-feedback'>{error}</span>
    </div>
  );
}

export default Input;
