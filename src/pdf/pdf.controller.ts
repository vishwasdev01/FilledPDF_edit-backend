import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async generatePDF(@Res() res: Response) {
    try {
      const inputData = {
        textFieldValue: 'Sample Text',
        checkboxValue: true,
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pdfBytes: any =
        await this.pdfService.generatePDFWithFields(inputData);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="generated.pdf"',
      );
      res.sendFile(`${__dirname}/editable.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  }
  @Post('save-pdf')
  @UseInterceptors(FileInterceptor('pdfFile'))
  async savePdf(@UploadedFile() pdfFile, @Body() body) {
    const updatedValue = body.updatedValue;

    const savedFileName = await this.pdfService.savePdf(
      pdfFile.buffer,
      updatedValue,
    );

    return { message: 'PDF saved successfully', updatedValue, savedFileName };
  }
}
