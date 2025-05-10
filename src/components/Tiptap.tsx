"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
import HardBreak from "@tiptap/extension-hard-break";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import { FontSize } from "./font-size";
import "./tiptap.css";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Baseline,
  BoldIcon,
  ChevronDown,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListStartIcon,
  ListTreeIcon,
  MinusIcon,
  PaintBucket,
  PlusIcon,
  RedoIcon,
  Strikethrough,
  TableIcon,
  TextIcon,
  TextQuoteIcon,
  Type,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
  WrapText,
} from "lucide-react";
import { IconTableOptions } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "./ui/toggle";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
// import HtmlRenderer from "./HtmlRenderer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ImageExtension } from "./image";

const Tiptap = () => {
  const [fontSizeInput, setFontSizeInput] = React.useState("16");

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Blockquote,
      ImageExtension,
      HardBreak,
      Gapcursor,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      History,
      Typography,
      TextStyle,
      FontFamily,
      FontSize,
      BulletList,
      OrderedList,
      ListItem,
      CharacterCount,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      // TableCellExtension,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    immediatelyRender: false,
    content: `<h1><span style="font-family: var(--font-geist-sans)">The Joke Tax <span style="color: #FFFFFF; font-family: var(--font-geist-sans)"><mark data-color="#09090b" style="background-color: #09090b; color: inherit">Chronicles</mark></span></span></h1>
              <p><span style="font-family: var(--font-geist-sans)">Once upon a time, in a far-off land,<br>there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.<span></p>
              <h2><span style="font-family: var(--font-inter)">The King's Plan</span></h2>
              <p><span style="font-family: var(--font-geist-sans)">The king thought long and hard, and finally came up with
              <a href="https://your-link-url.com"> a brilliant plan</a>: he would tax the jokes in the kingdom.</span></p>
              <blockquote><span style="font-family: var(--font-geist-sans)">"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</span></blockquote>
              <h3><span style="font-family: var(--font-geist-sans)">The Joke Tax</span></h3>
              <p><span style="font-family: var(--font-inter)">The king's subjects were not amused. They grumbled and complained, but the king was firm:</span></p>
              <ul>
                <li><span style="font-family: var(--font-geist-sans)">1st level of puns: 5 gold coins</span></li>
                <li><span style="font-family: var(--font-geist-sans)">2nd level of jokes: 10 gold coins</span></li>
                <li><span style="font-family: var(--font-geist-sans)">3rd level of one-liners : 20 gold coins</span></li>
              </ul>
              <p>As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.</p>
              <h3>Jokester's Revolt</h3>
              <p>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.</p>
              <p>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p>
              <h3>The People's Rebellion</h3>
              <p>The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.</p>
              <table>
                <thead>
                  <tr>
                    <th>King's Treasury</th>
                    <th>People's happiness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Empty</td>
                    <td>Overflowing</td>
                  </tr>
                  <tr>
                    <td>Modest</td>
                    <td>Satisfied</td>
                  </tr>
                  <tr>
                    <td>Full</td>
                    <td>Ecstatic</td>
                  </tr>
                </tbody>
              </table>
              <p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p>
              <p>The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.</p>
              <img src="https://placehold.co/1600x900?text=Image" />
              <table style="min-width: 50px">
                <colgroup>
                  <col style="min-width: 25px" />
                  <col style="min-width: 25px" />
                </colgroup>
                <tbody>
                  <tr>
                    <td colspan="1" rowspan="1">
                      <h1>JOKE KING</h1>
                      <p></p>
                      <p><span style="color: #787878; font-size: 18px">The king, seeing how much happier his subjects were, realized the error of his ways The king, seeing how much happier his subjects.</span></p>
                      <p></p>
                      <p>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.</p>
                      <p></p>
                      <p>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p>
                    </td>
                    <td colspan="1" rowspan="1">
                      <img
                        src="https://placehold.co/900x900?text=Image in table"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>`,
  });

  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) {
      return null;
    }

    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const updateFontSizeState = useCallback(() => {
    if (!editor) return;
    const fontSize = editor.getAttributes("textStyle").fontSize;
    if (fontSize) {
      const numericValue = fontSize.replace("px", "");
      setFontSizeInput(numericValue);
    } else {
      setFontSizeInput("16");
    }
  }, [editor]);

  React.useEffect(() => {
    if (!editor) return;

    editor.on("selectionUpdate", updateFontSizeState);
    return () => {
      editor.off("selectionUpdate", updateFontSizeState);
    };
  }, [editor, updateFontSizeState]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFontSizeInput(value);
    if (/^\d+$/.test(value) && editor) {
      editor.commands.setFontSize(`${value}px`);
    }
  };

  const incrementFontSize = () => {
    const current = parseInt(fontSizeInput || "16", 10);
    const newSize = current + 1;
    setFontSizeInput(newSize.toString());
    editor?.commands.setFontSize(`${newSize}px`);
  };

  const decrementFontSize = () => {
    const current = parseInt(fontSizeInput || "16", 10);
    const newSize = Math.max(1, current - 1);
    setFontSizeInput(newSize.toString());
    editor?.commands.setFontSize(`${newSize}px`);
  };

  const [htmlCode, setHtmlCode] = useState("");

  const handleHTML = async () => {
    if (!editor) {
      return null;
    }

    const htmlText = editor.getHTML();

    setHtmlCode(htmlText);
  };

  const [formattedCode, setFormattedCode] = useState<string>("Loading...");

  useEffect(() => {
    const formatCode = async () => {
      const prettier = await import("prettier/standalone");
      const parserHtml = await import("prettier/parser-html");

      const formatted = await prettier.format(htmlCode, {
        parser: "html",
        plugins: [parserHtml],
      });

      setFormattedCode(formatted);
    };

    formatCode();
  }, [htmlCode]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap rounded-lg shadow-sm border w-full relative">
      {/* Toolbar */}
      <div className="relative tiptap-sub">
        <div className="flex items-center border-b p-1 gap-1 flex-wrap bg-white sticky top-0 z-50 shadow-md rounded-t-lg">
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="w-8 h-8"
                    aria-label="Toggle undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                  >
                    <UndoIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="w-8 h-8"
                    aria-label="Toggle redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                  >
                    <RedoIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <Select
            value={
              editor.isActive("heading", { level: 1 })
                ? "h1"
                : editor.isActive("heading", { level: 2 })
                  ? "h2"
                  : editor.isActive("heading", { level: 3 })
                    ? "h3"
                    : editor.isActive("heading", { level: 4 })
                      ? "h4"
                      : editor.isActive("blockquote")
                        ? "blockquote"
                        : editor.isActive("paragraph")
                          ? "p"
                          : ""
            }
            onValueChange={(value) => {
              if (value === "p") {
                editor.chain().focus().setParagraph().run();
              } else if (value === "blockquote") {
                editor.chain().focus().toggleBlockquote().run();
              } else {
                const level = parseInt(value.replace("h", ""), 10) as
                  | 1
                  | 2
                  | 3
                  | 4;
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
          >
            <SelectTrigger className="w-[180px] font-medium">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="p">
                  <TextIcon className="text-foreground" strokeWidth={1.5} />
                  Paragraph
                </SelectItem>
                <SelectItem value="h1">
                  <Heading1Icon
                    className="text-foreground"
                    strokeWidth={1.75}
                  />
                  Heading 1
                </SelectItem>
                <SelectItem value="h2">
                  <Heading2Icon
                    className="text-foreground"
                    strokeWidth={1.75}
                  />
                  Heading 2
                </SelectItem>
                <SelectItem value="h3">
                  <Heading3Icon
                    className="text-foreground"
                    strokeWidth={1.75}
                  />
                  Heading 3
                </SelectItem>
                <SelectItem value="h4">
                  <Heading4Icon
                    className="text-foreground"
                    strokeWidth={1.75}
                  />
                  Heading 4
                </SelectItem>
                <SelectItem value="blockquote">
                  <TextQuoteIcon
                    className="text-foreground"
                    strokeWidth={1.5}
                  />
                  Blockquote
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <Select
            value={editor.getAttributes("textStyle").fontFamily || ""}
            onValueChange={(value) => {
              editor.chain().focus().setFontFamily(value).run();
            }}
          >
            <SelectTrigger className="font-medium">
              <Type className="h-4 w-4" />
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="var(--font-geist-sans)">
                  Geist Sans
                </SelectItem>
                <SelectItem value="var(--font-inter)">Inter</SelectItem>
                <SelectItem value="var(--font-roboto)">Roboto</SelectItem>
                <SelectItem value="var(--font-poppins)">Poppins</SelectItem>
                <SelectItem value="var(--font-open-sans)">Open Sans</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrementFontSize}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={fontSizeInput}
              onChange={handleFontSizeChange}
              className="h-8 w-13 appearance-none"
              min={1}
              max={100}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={incrementFontSize}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    variant="outline"
                    size={"sm"}
                    aria-label="Toggle bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    data-state={editor.isActive("bold") ? "on" : "off"}
                  >
                    <BoldIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bold</p>
                  <p>ctrl + b</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    variant="outline"
                    size={"sm"}
                    aria-label="Toggle italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                      !editor.can().chain().focus().toggleItalic().run()
                    }
                    data-state={editor.isActive("italic") ? "on" : "off"}
                  >
                    <ItalicIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Italic</p>
                  <p>ctrl + i</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    variant="outline"
                    size={"sm"}
                    aria-label="Toggle underline"
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                      !editor.can().chain().focus().toggleUnderline().run()
                    }
                    data-state={editor.isActive("underline") ? "on" : "off"}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Underline</p>
                  <p>ctrl + u</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              data-state={editor.isActive("strike") ? "on" : "off"}
            >
              <Strikethrough className="h-4 w-4" />
            </Toggle>
          </div>
          <Separator orientation="vertical" className="!h-8 mx-1" />

          <div className="flex flex-col items-center border rounded-md shadow-sm justify-center !h-8 !w-8">
            <label
              htmlFor="color-input"
              className="!w-8 h-!8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Baseline className="!w-4 !h-4" />
            </label>
            <div className="relative !h-0">
              <input
                type="color"
                id="color-input"
                value={editor.getAttributes("textStyle").color || "#000000"}
                onInput={(event) =>
                  editor
                    .chain()
                    .focus()
                    .setColor((event.currentTarget as HTMLInputElement).value)
                    .run()
                }
                className="!w-8 !h-0 appearance-none bg-transparent border-0 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center border rounded-md shadow-sm justify-center !h-8 !w-8">
            <label
              htmlFor="color-input-highlight"
              className="!w-8 h-!8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <PaintBucket className="!w-4 !h-4" />
            </label>
            <div className="relative !h-0">
              <input
                type="color"
                id="color-input-highlight"
                onChange={(e) =>
                  editor.commands.setHighlight({ color: e.target.value })
                }
                className="!w-8 !h-0 appearance-none bg-transparent border-0 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle set link"
            onClick={setLink}
            data-state={editor.isActive("link") ? "on" : "off"}
          >
            <LinkIcon className="h-4 w-4" />
          </Toggle>

          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle unset link"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <UnlinkIcon className="h-4 w-4" />
          </Toggle>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => editor.chain().focus().setHardBreak().run()}
                  className="w-8 h-8"
                >
                  <WrapText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hard Break</p>
                <p>shift + enter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={addImage}
            className="w-8 h-8"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <div className="flex items-center gap-1">
            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle left align"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              data-state={
                editor.isActive({ textAlign: "left" }) ||
                (!editor.isActive({ textAlign: "right" }) &&
                  !editor.isActive({ textAlign: "center" }) &&
                  !editor.isActive({ textAlign: "justify" }))
                  ? "on"
                  : "off"
              }
            >
              <AlignLeftIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle center align"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              data-state={
                editor.isActive({ textAlign: "center" }) ? "on" : "off"
              }
            >
              <AlignCenterIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle right align"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              data-state={
                editor.isActive({ textAlign: "right" }) ? "on" : "off"
              }
            >
              <AlignRightIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle justify"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              data-state={
                editor.isActive({ textAlign: "justify" }) ? "on" : "off"
              }
            >
              <AlignJustifyIcon className="h-4 w-4" />
            </Toggle>
          </div>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <div className="flex items-center gap-1">
            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle bulleted list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              data-state={editor.isActive("bulletList") ? "on" : "off"}
            >
              <ListIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
              variant="outline"
              size={"sm"}
              aria-label="Toggle ordered list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              data-state={editor.isActive("orderedList") ? "on" : "off"}
            >
              <ListOrderedIcon className="h-4 w-4" />
            </Toggle>

            <Button
              variant="outline"
              size={"icon"}
              className="w-8 h-8"
              aria-label="sink list item"
              onClick={() =>
                editor.chain().focus().sinkListItem("listItem").run()
              }
              disabled={!editor.can().sinkListItem("listItem")}
            >
              <ListTreeIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size={"icon"}
              className="w-8 h-8"
              aria-label="lift list item"
              onClick={() =>
                editor.chain().focus().liftListItem("listItem").run()
              }
              disabled={!editor.can().liftListItem("listItem")}
            >
              <ListStartIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="!h-8 mx-1" />

          <Button
            variant={"outline"}
            size={"icon"}
            className="w-8 h-8"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 2, withHeaderRow: true })
                .run()
            }
          >
            <TableIcon className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-16">
                <IconTableOptions className="h-4 w-4" />
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="start">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Row Operations</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().addRowBefore().run()
                      }
                    >
                      Add row before
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => editor.chain().focus().addRowAfter().run()}
                    >
                      Add row after
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => editor.chain().focus().deleteRow().run()}
                    >
                      Delete row
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().toggleHeaderRow().run()
                      }
                    >
                      Header row
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Column Operations
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().addColumnBefore().run()
                      }
                    >
                      Add column before
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().addColumnAfter().run()
                      }
                    >
                      Add column after
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().deleteColumn().run()
                      }
                    >
                      Delete column
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().toggleHeaderColumn().run()
                      }
                    >
                      Header column
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Cell Operations</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => editor.chain().focus().mergeCells().run()}
                    >
                      Merge cell
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => editor.chain().focus().splitCell().run()}
                    >
                      Split cell
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        editor.chain().focus().toggleHeaderCell().run()
                      }
                    >
                      Header cell
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Editor Area */}
      <div className="min-h-[200px] px-2 py-4 bg-white overflow-auto">
        <EditorContent
          editor={editor}
          className="!outline-none !focus-visible:!outline-none focus-visible:border-none"
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between rounded-b-lg px-4 py-2 text-sm text-gray-500 border-t bg-white">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleHTML} variant="outline" className="h-8">
              Get HTML
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-[72rem]">
            <DialogHeader>
              <DialogTitle>HTML</DialogTitle>
            </DialogHeader>
            <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 p-4">
              <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
                {formattedCode}
              </code>
            </pre>
          </DialogContent>
        </Dialog>
        {editor.storage.characterCount.characters()} characters |&nbsp;
        {editor.storage.characterCount.words()} words
      </div>
      {/* <HtmlRenderer
        content={`<h1>The Joke Tax Chronicles</h1><p>Once upon a time, in a far-off land,<br>there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.</p><p><span style="font-size: 24px"><strong><em><u>Vatsal</u></em></strong></span></p><h2>The King's Plan</h2><p>The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in the kingdom.</p><blockquote><p>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</p></blockquote><h3>The Joke Tax</h3><p>The king's subjects were not amused. They grumbled and complained, but the king was firm</p><img src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&amp;cs=tinysrgb"></img>`}
      /> */}
    </div>
  );
};

export default Tiptap;
