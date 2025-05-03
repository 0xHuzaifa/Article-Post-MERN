"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { $wrapNodes } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createListNode } from "@lexical/list";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UndoIcon,
  RedoIcon,
} from "lucide-react";
import { Button, IconButton } from "@material-tailwind/react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatBulletList = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createListNode("bullet"));
      }
    });
  };

  const formatNumberedList = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createListNode("number"));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="toolbar flex flex-wrap gap-1 p-2 border-b border-gray-200">
      <IconButton
        variant={isBold ? "filled" : "text"}
        color="blue-gray"
        size="sm"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        <BoldIcon className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant={isItalic ? "filled" : "text"}
        color="blue-gray"
        size="sm"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        <ItalicIcon className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant={isUnderline ? "filled" : "text"}
        color="blue-gray"
        size="sm"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <UnderlineIcon className="h-4 w-4" />
      </IconButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <IconButton
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={formatBulletList}
      >
        <ListIcon className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={formatNumberedList}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={formatQuote}
      >
        <QuoteIcon className="h-4 w-4" />
      </IconButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <IconButton
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
      >
        <UndoIcon className="h-4 w-4" />
      </IconButton>

      <IconButton
        variant="text"
        color="blue-gray"
        size="sm"
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
      >
        <RedoIcon className="h-4 w-4" />
      </IconButton>

      <div className="mx-1 border-r border-gray-300"></div>

      <Button
        variant="text"
        color="blue-gray"
        size="sm"
        className="normal-case"
        onClick={() => formatHeading("h1")}
      >
        H1
      </Button>

      <Button
        variant="text"
        color="blue-gray"
        size="sm"
        className="normal-case"
        onClick={() => formatHeading("h2")}
      >
        H2
      </Button>

      <Button
        variant="text"
        color="blue-gray"
        size="sm"
        className="normal-case"
        onClick={() => formatHeading("h3")}
      >
        H3
      </Button>
    </div>
  );
}
