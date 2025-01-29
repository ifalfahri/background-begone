import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { LanguageSwitcherProps } from "@/lib/types";

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ setLanguage }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <Globe className="h-5 w-5" />
        <span className="sr-only">Switch language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setLanguage('id')}>Bahasa Indonesia</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default LanguageSwitcher;