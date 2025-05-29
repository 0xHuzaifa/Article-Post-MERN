import "./Editor.css";
import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugin/Toolbar";
import CustomOnChangePlugin from "./plugin/CustomOnChangePlugin";

function Placeholder() {
  return (
    <div className="editor-placeholder">Start writing your article...</div>
  );
}

const theme = {
  root: "p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 min-h-[200px]",
  link: "cursor-pointer text-blue-500 underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    highlight: "bg-yellow-200",
    subscript: "subscript",
    superscript: "superscript",
    code: "bg-gray-100 px-1 rounded font-mono text-sm",
  },
  paragraph: "text-normal mb-2",
  heading: {
    h1: "text-4xl font-bold my-3",
    h2: "text-3xl font-bold my-3",
    h3: "text-2xl font-bold my-3",
    h4: "text-xl font-bold my-3",
    h5: "text-lg font-bold my-3",
    h6: "text-base font-bold my-2",
  },
};



export const Editor = React.memo(
  function Editor({ value, onChange }) {

    const initialConfig = useMemo(() => ({
      namespace: "MyEditor",
      theme,
      onError(error) {
        console.error(error);
      },
      nodes: [
        HeadingNode,
        CodeNode,
        CodeHighlightNode,
 
      ],
    }), []);


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <CustomOnChangePlugin value={value} onChange={onChange} />
      </div>
    </LexicalComposer>
  );
});
