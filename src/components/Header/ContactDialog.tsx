import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogProps } from "@/lib/types";

const ContactDialog: React.FC<DialogProps> = ({ t }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm">{t.contact}</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t.contact}</DialogTitle>
        <DialogDescription>{t.contactContent}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default ContactDialog;