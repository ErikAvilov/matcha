export const Field = ({ type, inputname, placeholder, value, style, onChange }) => (
	<div className={style}>
	  <input
		type={type}
		name={inputname}
		placeholder={placeholder}
		required
		value={value}
		onChange={onChange}
	  />
	</div>
);