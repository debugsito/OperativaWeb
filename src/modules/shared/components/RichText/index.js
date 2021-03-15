import React, { useMemo, useState, useCallback } from "react";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const useStyles = makeStyles((theme) => ({
    editorControls: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    editorText: {
        // border: "1px solid #ccc",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        minHeight: 200,
        padding: 8,
        textAlign: 'left'
    }
}))

// Define our own custom set of helpers.
const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.bold === true,
            universal: true
        });

        return !!match;
    },

    isItalicMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.italic === true,
            universal: true
        });

        return !!match;
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "code"
        });

        return !!match;
    },

    isListBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "list-item"
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor);
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "code" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleListBlock(editor) {
        const isActive = CustomEditor.isListBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "list-item" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    }
};

export default function RichText() {
    const classes = useStyles();
    const editor = useMemo(() => withReact(createEditor()), []);
    //const content = localStorage.getItem("content");
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }]
        }
    ]);

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case "code":
                return <CodeElement {...props} />;
            case "list-item":
                return <ListElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <div className="editor">
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <div className={classes.editorControls}>
                    <IconButton
                        aria-label="Negrita"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }}
                    >
                        <FormatBoldIcon />
                    </IconButton>
                    <IconButton
                        aria-label="Italic"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleItalicMark(editor);
                        }}
                    >
                        <FormatItalicIcon />
                    </IconButton>
                    <IconButton
                        aria-label="Lista"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleListBlock(editor);
                        }}
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                </div>
                <Editable
                    className={classes.editorText}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }
                        // Replace the `onKeyDown` logic with our new commands.
                        switch (event.key) {
                            case "b": {
                                event.preventDefault();
                                CustomEditor.toggleBoldMark(editor);
                                break;
                            }
                        }
                    }}
                />
            </Slate>
        </div>
    );
}

const CodeElement = ({ attributes, children }) => {
    return (
        <pre>
            <code {...attributes}>{children}</code>
        </pre>
    );
};
const ListElement = ({ attributes, children }) => {
    return <li {...attributes}>{children}</li>;
};

const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = ({ attributes, children, leaf }) => {
    //negrita
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    //code
    if (leaf.code) {
        children = <code>{children}</code>;
    }
    //italic
    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.strikethrough) {
        children = <del>{children}</del>;
    }

    return <span {...attributes}>{children}</span>;
};
