import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";

interface CkEditorCompProps{
    value: string,
    onChange(value: string):void,
}

export default function CkEditorComp({ onChange, value }: CkEditorCompProps){
    return (
        <CKEditor style={{height: "500px"}}
            data={value}
            onInit={(editor) => console.log("Editor is ready to use!", editor)}
            onChange={(event, editor) => {
                // console.log("Change", { event, editor });
                onChange(editor.getData())
            }}
            onBlur={(event, editor) => {
                // console.log("Blur.", { event, editor });
            }}
            onFocus={(event, editor) => {
                // console.log("Focus.", { event, editor });
            }}
            config={{
                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    Heading,
                    Indent,
                    IndentBlock,
                    Underline,
                    Strikethrough,
                    BlockQuote,
                    Code,
                    Font,
                    Alignment,
                    List,
                    Link,
                    MediaEmbed,
                    PasteFromOffice,
                    Image,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    ImageResize,
                    SimpleUploadAdapter,
                    Table,
                    TableToolbar,
                    TextTransformation,
                    CodeBlock,
                ],
                toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "code",
                    "codeBlock",
                    "|",
                    "fontSize",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "alignment",
                    "outdent",
                    "indent",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "|",
                    "link",
                    "imageUpload",
                    "insertTable",
                    "mediaEmbed",
                    "|",
                    "undo",
                    "redo",
                ],
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            view: "p",
                            title: "Rãnh rỗi",
                            class: "ck-heading_paragraph",
                        },
                        {
                            model: "heading1",
                            view: "h1",
                            title: "Rãnh rỗi",
                            class: "ck-heading_heading1",
                        },
                        {
                            model: "heading2",
                            view: "h2",
                            title: "Rãnh rỗi",
                            class: "ck-heading_heading2",
                        },
                        {
                            model: "heading3",
                            view: "h3",
                            title: "Rãnh rỗi",
                            class: "ck-heading_heading3",
                        },
                    ],
                },
                fontSize: {
                    options: [
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        23,
                        25,
                        27,
                        29,
                        31,
                        33,
                        35,
                    ],
                },
                alignment: {
                    options: ["justify", "left", "center", "right"],
                },
                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                    ],
                },
                image: {
                    resizeUnit: "px",
                    toolbar: [
                        "imageStyle:alignLeft",
                        "imageStyle:full",
                        "imageStyle:alignRight",
                        "|",
                        "imageTextAlternative",
                    ],
                    styles: ["full", "alignLeft", "alignRight"],
                },
                typing: {
                    transformations: {
                        remove: [
                            "enDash",
                            "emDash",
                            "oneHalf",
                            "oneThird",
                            "twoThirds",
                            "oneForth",
                            "threeQuarters",
                        ],
                    },
                },
                simpleUpload: {

                    uploadUrl: "http://localhost:5000/api/upload",
                    headers: {
                        // "X-CSRF-TOKEN": "CSFR-Token",
                        // Authorization: 'Bearer <JSON Web Token>'
                    },
                },
                language: "en",
                height: 500
                // codeBlock: {
                //     languages: [
                //         { language: "css", label: "CSS" },
                //         { language: "html", label: "HTML" },
                //     ],
                // },
            }}
            editor={ClassicEditor}
        />
    );
}