import { useState } from "react";
import '../css/Profile.css';
import { Field, system_tags, Button } from "./Components";
import Cookies from 'js-cookie';
import axios from 'axios';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const ProfilePage = () => {
	return (
		<div className='profile-page'>

		</div>
	);
};

export const ProfileFill = () => {
	const [tagsList, setTags] = useState([]);
	const [formData, setFormData] = useState({
		gender: '',
		orientation: '',
		orientation_other: '',
		pictures: [],
	});

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		const selectedImages = files.slice(0, 5);
		const validImages = [];

		selectedImages.forEach(image => {
			if (image.size <= MAX_IMAGE_SIZE)
				validImages.push(image);
			else
				console.error('Error: oversized file');
		});
		setFormData({...formData, pictures: validImages });
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		const token = Cookies.get('access_token');
		axios.post('http://localhost:8000/profile_save_one', {
			formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			if (response.data.ok) {
				console.log(response.data.message);
			}
		})
		.catch(error => {console.error('Error:', error);});
	};

	return (
		<div className="profile-fill-container">
			<div className="wrapper">
			<form onSubmit={handleSumbit}>
				<div className="select-container">
					<select name='gender' value={formData.gender} onChange={handleChange}>
						<option value="" disabled>Select gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Non-binary">Non-binary</option>
					</select>
					<select name="orientation" value={formData.orientation} onChange={handleChange}>
						<option value="" disabled>Select orientation</option>
						<option value="Hetero">Heterosexual</option>
						<option value="Homo">Homosexual</option>
						<option value="Bi">Bi</option>
						<option value="Other">Other (Please specify)</option>
					</select>
				</div>
					{formData.orientation === 'Other' && (
						<input type='text' name='orientation_other' placeholder='Other' value={formData.orientation_other} onChange={handleChange} onClick={(e) => e.stopPropagation()}/>
					)}
					<div>
						<input type='file' accept="image/*" multiple onChange={handleFileChange}/>
					</div>
					<div className="image-preview">
	                {formData.pictures.map((image, index) => (
	                    <img
	                        key={index}
	                        src={URL.createObjectURL(image)}
	                        alt={`Image ${index + 1}`}
	                        style={{ maxWidth: '100%', maxHeight: '150px', margin: '5px' }}
	                    />
	                ))}
	            </div>
					<Button style='profile-btn' type='submit' text='Validate'/>
				</form>
			</div>
		</div>
	);
}

export const BioTagFill = () => {
	const [tagsList, setTags] = useState([]);
	const [formData, setFormData] = useState({
		bio: '',
		tags: [],
	});

	

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

	const handleTagChange = (e) => {
		const tag = e.target.textContent;
		console.log(tag)
		if (tagsList.includes(tag))
			setTags(tagsList.filter(item => item !== tag));
		else
			setTags([...tagsList, tag]);
		formData.tags = tagsList;
	};

	const handleSumbit = (e) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<div className="profile-fill-container">
			<div className="wrapper">
			<form onSubmit={handleSumbit}>
					<textarea
						name='bio'
						rows="10"
						cols="54"
						style={{ resize: "none" }}
						placeholder='Tell us a bit about yourself'
						value={formData.bio}
						onChange={handleChange}>
					</textarea>
					<label>
	                Add Tags: 
	            	</label>
					<div>
	                {system_tags.map((tag, index) => (
						<span
							className={`tag ${tagsList.includes(tag) ? 'tags-active' : ''} tags-list`} // This was a piece of work, but it works!
							onClick={handleTagChange}
							key={index}>{tag}
						</span>
	                ))}
	            	</div>
				</form>
			</div>
		</div>
	);
}
