import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Users, Package, Clock, Calculator, IndianRupee } from "lucide-react";

interface GroupDashboardProps {
  onBack: () => void;
  vendorData: any;
}

interface OrderItem {
  product: string;
  quantity: string;
  price: number;
  isPaid: boolean;
}

export default function GroupDashboard({ onBack, vendorData }: GroupDashboardProps) {
  const { t } = useTranslation();
  const [groupVendors, setGroupVendors] = useState<any[]>([]);
  const [orders, setOrders] = useState<{ [vendorId: string]: OrderItem[] }>({});
  const [deliveryTime, setDeliveryTime] = useState('');

  useEffect(() => {
    // Load group vendors from localStorage
    const allVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const sameGroupVendors = allVendors.filter((vendor: any) => vendor.groupCode === vendorData.groupCode);
    setGroupVendors(sameGroupVendors);

    // Initialize orders for current vendor
    if (!orders[vendorData.id]) {
      setOrders(prev => ({
        ...prev,
        [vendorData.id]: []
      }));
    }
  }, [vendorData]);

  const addOrderItem = () => {
    setOrders(prev => ({
      ...prev,
      [vendorData.id]: [
        ...prev[vendorData.id] || [],
        { product: '', quantity: '', price: 0, isPaid: false }
      ]
    }));
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: any) => {
    setOrders(prev => ({
      ...prev,
      [vendorData.id]: prev[vendorData.id].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeOrderItem = (index: number) => {
    setOrders(prev => ({
      ...prev,
      [vendorData.id]: prev[vendorData.id].filter((_, i) => i !== index)
    }));
  };

  const calculateTotalCost = () => {
    const allOrders = Object.values(orders).flat();
    return allOrders.reduce((total, item) => total + (item.price || 0), 0);
  };

  const calculateVendorShare = () => {
    const totalCost = calculateTotalCost();
    const vendorCount = groupVendors.length;
    return vendorCount > 0 ? totalCost / vendorCount : 0;
  };

  const products = [
    'Rice (per kg)', 'Wheat Flour (per kg)', 'Oil (per liter)', 
    'Onions (per kg)', 'Potatoes (per kg)', 'Tomatoes (per kg)',
    'Pulses (per kg)', 'Spices Mix (per kg)', 'Tea Leaves (per kg)',
    'Sugar (per kg)', 'Salt (per kg)', 'Other'
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM', 
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>

        <div className="grid gap-6">
          {/* Group Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('groupDashboard')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Group Code</Label>
                  <div className="text-2xl font-mono font-bold text-primary">{vendorData.groupCode}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Area</Label>
                  <div className="text-lg">{vendorData.area}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('vendorsInGroup')} ({groupVendors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {groupVendors.map((vendor, index) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-muted-foreground">{vendor.foodType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{vendor.phoneNumber}</div>
                      {vendor.id === vendorData.id && (
                        <div className="text-xs text-primary font-medium">You</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Bulk Order */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {t('activeBulkOrder')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders[vendorData.id]?.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`product-${index}`}>Product</Label>
                    <Select onValueChange={(value) => updateOrderItem(index, 'product', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product} value={product}>{product}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${index}`}>{t('quantity')}</Label>
                    <Input
                      id={`quantity-${index}`}
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                      placeholder="e.g., 10 kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`price-${index}`}>Price (₹)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      value={item.price}
                      onChange={(e) => updateOrderItem(index, 'price', Number(e.target.value))}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={item.isPaid}
                        onCheckedChange={(checked) => updateOrderItem(index, 'isPaid', checked)}
                      />
                      <Label className="text-sm">{t('markAsPaid')}</Label>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeOrderItem(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button onClick={addOrderItem} variant="outline" className="w-full">
                Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                {t('paymentSimulation')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {calculateTotalCost().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('totalBulkCost')}</div>
                </div>
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {calculateVendorShare().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{t('yourContribution')}</div>
                </div>
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-warning">
                    {groupVendors.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Vendors Sharing</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Coordination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {t('deliveryCoordination')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryTime">{t('deliveryTime')}</Label>
                  <Select onValueChange={setDeliveryTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={() => alert('Delivery time confirmed and suppliers notified!')}
                    disabled={!deliveryTime}
                    className="w-full"
                  >
                    {t('confirm')} Delivery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}