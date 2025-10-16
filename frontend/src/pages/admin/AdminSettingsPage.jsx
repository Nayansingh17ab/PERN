import { SettingsIcon, StoreIcon, BellIcon, LockIcon, PaletteIcon } from "lucide-react";

function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-base-content/70">Manage your store settings</p>
        </div>

        {/* Store Settings */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <StoreIcon className="w-6 h-6" />
              Store Settings
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Store Name</span>
              </label>
              <input type="text" defaultValue="ShopHub" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Store Email</span>
              </label>
              <input type="email" defaultValue="admin@shophub.com" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Store Description</span>
              </label>
              <textarea className="textarea textarea-bordered" rows="3" defaultValue="Your one-stop shop for everything"></textarea>
            </div>
            <button className="btn btn-primary mt-4">Save Changes</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <BellIcon className="w-6 h-6" />
              Notifications
            </h2>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                <span className="label-text">Email notifications for new orders</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                <span className="label-text">Low stock alerts</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text">Customer review notifications</span>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <LockIcon className="w-6 h-6" />
              Security
            </h2>
            <button className="btn btn-outline">Change Password</button>
            <button className="btn btn-outline">Two-Factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
