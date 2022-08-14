import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  console.log("props");
  console.log(otherProps);
  return (
    <div className="group">
      <input className="form-input" {...otherProps}></input>

      {label && (
        <label
          // {console.log(otherProps.value);}
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
