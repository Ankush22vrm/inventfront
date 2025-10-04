import React from 'react';

const ProfileIcon = ({ user, onClick }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
    >
      {user?.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.username}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium">
          {getInitials(user?.username || 'U')}
        </div>
      )}
      <span className="font-medium text-gray-700">{user?.username}</span>
    </button>
  );
};

export default ProfileIcon;