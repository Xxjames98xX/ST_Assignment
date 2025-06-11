import Select from 'react-select';

import './Form.css';

function SelectBox({ label, options, value, onChange }) {
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
      backgroundColor: 'white',
    })
  };

  return (
    <>
      <label className="input -label">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        styles={customStyles}
      />
    </>
  );
}

export default SelectBox;