import './Form.css';

function InputBox({ label, value, setValue, type, placeholder, maxLength, width }) {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength || 100}
        className="Box"
        style={{ width: width || '100%' }}
      />
    </div>
  );
}

export default InputBox;