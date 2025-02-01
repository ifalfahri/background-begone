import { Heart, Github, HeartHandshake } from "lucide-react";
import { FooterProps } from "@/lib/types";

const Footer: React.FC<FooterProps> = ({ t }) => (
  <footer className="bg-primary text-primary-foreground py-4 px-6">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <p className="flex items-center">
        <Heart className="h-4 w-4 mr-2 text-red-500" />
        {t.madeWithLove}{' '}
        <span className="group mx-1">
          <span className="transition-colors group-hover:text-red-500">{t.love}</span>
        </span>
        {t.by}{' '}
        <a
          href="https://ifal.me"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-semibold hover:underline"
        >
          ifalfahri
        </a>
      </p>
      <div className="flex items-center mt-4 sm:mt-0">
      <HeartHandshake className="h-4 w-4 mr-2" />
        <a className="hover:underline" href="https://sociabuzz.com/ifalex/support">Support Creator</a>
        <span className="mx-4">|</span>
        <a
          href="https://github.com/ifalfahri/background-begone"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline"
        >
          <Github className="h-4 w-4 mr-2" />
          {t.starOnGithub}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;