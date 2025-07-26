import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Shield, Users, Package, Trash2, RotateCcw } from "lucide-react";

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const vendorData = JSON.parse(localStorage.getItem('vendors') || '[]');
    const supplierData = JSON.parse(localStorage.getItem('suppliers') || '[]');
    
    setVendors(vendorData);
    setSuppliers(supplierData);
    
    // Extract unique group codes
    const uniqueGroups = [...new Set(vendorData.map((v: any) => v.groupCode).filter(Boolean))];
    setGroups(uniqueGroups as string[]);
  };

  const deleteVendor = (vendorId: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      const updatedVendors = vendors.filter(v => v.id !== vendorId);
      localStorage.setItem('vendors', JSON.stringify(updatedVendors));
      setVendors(updatedVendors);
    }
  };

  const deleteSupplier = (supplierId: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      const updatedSuppliers = suppliers.filter(s => s.id !== supplierId);
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      setSuppliers(updatedSuppliers);
    }
  };

  const deleteGroup = (groupCode: string) => {
    if (confirm(`Are you sure you want to delete group ${groupCode}? This will remove all vendors in the group.`)) {
      const updatedVendors = vendors.filter(v => v.groupCode !== groupCode);
      localStorage.setItem('vendors', JSON.stringify(updatedVendors));
      loadData();
    }
  };

  const resetSimulation = () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.removeItem('vendors');
      localStorage.removeItem('suppliers');
      loadData();
      alert('All data has been reset successfully!');
    }
  };

  const getVendorsInGroup = (groupCode: string) => {
    return vendors.filter(v => v.groupCode === groupCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="container mx-auto max-w-6xl">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>

        {/* Admin Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {t('adminPanel')}
              </CardTitle>
              <Button 
                onClick={resetSimulation}
                variant="destructive"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset All Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{vendors.length}</div>
                <div className="text-sm text-muted-foreground">Total {t('vendors')}</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">{suppliers.length}</div>
                <div className="text-sm text-muted-foreground">Total {t('suppliers')}</div>
              </div>
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-success">{groups.length}</div>
                <div className="text-sm text-muted-foreground">Active {t('groups')}</div>
              </div>
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <div className="text-2xl font-bold text-warning">
                  {groups.reduce((sum, groupCode) => sum + getVendorsInGroup(groupCode).length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Memberships</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vendors Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('vendors')} ({vendors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {vendor.foodType} • {vendor.area}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Group: {vendor.groupCode} • {vendor.phoneNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {vendor.isGroupCreator && (
                        <Badge variant="outline">Creator</Badge>
                      )}
                      <Button
                        onClick={() => deleteVendor(vendor.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {vendors.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No vendors registered yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Suppliers Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {t('suppliers')} ({suppliers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.typeOfProducts}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Areas: {supplier.areasServed} • Min Order: {supplier.minimumOrderQuantity}
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteSupplier(supplier.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {suppliers.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No suppliers registered yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Management */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t('groups')} ({groups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((groupCode) => {
                const groupVendors = getVendorsInGroup(groupCode);
                const creator = groupVendors.find(v => v.isGroupCreator);
                return (
                  <Card key={groupCode} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-mono font-bold text-primary">{groupCode}</div>
                          <div className="text-sm text-muted-foreground">
                            {groupVendors.length} vendors
                          </div>
                        </div>
                        <Button
                          onClick={() => deleteGroup(groupCode)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">Area: {creator?.area}</div>
                        <div className="text-muted-foreground">
                          Created by: {creator?.name}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground">Vendors:</div>
                        {groupVendors.slice(0, 3).map((vendor, index) => (
                          <div key={vendor.id} className="text-xs">
                            {vendor.name} ({vendor.foodType})
                          </div>
                        ))}
                        {groupVendors.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{groupVendors.length - 3} more...
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {groups.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-8">
                  No groups created yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}