import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Package, Clock, MapPin, Phone, IndianRupee } from "lucide-react";

interface SupplierViewProps {
  onBack: () => void;
  supplierData: any;
}

interface Order {
  id: string;
  groupCode: string;
  area: string;
  items: Array<{
    product: string;
    quantity: string;
    price: number;
  }>;
  totalAmount: number;
  deliveryTime: string;
  status: 'pending' | 'confirmed' | 'delivered';
  vendorCount: number;
}

export default function SupplierView({ onBack, supplierData }: SupplierViewProps) {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Generate mock orders for demo
    const mockOrders: Order[] = [
      {
        id: '1',
        groupCode: 'GRP123ABC',
        area: 'Connaught Place, Delhi',
        items: [
          { product: 'Rice (per kg)', quantity: '50 kg', price: 2500 },
          { product: 'Oil (per liter)', quantity: '20 liters', price: 1600 },
        ],
        totalAmount: 4100,
        deliveryTime: '10:00 AM - 12:00 PM',
        status: 'pending',
        vendorCount: 4
      },
      {
        id: '2',
        groupCode: 'GRP456DEF',
        area: 'Khan Market, Delhi',
        items: [
          { product: 'Wheat Flour (per kg)', quantity: '30 kg', price: 1200 },
          { product: 'Pulses (per kg)', quantity: '15 kg', price: 900 },
        ],
        totalAmount: 2100,
        deliveryTime: '2:00 PM - 4:00 PM',
        status: 'confirmed',
        vendorCount: 3
      },
      {
        id: '3',
        groupCode: 'GRP789GHI',
        area: 'Lajpat Nagar, Delhi',
        items: [
          { product: 'Onions (per kg)', quantity: '25 kg', price: 750 },
          { product: 'Potatoes (per kg)', quantity: '20 kg', price: 400 },
        ],
        totalAmount: 1150,
        deliveryTime: '4:00 PM - 6:00 PM',
        status: 'delivered',
        vendorCount: 2
      }
    ];
    setOrders(mockOrders);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'confirmed': return 'bg-primary text-primary-foreground';
      case 'delivered': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalPendingAmount = orders
    .filter(order => order.status === 'pending')
    .reduce((sum, order) => sum + order.totalAmount, 0);

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

        {/* Supplier Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Supplier Dashboard - {supplierData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{orders.length}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <div className="text-2xl font-bold text-warning flex items-center justify-center gap-1">
                  <IndianRupee className="h-5 w-5" />
                  {totalPendingAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Pending Amount</div>
              </div>
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incoming Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Incoming Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Group {order.groupCode}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {order.area}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {order.deliveryTime}
                          </div>
                          <div>
                            {order.vendorCount} vendors
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {order.totalAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid md:grid-cols-2 gap-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded">
                          <div className="font-medium">{item.product}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity} - ₹{item.price.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <Button 
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          size="sm"
                        >
                          Confirm Order
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="bg-success text-success-foreground hover:bg-success/90"
                          size="sm"
                        >
                          Mark Delivered
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}