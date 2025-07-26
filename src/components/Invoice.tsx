import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { FileText, Download, Mail, X, IndianRupee } from "lucide-react";

interface OrderItem {
  product: string;
  quantity: string;
  price: number;
  isPaid: boolean;
}

interface InvoiceProps {
  orders: OrderItem[];
  vendorData: any;
  groupVendors: any[];
  deliveryTime: string;
  onClose: () => void;
}

export default function Invoice({ orders, vendorData, groupVendors, deliveryTime, onClose }: InvoiceProps) {
  const { t } = useTranslation();
  
  const totalAmount = orders.reduce((sum, item) => sum + item.price, 0);
  const vendorShare = groupVendors.length > 0 ? totalAmount / groupVendors.length : 0;
  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const currentDate = new Date().toLocaleDateString('en-IN');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create downloadable content
    const invoiceContent = `
VendorUnity Invoice
Invoice #: ${invoiceNumber}
Date: ${currentDate}
Vendor: ${vendorData.name}
Group Code: ${vendorData.groupCode}
Area: ${vendorData.area}

Order Details:
${orders.map(item => `${item.product} - ${item.quantity} - ₹${item.price}`).join('\n')}

Total Amount: ₹${totalAmount}
Your Share: ₹${vendorShare.toFixed(2)}
Delivery Time: ${deliveryTime}
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Order Invoice</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Invoice Header */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-primary">VendorUnity</h2>
            <p className="text-muted-foreground">Empowering Street Vendors Through Bulk Buying</p>
          </div>

          {/* Invoice Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Invoice Details</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Invoice #:</span> {invoiceNumber}</div>
                <div><span className="font-medium">Date:</span> {currentDate}</div>
                <div><span className="font-medium">Delivery Time:</span> {deliveryTime || 'TBD'}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Vendor Details</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Name:</span> {vendorData.name}</div>
                <div><span className="font-medium">Group Code:</span> {vendorData.groupCode}</div>
                <div><span className="font-medium">Area:</span> {vendorData.area}</div>
                <div><span className="font-medium">Food Type:</span> {vendorData.foodType}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {orders.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{item.product}</div>
                    <div className="text-sm text-muted-foreground">{item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {item.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.isPaid ? '✓ Paid' : '○ Unpaid'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold">Cost Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Bulk Order:</span>
                <span className="flex items-center gap-1 font-medium">
                  <IndianRupee className="h-3 w-3" />
                  {totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Group Members:</span>
                <span>{groupVendors.length} vendors</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Your Share:</span>
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  {vendorShare.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Group Members */}
          <div>
            <h3 className="font-semibold mb-3">Group Members ({groupVendors.length})</h3>
            <div className="grid gap-2">
              {groupVendors.map((vendor, index) => (
                <div key={vendor.id} className="flex justify-between items-center text-sm p-2 bg-muted/20 rounded">
                  <span>{vendor.name}</span>
                  <span className="text-muted-foreground">{vendor.foodType}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handlePrint} variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownload} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={() => alert('Email functionality requires backend integration')} 
              variant="outline" 
              className="flex-1"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            Thank you for using VendorUnity! Together we grow stronger.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}