import React, { useState } from 'react';
import { Warehouse, LogIn, UserPlus, User, LogOut, Trash2 } from 'lucide-react';
import Button from '../shared/Button';
import ProfileIcon from '../shared/ProfileIcon';
import DeleteDialog from '../shared/DeleteDialog';
import UpdateProfileForm from '../profile/UpdateProfileForm';

const Navbar = ({
  user,
  currentPage,
  onNavigate,
  onLogout,
  onDeleteAccount,
  showToast,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate(user ? 'dashboard' : 'home')}
            >
              <Warehouse className="text-purple-600" size={32} />
              <span className="text-xl font-bold text-gray-800">WareFlow</span>
            </div>

            {!user ? (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onNavigate('login')}>
                  <LogIn size={18} />
                  Login
                </Button>
                <Button onClick={() => onNavigate('signup')}>
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
                      onClick={() => {
                        onLogout();
                        setShowProfileMenu(false);
                      }}
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
        user={user}
        showToast={showToast}
      />

      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDeleteAccount();
          setShowDeleteDialog(false);
        }}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will delete all your warehouses and products."
      />
    </>
  );
};

export default Navbar;