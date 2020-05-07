import React from 'react';
import generateAvatar from 'src/utils/avatarGenerator';

const Badge = ({ user, onClick, wrapperClassName, size, fontSize }) => {
	let { fullName, id, avatar } = user;
	let generatedAvatar;
	if (!avatar) {
		generatedAvatar = generateAvatar(fullName, id, 60, 80);
	}

	return (
		<span className={wrapperClassName}>
			{avatar ? (
				<img
					className="badge"
					onClick={onClick}
					src={avatar}
					alt="Avatar"
					style={{ width: size, height: size, objectFit: 'cover' }}
				/>
			) : (
				<div
					onClick={onClick}
					className="badge"
					style={{ backgroundColor: generatedAvatar.color, height: size, width: size, fontSize: fontSize }}
				>
					{generatedAvatar.badge}
				</div>
			)}
		</span>
	);
};

export default Badge;
