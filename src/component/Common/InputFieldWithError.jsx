function InputFieldWithError({
  type,
  name,
  placeholder,
  value,
  onChange,
  displayError,
  errorMessage,
})
 {
  return <div className="main-container">
        <div className="input-field-container">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
      />
      {displayError && value === "" && (
        <div className="show-error" style={{ marginBottom: "15px" }}>
          <span style={{ color: "red" }}>{errorMessage}</span>
        </div>
      )}
    </div>
  </div>;
}

export default InputFieldWithError;
