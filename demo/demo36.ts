// Add image to table cell
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { Document, Media, Packer, Paragraph, Table } from "../build";

const doc = new Document();
const image = Media.addImage(doc, fs.readFileSync("./demo/images/image1.jpeg"));

const table = new Table({
    rows: 2,
    columns: 2,
});
table.getCell(1, 1).add(new Paragraph(image));

doc.add(table);

// doc.Header.createImage(fs.readFileSync("./demo/images/pizza.gif"));
doc.Header.add(table);
// doc.Footer.createImage(fs.readFileSync("./demo/images/pizza.gif"));

const packer = new Packer();

packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
