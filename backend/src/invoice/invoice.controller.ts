import {
  Controller,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvoiceService } from './invoice.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Struk')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id/pdf')
  async getInvoicePDF(@Param('id') id: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.invoiceService.generateInvoicePDF(id);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
  }
}
