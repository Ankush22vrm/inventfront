import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Warehouse, LogIn, UserPlus, User, LogOut, Trash2 } from 'lucide-react';
import Button from '../shared/Button';
import ProfileIcon from '../shared/ProfileIcon';
import DeleteDialog from '../shared/DeleteDialog';
import UpdateProfileForm from '../profile/UpdateProfileForm';
import { logout, deleteAccount } from '../../redux/slices/authSlice';

const Navbar = ({ showToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    showToast('Logged out successfully!');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap();
      showToast('Account deleted successfully!');
      setShowDeleteDialog(false);
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Failed to delete account', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            >
              <Warehouse className="text-purple-600" size={32} />
              <span className="text-xl font-bold text-gray-800">WareFlow</span>
            </div>

            {!isAuthenticated ? (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  <LogIn size={18} />
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  <UserPlus size={18} />
                  Signup
                </Button>
              </div>
            ) : (
              <div className="relative">
                <ProfileIcon
                  user={user}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        setShowUpdateProfile(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User size={18} />
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteDialog(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <UpdateProfileForm
        isOpen={showUpdateProfile}
        onClose={() => setShowUpdateProfile(false)}
        showToast={showToast}
      />

      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will delete all your warehouses and products."
        loading={deleteLoading}
      />
    </>
  );
};

export default Navbar;