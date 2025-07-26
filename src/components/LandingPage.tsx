import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { Users, ShoppingCart, TrendingUp, Shield } from "lucide-react";

interface LandingPageProps {
  onJoinVendor: () => void;
  onBecomeSupplier: () => void;
}

export default function LandingPage({ onJoinVendor, onBecomeSupplier }: LandingPageProps) {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-primary">VendorUnity</span>
        </div>
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onJoinVendor}
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              <Users className="mr-2 h-5 w-5" />
              {t('joinVendorGroup')}
            </Button>
            <Button 
              onClick={onBecomeSupplier}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('becomeSupplier')}
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Save 5-12%</h3>
              <p className="text-muted-foreground">Cut out middlemen and reduce costs through bulk buying</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Power</h3>
              <p className="text-muted-foreground">Join local vendor groups for better negotiating power</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Reliable Supply</h3>
              <p className="text-muted-foreground">Ensure consistent quality and timely delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Active Vendors</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Supplier Partners</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Local Areas</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary">₹2L+</div>
            <div className="text-sm text-muted-foreground">Monthly Savings</div>
          </div>
        </div>
      </main>
    </div>
  );
}