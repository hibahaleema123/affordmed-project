
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t p-4 text-center text-sm text-muted-foreground">
      <div className="container mx-auto">
        <p className="flex items-center justify-center gap-1">
          Built with <Heart className="h-4 w-4 text-red-500" /> by Lovable
        </p>
      </div>
    </footer>
  );
};

export default Footer;
