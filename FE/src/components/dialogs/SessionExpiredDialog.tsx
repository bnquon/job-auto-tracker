import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface SessionExpiredDialogProps {
  onConfirm: () => void;
}

export function SessionExpiredDialog({ 
  onConfirm 
}: SessionExpiredDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog open>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold">
                Session Expired
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="text-sm text-gray-600 mt-2">
          Your session has expired for security reasons. Please sign in again to continue using the application.
        </AlertDialogDescription>
        
        <AlertDialogFooter className="mt-6">
          <AlertDialogAction 
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign In Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};