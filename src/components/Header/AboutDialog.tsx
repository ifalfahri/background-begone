import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogProps } from "@/lib/types";

const AboutDialog: React.FC<DialogProps> = ({ t }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm">{t.about}</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t.about}</DialogTitle>
        <div className="flex flex-col items-center pt-4 space-y-6">
          <img src="logo.png" alt="Background Begone Logo" className="w-60" />
          <DialogDescription>{t.aboutContent}</DialogDescription>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default AboutDialog;