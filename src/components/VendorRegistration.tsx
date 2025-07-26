import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Users, Plus } from "lucide-react";

interface VendorRegistrationProps {
  onBack: () => void;
  onSuccess: (vendorData: any) => void;
}

export default function VendorRegistration({ onBack, onSuccess }: VendorRegistrationProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    area: '',
    foodType: '',
    whatsappNumber: '',
    preferredTimeSlot: ''
  });
  const [isJoining, setIsJoining] = useState(false);
  const [groupCode, setGroupCode] = useState('');

  const foodTypes = [
    'Chaat', 'Dosa', 'Idli', 'Vada Pav', 'Pani Puri', 'Samosa', 
    'Biryani', 'Rolls', 'Paratha', 'Tea/Coffee', 'Juice', 'Other'
  ];

  const timeSlots = [
    'Morning (6 AM - 10 AM)',
    'Late Morning (10 AM - 12 PM)', 
    'Afternoon (12 PM - 4 PM)',
    'Evening (4 PM - 8 PM)',
    'Night (8 PM - 11 PM)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isJoining && !groupCode.trim()) {
      alert('Please enter a group code');
      return;
    }

    // Simulate vendor registration
    const vendorData = {
      ...formData,
      id: Date.now().toString(),
      groupCode: isJoining ? groupCode : `GRP${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      isGroupCreator: !isJoining
    };

    // Save to localStorage
    const existingVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    existingVendors.push(vendorData);
    localStorage.setItem('vendors', JSON.stringify(existingVendors));

    if (!isJoining) {
      alert(`Group created successfully! Your group code is: ${vendorData.groupCode}`);
    } else {
      alert('Successfully joined the group!');
    }

    onSuccess(vendorData);
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
              <Users className="h-5 w-5 text-primary" />
              {t('vendorRegistration')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('phoneNumber')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">{t('area')} *</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g., Connaught Place, Delhi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="foodType">{t('foodType')} *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, foodType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp">{t('whatsappNumber')}</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timeSlot">{t('preferredTimeSlot')} *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTimeSlot: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Group Action Selection */}
              <div className="border-t pt-4">
                <Label className="text-base font-medium">Group Action</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={!isJoining ? "default" : "outline"}
                    onClick={() => setIsJoining(false)}
                    className="flex-1"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t('createGroup')}
                  </Button>
                  <Button
                    type="button"
                    variant={isJoining ? "default" : "outline"}
                    onClick={() => setIsJoining(true)}
                    className="flex-1"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {t('joinGroupWithCode')}
                  </Button>
                </div>
              </div>

              {isJoining && (
                <div>
                  <Label htmlFor="groupCode">{t('groupCode')} *</Label>
                  <Input
                    id="groupCode"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                    placeholder="Enter group code"
                    className="font-mono"
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {isJoining ? t('joinGroupWithCode') : t('createGroup')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}