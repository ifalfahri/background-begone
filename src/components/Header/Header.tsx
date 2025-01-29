import AboutDialog from "./AboutDialog";
import ContactDialog from "./ContactDialog";
import LanguageSwitcher from "./LanguageSwitcher";
import { HeaderProps } from "@/lib/types";

const Header: React.FC<HeaderProps> = ({ t, setLanguage }) => (
  <nav className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Background Begone</h1>
    <div className="flex items-center space-x-4">
      <AboutDialog t={t} />
      <ContactDialog t={t} />
      <LanguageSwitcher setLanguage={setLanguage} />
    </div>
  </nav>
);

export default Header;