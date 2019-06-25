// Example how to display page numbers
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { AlignmentType, Document, Packer, PageNumberFormat, Paragraph, TextRun } from "../build";

const doc = new Document(
    {},
    {
        pageNumberStart: 1,
        pageNumberFormatType: PageNumberFormat.DECIMAL,
    },
);

doc.Header.add(
    new Paragraph("Foo Bar corp. ").addRun(new TextRun("Page Number ").pageNumber()).addRun(new TextRun(" to ").numberOfTotalPages()),
);

doc.Footer.add(
    new Paragraph({
        text: "Foo Bar corp. ",
        alignment: AlignmentType.CENTER,
    })
        .addRun(new TextRun("Page Number: ").pageNumber())
        .addRun(new TextRun(" to ").numberOfTotalPages()),
);

doc.add(new Paragraph("Hello World 1").pageBreak());
doc.add(new Paragraph("Hello World 2").pageBreak());
doc.add(new Paragraph("Hello World 3").pageBreak());
doc.add(new Paragraph("Hello World 4").pageBreak());
doc.add(new Paragraph("Hello World 5").pageBreak());

const packer = new Packer();

packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
