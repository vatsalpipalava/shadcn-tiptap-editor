import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="border-grid w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MainNav />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href="https://github.com/vatsalpipalava/shadcn-tiptap-editor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
