"use client";

import { useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  $isParagraphNode,
  $createParagraphNode,
} from "lexical";

import { Button, IconButton, Option, Select } from "@material-tailwind/react";
import {
  HEADINGS,
  LOW_PRIORITY,
  RICH_TEXT_OPTIONS,
  RichTextAction,
} from "./constants";
import { Divider } from "../../common/Divider";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { $setBlocksType } from "@lexical/selection";
import "./Toolbar.css";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [selectionMap, setSelectionMap] = useState({});
  const [selectedHeading, setSelectedHeading] = useState("");

  const updateToolbar = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextAction.Bold]: selection.hasFormat("bold"),
        [RichTextAction.Italics]: selection.hasFormat("italic"),
        [RichTextAction.Underline]: selection.hasFormat("underline"),
        [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
        [RichTextAction.Superscript]: selection.hasFormat("superscript"),
        [RichTextAction.Subscript]: selection.hasFormat("subscript"),
        [RichTextAction.Code]: selection.hasFormat("code"),
        [RichTextAction.Highlight]: selection.hasFormat("highlight"),
      };
      setSelectionMap(newSelectionMap);

      // Update heading dropdown based on current selection
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      if ($isHeadingNode(element)) {
        const tag = element.getTag();
        setSelectedHeading(tag);
      } else if ($isParagraphNode(element)) {
        setSelectedHeading("paragraph");
      } else {
        setSelectedHeading("paragraph"); // fallback
      }
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (payload) => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor]);

  const onAction = (id) => {
    switch (id) {
      case RichTextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        break;
      }
      case RichTextAction.Italics: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        break;
      }
      case RichTextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        break;
      }
      case RichTextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        break;
      }
      case RichTextAction.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        break;
      }
      case RichTextAction.Subscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        break;
      }
      case RichTextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        break;
      }
      case RichTextAction.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        break;
      }
      case RichTextAction.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        break;
      }
      case RichTextAction.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        break;
      }
      case RichTextAction.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        break;
      }
      case RichTextAction.JustifyAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        break;
      }

      default:
        break;
    }
  };

  const getSelectedBtnProp = (isSelected) => (isSelected ? "filled" : "text");

  const updateHeading = (heading) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (heading === "paragraph") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(heading));
        }
      }
    });
    setSelectedHeading(heading);
  };

  return (
    <div className="toolbar flex flex-wrap items-center gap-1 p-2 border-b border-gray-200">
      <Select
        size="sm"
        variant="outlined"
        value={selectedHeading}
        label="Select Format"
        onChange={(val) => {
          updateHeading(val);
        }}
        className="w-40"
        selected={(element) => {
          if (Array.isArray(element)) {
            // If it's an array, find the selected one
            const selected = element.find(
              (el) =>
                el.key === selectedHeading ||
                el.props?.value === selectedHeading
            );
            if (selected) {
              const value = selected.props.value;
              return value === "paragraph" ? "Normal" : value.toUpperCase();
            }
            return "Normal";
          } else if (element && element.props) {
            // If it's a single element
            const value = element.props.value;
            return value === "paragraph" ? "Normal" : value.toUpperCase();
          }
          return selectedHeading === "paragraph"
            ? "Normal"
            : selectedHeading.toUpperCase();
        }}
      >
        <Option value="paragraph">Normal</Option>
        {HEADINGS.map((heading) => (
          <Option key={heading} value={heading}>
            {heading.toUpperCase()}
          </Option>
        ))}
      </Select>

      <Divider />

      {RICH_TEXT_OPTIONS.map(({ id, label, icon }) =>
        id === RichTextAction.Divider ? (
          <>
            <Divider key={`divider-${Math.random()}`} />
          </>
        ) : (
          <IconButton
            key={id}
            variant={getSelectedBtnProp(selectionMap[id])}
            color="blue-gray"
            size="sm"
            aria-label={label}
            onClick={() => onAction(id)}
          >
            {icon}
          </IconButton>
        )
      )}
    </div>
  );
}
