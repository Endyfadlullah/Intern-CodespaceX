import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async findInvoiceById(id: string) {
    return this.prisma.invoice.findUnique({
      where: { ID_Invoice: id },
      select: {
        Status: true,
        ID_Invoice: true,
        Payment_Due: true,
        Payment_Type: true,
        Total_Termin: true,
        Termin_Number: true,
        ID_project: true,
        Notes: true,
        items: {
          select: {
            ID_ItemList: true,
            Tittle: true,
            Description: true,
            Quantity: true,
            Price: true,
          },
        },
      },
    });
  }

  async generateInvoiceHTML(invoiceData: any): Promise<string> {
    const itemsWithAmount = invoiceData.items.map((item: any) => ({
      ...item,
      amount: item.Price * item.Quantity,
    }));

    const subTotal = itemsWithAmount.reduce(
      (total: number, item: any) => total + item.amount,
      0,
    );

    const total = subTotal + (invoiceData.tax || 0);

    function formatRupiah(amount: number): string {
      return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    }
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
  
            .invoice {
                max-width: 700px;
                margin: 20px auto;
                padding: 20px;
                border-radius: 8px;
                background-color: #f9f9f9;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
            }
  
            .invoice-header, .invoice-body, .invoice-footer {
                margin-bottom: 20px;
            }
  
            .invoice-header {
                display: flex;
                justify-content: space-between;
            }
  
            .invoice-header div {
                width: 45%;
            }
  
            .invoice-header div h2 {
                margin: 0;
                font-size: 24px;
            }
  
            .invoice-header div p {
                margin: 5px 0;
                color: black;
            }
  
            .invoice-body table {
                width: 100%;
                border-collapse: collapse;
            }
  
            .invoice-body table th, .invoice-body table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
  
            .invoice-body table th {
                background-color: #f2f2f2;
            }
  
            .invoice-summary {
                float: right;
                width: 50%;
                border: 1px solid #ddd;
                padding: 10px;
                margin-top: 20px;
                background-color: #f2f2f2;
            }
  
            .invoice-summary p {
                margin: 5px 0;
                text-align: right;
            }
  
            .total {
                font-weight: bold;
                font-size: 1.2em;
            }
  
            .notes, .bank-info {
                margin-top: 20px;
            }
  
            .notes p, .bank-info p {
                margin: 0;
                padding: 5px;
                background-color: #f8f9fa;
                border-left: 5px solid #007bff;
            }
        </style>
    </head>
    <body>
        <div class="invoice">
            <!-- Invoice Header -->
            <div class="invoice-header">
                <div>
                    <h2>INVOICE</h2>
                    <p>${invoiceData.ID_Invoice}</p>
                    <p>Billed to :</p>
                    <p>${invoiceData.clientName}</p>
                    <p>${invoiceData.clientAddress}</p>
                    <p>${invoiceData.clientEmail} | ${invoiceData.clientPhone}</p>
                </div>
                <div style="text-align: right;" >
                    <p><strong>CODESPACE INDONESIA</strong></p>
                    <p>mail@codespace.id | +62-821-4186-6633</p>
                </div>
            </div>
            <!-- Invoice Body -->
            <div class="invoice-body">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                      ${
                        itemsWithAmount.length > 0
                          ? itemsWithAmount
                              .map(
                                (item) => `
                      <tr>
                          <td>${item.Tittle || 'N/A'}</td>
                          <td>${item.Description || 'N/A'}</td>
                          <td>${item.Quantity || 'N/A'}</td>
                          <td>${formatRupiah(item.Price || 0)}</td>
                          <td>${formatRupiah(item.amount || 0)}</td>
                      </tr>
                      `,
                              )
                              .join('')
                          : '<tr><td colspan="5">No items found</td></tr>'
                      }
                  </tbody>
                </table>
  
                <!-- Summary -->
                <div class="invoice-summary">
                    <p>Sub Total: ${formatRupiah(subTotal)}</p>
                    <p>Tax: ${invoiceData.tax ? formatRupiah(invoiceData.tax) : '0.00'}</p>
                    <p class="total">Total: ${formatRupiah(total)}</p>
                    <p>Terbilang: ${invoiceData.terbilang || 'N/A'}</p>
                </div>
            </div>
  
            <!-- Notes -->
            <div class="notes">
                <h4>NOTES</h4>
                <p>${invoiceData.Notes}</p>
            </div>
  
            <!-- Bank Information -->
            <div class="bank-info">
                <h4>BANK ACCOUNT</h4>
                <p>Bank Syariah Indonesia (BSI)</p>
                <p>(0201230012)</p>
                <p>Account Holder : <strong>Codespace Indonesia</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    return htmlContent;
  }

  async generateInvoicePDF(invoiceId: string): Promise<Buffer> {
    const invoiceData = await this.findInvoiceById(invoiceId);
    if (!invoiceData) {
      throw new Error('Invoice not found');
    }
    const htmlContent = await this.generateInvoiceHTML(invoiceData);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    await browser.close();

    console.log('Generated PDF Buffer:', pdfBuffer);
    return Buffer.from(pdfBuffer);
  }
}
