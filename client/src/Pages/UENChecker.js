//Libraries
import { useState } from 'react';

//Components
import InputBox from '../Components/InputBox'
import YearSelector from "../Components/YearSelector";
import Button from '../Components/Button';
import SelectBox from '../Components/SelectBox';

//Styles
import '../Components/Form.css';
//Data, small set, can use json. Can be further improved with a database + backend server
import mydata from '../Data/data.json' 

function UENChecker() {

  let array = Object.keys(mydata)
  const Agencies = array.map((value, index) =>
    ({ value: index, label: value })
  );

  //Use states to save data. Uses Javascript array destructuring
  const [UEN, setUEN] = useState('');
  const [Year, setYear] = useState(new Date().getFullYear()); 
  const [Agency, setAgency] = useState(null); 
  const [Entity, setEntity] = useState(null);
  const [EntitiesList, setEntitiesList] = useState(null); // Initialize with Entities

  const [messageCheck, setMessageCheck] = useState();

  return (
    <div className="Form">
      <h1 style={{ textAlign: 'center' }}>UEN Checker</h1>
      <InputBox
        label="UEN"
        type="text"
        placeholder="Enter UEN"
        maxLength={10}
        setValue={setUEN}
        value={UEN}
        width = "200px"
      />

      <YearSelector
        label="Year of Issuance"
        year={Year}
        setYear={setYear}
      />

      <SelectBox
        label="Issuance Agency"
        options={Agencies}
        value={Agency}
        onChange={onChangeAgency}
      />

      <SelectBox
        label="Entity Type"
        options={EntitiesList || []} // If null, use an empty array
        value={Entity}
        onChange={setEntity}
      />

      <Button
        label="Submit"
        onClick={isValidUEN}
      />

      <p>Result: <br />
        {Array.isArray(messageCheck) && messageCheck.map((msg, idx) => (
          <span key={idx}>{msg}<br /></span>
        ))}
      </p>
    </div>
  );

  function isValidUEN() {
    // Check if UEN is valid
    let errors = [];
    if (!UEN || UEN.length === 0 || Agency === null || Entity === null) {
      errors.push('Fields cannot be empty');
      setMessageCheck(errors);
      return;
    }

    //For Local Companies, 10 digits UEN
    if (Entity.label === 'Local Company')
    {
      errors = localCompanyCheck();
    }
    //For Sole Proprietorship/Partnership, 9 digits UEN
    else if (Entity.label === 'Sole Proprietorship/ Partnership')
    {
      errors = solePropPartnershipCheck();
    }
    else
    {
      errors = newUENCheck()
    }

    if (errors.length > 0) {
      setMessageCheck(errors);
    }
    else {
      setMessageCheck([`${UEN} is a VALID UEN✅`]);
    }
  }

  function solePropPartnershipCheck() {
    let errors = [];
    const regex = /^[0-9]{8}[A-Z]$/;
    if (!regex.test(UEN)) {
      errors.push('Invalid UEN format e.g nnnnnnnnX (9 digits)');
    }
    return errors;
  }

  function localCompanyCheck() {
    let errors = [];

    const regex = /^[0-9]{9}[A-Z]$/;
    const YearPrefix = UEN.toString().slice(0, 4);
    if (!regex.test(UEN)) {
      errors.push('Invalid UEN format e.g YYYYnnnnnX (10 digits)');
    } 
    
    if (YearPrefix !== Year.toString()) {
      errors.push(`UEN first four digits: "${YearPrefix}" does not match the year of issuance: "${Year}"`);
    }
    
    return errors;
  }

  function newUENCheck() {
    let errors = [];

    //Need to ensure it makes the correct format "TyyPQnnnnX"
    const regex = /^[A-Z][0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]$/;
    if (!regex.test(UEN)) {
      errors.push('Invalid UEN format. It should be in the format "TyyPQnnnnX"');
    }

    //Checking for "Tyy" Format
    const char = (Year >= 2000) ? 'T' : 'S';
    const correctYear = Year.toString().slice(2,4)
    const UENYearCharPrefix = UEN.toString()[0];
    const UENYearNumPrefix = UEN.toString().slice(1, 3);
    if (UENYearCharPrefix !== char || UENYearNumPrefix !== correctYear){
      errors.push(`"${UENYearCharPrefix}${UENYearNumPrefix}" does not match the year of issuance: "${Year}". It should be "${char}${correctYear}"`);
    }
    
    //Checking for the Indicator
    const UENIndicator = UEN.toString().slice(3, 5);
    const validIndicator = mydata[Agency.label].find(item => item.entity_type === Entity.label)?.indicator;
    if (UENIndicator!==validIndicator)
    {
      errors.push(`Incorrect Indicator "${UENIndicator}", correct indicator should be "${validIndicator}"`)
    }
    
    return errors;
  }

  function onChangeAgency(selectedOption) {
    setAgency(selectedOption);
    const entities = mydata[selectedOption.label].map((item, index) => ({
      value: index,
      label: item.entity_type
    }));
    setEntitiesList(entities);

    // Automatically set the first entity if available  
    if (entities.length > 0) {
      setEntity(entities[0]);
    } else {
      setEntity(null);
    }
  }
}

export default UENChecker;
