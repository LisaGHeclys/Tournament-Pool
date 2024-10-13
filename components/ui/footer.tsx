import { Copyright, Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <p className="flex items-center gap-2">
        <Copyright width={16} height={16} />
        All rights reserved
      </p>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/LisaGHeclys"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github width={16} height={16} />
        Github
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://lisamlglaziou.fr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Globe width={16} height={16} />
        Go see my other projects →
      </a>
    </footer>
  );
}
