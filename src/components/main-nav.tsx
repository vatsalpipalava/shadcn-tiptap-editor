"use client";

import Link from "next/link";

import { Edit } from "lucide-react";

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Edit className="h-6 w-6" />
        <span className="font-bold inline-block">tiptap/editor</span>
      </Link>
    </div>
  );
}
