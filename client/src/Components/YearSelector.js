import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function YearSelector({ label, year, setYear }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <DatePicker
        selected={year ? new Date(year, 0) : null}
        onChange={date => setYear(date ? date.getFullYear() : '')}
        showYearPicker
        dateFormat="yyyy"
        maxDate={new Date(currentYear, 0)}
      />
    </div>
  );
}

export default YearSelector;