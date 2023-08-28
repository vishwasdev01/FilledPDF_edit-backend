import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PdfService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generatePDFWithFields(data: any): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const initialValue = 'Enter your name';
    const page = pdfDoc.addPage([600, 700]);
    const form = pdfDoc.getForm();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Create a text field
    const textField = form.createTextField('name');

    textField.setText(initialValue);
    textField.addToPage(page, {
      x: 150,
      y: 650,
      width: 200,
      height: 20,
      textColor: rgb(0, 0, 0),
    });

    const textFields = form.createTextField('name-field');

    textFields.setText(initialValue);
    textFields.addToPage(page, {
      x: 370,
      y: 650,
      width: 200,
      height: 20,
      textColor: rgb(0, 0, 0),
    });
    const dropdowns = form.createDropdown('planets.dropdown');
    dropdowns.setOptions(['Earth', 'Mars', 'Pluto', 'Venus']);
    dropdowns.select('Earth');

    dropdowns.addToPage(page, { x: 150, y: 500, width: 200, height: 30 });

    const dropdown = form.createDropdown('select');
    dropdown.setOptions(['Option1', 'Option2']);
    dropdown.select('Option1');

    dropdown.addToPage(page, {
      x: 150,
      y: 600,
      width: 200,
      height: 30,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 1),
      font: font,
    });
    dropdown.updateAppearances(font);

    // Create a radio group
    const radioGroup = form.createRadioGroup('best.gundam');

    const options = {
      x: 450,
      width: 25,
      height: 25,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
    };

    radioGroup.addOptionToPage('Exia', page, { ...options, x: 400, y: 600 });
    radioGroup.addOptionToPage('Dynames', page, { ...options, x: 450, y: 600 });
    radioGroup.select('Exia');
    const pdfBytes = await pdfDoc.save();

    await fs.writeFile(`${__dirname}/editable.pdf`, pdfBytes);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async savePdf(pdfData: Buffer, updatedValue: string): Promise<string> {
    const fileName = `${uuidv4()}.pdf`;
    const filePath = `${__dirname}/${fileName}`;
    const pdfDoc = await PDFDocument.load(pdfData);
    const form = pdfDoc.getForm();
    const textField = form.getTextField('name');

    if (textField) {
      textField.setText(updatedValue);
    }
    const modifiedPdfBytes = await pdfDoc.save();

    await fs.writeFile(filePath, modifiedPdfBytes);
    return fileName;
  }
}
