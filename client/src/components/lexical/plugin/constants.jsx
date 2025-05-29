import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Highlighter,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
} from "lucide-react";

// Rich text action constants
export const RichTextAction = {
  Bold: "bold",
  Italics: "italics",
  Underline: "underline",
  Strikethrough: "strikethrough",
  Superscript: "superscript",
  Subscript: "subscript",
  Highlight: "highlight",
  Code: "code",
  LeftAlign: "leftAlign",
  CenterAlign: "centerAlign",
  RightAlign: "rightAlign",
  JustifyAlign: "justifyAlign",
  Divider: "divider",
  Undo: "undo",
  Redo: "redo",
};

// Rich text options array
export const RICH_TEXT_OPTIONS = [
  {
    id: RichTextAction.Bold,
    icon: <Bold className="h-4 w-4" />,
    label: "Bold",
  },
  {
    id: RichTextAction.Italics,
    icon: <Italic className="h-4 w-4" />,
    label: "Italics",
  },
  {
    id: RichTextAction.Underline,
    icon: <Underline className="h-4 w-4" />,
    label: "Underline",
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter className="h-4 w-4" />,
    label: "Highlight",
    fontSize: 10,
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <Strikethrough className="h-4 w-4" />,
    label: "Strikethrough",
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript className="h-4 w-4" />,
    label: "Superscript",
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript className="h-4 w-4" />,
    label: "Subscript",
  },
  {
    id: RichTextAction.Code,
    icon: <Code2 className="h-4 w-4" />,
    label: "Code",
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.LeftAlign,
    icon: <AlignLeft className="h-4 w-4" />,
    label: "Align Left",
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <AlignCenter className="h-4 w-4" />,
    label: "Align Center",
  },
  {
    id: RichTextAction.RightAlign,
    icon: <AlignRight className="h-4 w-4" />,
    label: "Align Right",
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <AlignJustify className="h-4 w-4" />,
    label: "Align Justify",
  },
  { id: RichTextAction.Divider },
];

export const LOW_PRIORITY = 1;
export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
