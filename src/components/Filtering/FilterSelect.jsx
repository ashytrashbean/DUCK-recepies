

export default function FilterSelect({label, value, options, optionValue, optionLable, onChange}){
    return(
        <label> {label}: <select value={value} onChange={onChange}>
                <option value={""}>Choose {label}</option>
                {options.map((opt)=> <option key={opt[optionValue]} value={opt[optionValue]}>{opt[optionLable]}</option>)}
            </select>
        </label>
    )
}