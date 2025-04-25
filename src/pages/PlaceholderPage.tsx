
import { useLocation } from "react-router-dom";
import Layout from '@/components/Layout';
import { FileText } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const PlaceholderPage = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1); // Remove leading slash
  const pageName = pathName.charAt(0).toUpperCase() + pathName.slice(1).replace(/-/g, ' ');
  
  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-20 px-4 md:px-6">
        <div className="text-center space-y-6">
          <FileText className="h-12 w-12 text-primary mx-auto" />
          
          <h1 className="text-3xl md:text-4xl font-bold">{pageName}</h1>
          
          <p className="text-muted-foreground max-w-lg mx-auto">
            This page is under construction. Please check back later for updates.
          </p>
          
          <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-8 mt-12">
            <p className="text-xl font-medium mb-4">
              Coming Soon: {pageName} 
            </p>
            <p className="text-muted-foreground">
              We're working hard to bring you this feature. In the meantime,
              explore our other sections to improve your typing skills.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;
