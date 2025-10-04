import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import api from '../../utils/api';

const UpdateProfileForm = ({ isOpen, onClose, user, showToast }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('username', formData.username);
      if (formData.profileImage)
        data.append('profileImage', formData.profileImage);

      await api.put('/users/profile', data);
      showToast('Profile updated successfully!');
      onClose();
      window.location.reload();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Enter username"
        />
        <Input
          label="Profile Image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.files[0] })
          }
        />
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProfileForm;