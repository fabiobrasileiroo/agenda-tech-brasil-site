import { Github, ExternalLinkIcon } from "lucide-react";
function LinksWithIcons() {
  return (
    <div className="flex flex-wrap justify-end gap-4 mt-6">
      <a
        href="https://github.com/Abacatinhos/agenda-tech-brasil/blob/master/CONTRIBUTING.md"
        target="_blank"
        className="text-primary underline flex items-center gap-2"
      >
        <ExternalLinkIcon size={18}/>
        Contribuindo com eventos
      </a>
      <a
        href="https://github.com/Abacatinhos/agenda-tech-brasil?tab=readme-ov-file"
        target="_blank"
        className="text-primary underline flex items-center gap-2"
      >
        <Github size={18}/>
        Vem ver nosso github
      </a>
    </div>
  );
}

export default LinksWithIcons;