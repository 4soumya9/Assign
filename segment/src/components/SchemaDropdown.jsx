function SchemaDropdown({value, index, onChange, onRemove, allOptions, selected}) {

  const filtered = allOptions.filter(
    opt => opt.value===value || !selected.includes(opt.value)
  )

  const selectedObj = allOptions.find(opt => opt.value === value)
  const colorClass = selectedObj?.type === "user" ? "dot user" : "dot group"

  return (
    <div className="schemaRow">
      <span className={colorClass}></span>
      <select 
        value={value}
        onChange={(e)=>onChange(index, e.target.value)}
        className="schemaSelect"
      >
        {filtered.map(opt=>(
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button 
        onClick={()=>onRemove(index)} 
        className="removeBtn"
      >
        -
      </button>
    </div>
  )
}

export default SchemaDropdown
