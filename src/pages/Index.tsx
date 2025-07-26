import { useState } from 'react';
import { Button } from "@/components/ui/button";
import LandingPage from '@/components/LandingPage';
import VendorRegistration from '@/components/VendorRegistration';
import SupplierRegistration from '@/components/SupplierRegistration';
import GroupDashboard from '@/components/GroupDashboard';
import SupplierView from '@/components/SupplierView';
import AdminPanel from '@/components/AdminPanel';
import { Shield } from 'lucide-react';

type ViewType = 'landing' | 'vendor-registration' | 'supplier-registration' | 'group-dashboard' | 'supplier-view' | 'admin';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentVendor, setCurrentVendor] = useState<any>(null);
  const [currentSupplier, setCurrentSupplier] = useState<any>(null);
  const [showAdminToggle, setShowAdminToggle] = useState(true);

  const handleVendorSuccess = (vendorData: any) => {
    setCurrentVendor(vendorData);
    setCurrentView('group-dashboard');
  };

  const handleSupplierSuccess = (supplierData: any) => {
    setCurrentSupplier(supplierData);
    setCurrentView('supplier-view');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onJoinVendor={() => setCurrentView('vendor-registration')}
            onBecomeSupplier={() => setCurrentView('supplier-registration')}
          />
        );
      case 'vendor-registration':
        return (
          <VendorRegistration
            onBack={() => setCurrentView('landing')}
            onSuccess={handleVendorSuccess}
          />
        );
      case 'supplier-registration':
        return (
          <SupplierRegistration
            onBack={() => setCurrentView('landing')}
            onSuccess={handleSupplierSuccess}
          />
        );
      case 'group-dashboard':
        return (
          <GroupDashboard
            onBack={() => setCurrentView('landing')}
            vendorData={currentVendor}
          />
        );
      case 'supplier-view':
        return (
          <SupplierView
            onBack={() => setCurrentView('landing')}
            supplierData={currentSupplier}
          />
        );
      case 'admin':
        return (
          <AdminPanel
            onBack={() => setCurrentView('landing')}
          />
        );
      default:
        return <LandingPage onJoinVendor={() => setCurrentView('vendor-registration')} onBecomeSupplier={() => setCurrentView('supplier-registration')} />;
    }
  };

  return (
    <div className="relative">
      {/* Admin Toggle - Fixed position */}
      {showAdminToggle && currentView === 'landing' && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setCurrentView('admin')}
            variant="outline"
            size="sm"
            className="shadow-lg"
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </div>
      )}
      
      {renderCurrentView()}
    </div>
  );
};

export default Index;
