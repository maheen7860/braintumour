import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-foreground">
            404
          </h1>
          <p className="text-lg font-medium text-foreground">
            Page not found
          </p>
          <p className="text-sm text-muted-foreground">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <Button asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Go back to Home
            </Link>
          </Button>
        </div>

        {/* Path info (optional, subtle) */}
        <p className="text-xs text-muted-foreground">
          Requested path: <span className="font-mono">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
