

export default function FilterSelect({label, value, options, optionValue, optionLabel, onChange}){
    return(
        <label className="filterSelect"> {label}: <select value={value} onChange={onChange}>
                <option value={""} hidden>Choose {label}</option>
                {options.map((opt)=> <option key={opt[optionValue]} value={opt[optionValue]}>{opt[optionLabel]}</option>)}
            </select>
        </label>
    )
}