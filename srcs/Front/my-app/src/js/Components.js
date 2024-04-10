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

export const Button = ({ style, type, text }) => (
	<div className={style}>
		<button type={type}>{text}</button>
	</div>
);

export const system_tags = [
	'#AnimalLover',
	'#Vegan',
	'#Geek',
	'#Manga',
	'#Vegetarian',
	'#Introvert',
	'#Extrovert',
	'#Beach',
	'#Art',
	'#Gamer',
	'#Fitness',
	'#Traveler',
	'#Yoga',
	'#Nutrition',
	'#PetOwner',
	'#MovieBuff',
	'#Adventurer',
	'#NatureLover',
	'#Bookwork',
	'#LanguageLearner',
	'#Coach',
	'#Athlete',
	'#Dancer',
	'#Singer',
	'#Gardener',
	'#Baker',
	'#Chef',
	'#Entrepreneur',
	'#BoardGames',
	'#DrinksEnthusiast',
	'#TechGeek',
]