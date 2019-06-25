// Example on how to customise the look at feel using Styles
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "../build";

const doc = new Document({
    creator: "Clippy",
    title: "Sample Document",
    description: "A brief example of using docx",
});

doc.Styles.createParagraphStyle("Heading1", "Heading 1")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .size(28)
    .bold()
    .italics()
    .spacing({ after: 120 });

doc.Styles.createParagraphStyle("Heading2", "Heading 2")
    .basedOn("Normal")
    .next("Normal")
    .quickFormat()
    .size(26)
    .bold()
    .underline("double", "FF0000")
    .spacing({ before: 240, after: 120 });

doc.Styles.createParagraphStyle("aside", "Aside")
    .basedOn("Normal")
    .next("Normal")
    .color("999999")
    .italics()
    .indent({ left: 720 })
    .spacing({ line: 276 });

doc.Styles.createParagraphStyle("wellSpaced", "Well Spaced")
    .basedOn("Normal")
    .spacing({ line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 });

doc.Styles.createParagraphStyle("ListParagraph", "List Paragraph")
    .quickFormat()
    .basedOn("Normal");

const numberedAbstract = doc.Numbering.createAbstractNumbering();
numberedAbstract.createLevel(0, "lowerLetter", "%1)", "left");

doc.add(
    new Paragraph({
        text: "Test heading1, bold and italicized",
        heading: HeadingLevel.HEADING_1,
    }),
);
doc.add(new Paragraph("Some simple content"));
doc.add(
    new Paragraph({
        text: "Test heading2 with double red underline",
        heading: HeadingLevel.HEADING_2,
    }),
);

const letterNumbering = doc.Numbering.createConcreteNumbering(numberedAbstract);
const letterNumbering5 = doc.Numbering.createConcreteNumbering(numberedAbstract);
letterNumbering5.overrideLevel(0, 5);

doc.add(
    new Paragraph({
        text: "Option1",
        numbering: {
            num: letterNumbering,
            level: 0,
        },
    }),
);
doc.add(
    new Paragraph({
        text: "Option5 -- override 2 to 5",
        numbering: {
            num: letterNumbering,
            level: 0,
        },
    }),
);
doc.add(
    new Paragraph({
        text: "Option3",
        numbering: {
            num: letterNumbering,
            level: 0,
        },
    }),
);

doc.add(
    new Paragraph({}).addRun(
        new TextRun({
            text: "Some monospaced content",
            font: {
                name: "Monospace",
            },
        }),
    ),
);

doc.add(
    new Paragraph({
        text: "An aside, in light gray italics and indented",
        style: "aside",
    }),
);
doc.add(
    new Paragraph({
        text: "This is normal, but well-spaced text",
        style: "wellSpaced",
    }),
);
const para = new Paragraph({});
doc.add(para);
// Showing the different ways to create a TextRun
para.addRun(
    new TextRun({
        text: "This is a bold run,",
        bold: true,
    }),
);
para.addRun(new TextRun(" switching to normal "));
para.addRun(
    new TextRun({
        text: "and then underlined ",
        underline: {},
    }),
);
para.addRun(
    new TextRun({
        text: "and back to normal.",
    }),
);

const packer = new Packer();

packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
