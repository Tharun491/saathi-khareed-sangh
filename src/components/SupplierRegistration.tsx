import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Package } from "lucide-react";

interface SupplierRegistrationProps {
  onBack: () => void;
  onSuccess: (supplierData: any) => void;
}

export default function SupplierRegistration({ onBack, onSuccess }: SupplierRegistrationProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    typeOfProducts: '',
    areasServed: '',
    contactNumber: '',
    minimumOrderQuantity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate supplier registration
    const supplierData = {
      ...formData,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingSuppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
    existingSuppliers.push(supplierData);
    localStorage.setItem('suppliers', JSON.stringify(existingSuppliers));

    alert('Supplier registration successful! You will be notified when groups place orders.');
    onSuccess(supplierData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              {t('supplierRegistration')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="supplierName">{t('name')} *</Label>
                <Input
                  id="supplierName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your business/company name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="products">{t('typeOfProducts')} *</Label>
                <Textarea
                  id="products"
                  value={formData.typeOfProducts}
                  onChange={(e) => setFormData(prev => ({ ...prev, typeOfProducts: e.target.value }))}
                  placeholder="e.g., Rice, Wheat, Pulses, Spices, Vegetables, Oil, etc."
                  required
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="areas">{t('areasServed')} *</Label>
                <Textarea
                  id="areas"
                  value={formData.areasServed}
                  onChange={(e) => setFormData(prev => ({ ...prev, areasServed: e.target.value }))}
                  placeholder="e.g., Connaught Place, Khan Market, Lajpat Nagar, Delhi"
                  required
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactNumber">{t('contactNumber')} *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="minOrder">{t('minimumOrderQuantity')} *</Label>
                  <Input
                    id="minOrder"
                    value={formData.minimumOrderQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, minimumOrderQuantity: e.target.value }))}
                    placeholder="e.g., 50 kg, ₹10,000"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {t('register')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}