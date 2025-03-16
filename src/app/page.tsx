import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Build your rich text editor</PageHeaderHeading>
        <PageHeaderDescription>
          A powerful, customizable, and feature-rich text editor built with
          Tiptap, ShadCN UI, and Next.js. This editor provides a seamless
          writing experience with rich text formatting, tables, images, and
          more.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="#editor">Get Started</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="border-grid border-b">
        <div className="container-wrapper">
          <div className="container !px-0">
            <div className="h-8 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <section id="editor" className="block [&>div]:p-0">
            <Tiptap />
          </section>
        </div>
      </div>
    </>
  );
}
