import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateInvoice,
  Items_Invoice,
  UpdateInvoice
} from 'src/model/app.model';
import { PrismaService } from 'src/common/prisma.service';
import { Invoice, Invoice_ItemList } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Prisma } from '@prisma/client';

dayjs.extend(utc);
dayjs.extend(timezone);

function getAdjustedDate(): Date {
  // Get current date and time
  const currentDate = new Date();

  // Calculate timezone offset in milliseconds (Asia/Jakarta is UTC+7)
  const timezoneOffsetMillis = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

  // Adjust current date to Asia/Jakarta timezone
  const adjustedDate = new Date(currentDate.getTime() + timezoneOffsetMillis);

  return adjustedDate;
}

@Injectable()
export class InvoiceService {
    constructor(private readonly prisma: PrismaService) { }

    async createInvoice(createInvoice: CreateInvoice): Promise<Invoice> {
        const { ID_project, Payment_Due, Payment_Type, Total_Termin, Termin_Number, Notes, Status } = createInvoice;
      
        try {
          // Menghitung jumlah invoice yang sudah ada
          const invoiceCount = await this.prisma.invoice.count();
          // Format ID_Invoice dengan padding
          const newID = `INV-${String(invoiceCount + 1).padStart(6, '0')}`;
      
          const newInvoice = await this.prisma.invoice.create({
            data: {
              ID_Invoice: newID,  // Menggunakan ID yang sudah diformat
              ID_project,
              Payment_Due,
              Payment_Type,
              Total_Termin,
              Termin_Number,
              Notes,
              Created_at: new Date(),  // Menggunakan waktu saat ini
              Updated_at: new Date(),  // Menggunakan waktu saat ini
              Status,
            },
          });
      
          return newInvoice;
        } catch (error) {
          console.error('Error creating invoice:', error);
          throw new HttpException(
            'Failed to create invoice',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      
      async updateInvoiceById(id: string, updateInvoiceDto: UpdateInvoice): Promise<Invoice> {
        const updatedData: Partial<Invoice> = {};
      
        // Hanya memperbarui field yang disediakan
        if (updateInvoiceDto.Payment_Due) {
          updatedData.Payment_Due = updateInvoiceDto.Payment_Due;
        }
      
        if (updateInvoiceDto.Payment_Type) {
          updatedData.Payment_Type = updateInvoiceDto.Payment_Type;
        }
      
        if (updateInvoiceDto.Total_Termin !== undefined) {
          updatedData.Total_Termin = updateInvoiceDto.Total_Termin;
        }
      
        if (updateInvoiceDto.Termin_Number !== undefined) {
          updatedData.Termin_Number = updateInvoiceDto.Termin_Number;
        }
      
        if (updateInvoiceDto.Notes) {
          updatedData.Notes = updateInvoiceDto.Notes;
        }
      
        if (updateInvoiceDto.Status) {
          updatedData.Status = updateInvoiceDto.Status;
        }
      
        updatedData.Updated_at = new Date(); // Menyesuaikan waktu diperbarui
      
        // Melakukan update di database
        return this.prisma.invoice.update({
          where: { ID_Invoice: id },
          data: updatedData,
        });
      }
      
      async softDeleteInvoiceById(id: string): Promise<Invoice> {
        // Cek apakah invoice ada
        const invoice = await this.prisma.invoice.findUnique({
          where: { ID_Invoice: id },
        });
      
        if (!invoice) {
          throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
        }
      
        // Melakukan soft delete dengan memperbarui field Deleted_at
        return this.prisma.invoice.update({
          where: { ID_Invoice: id },
          data: {
            Deleted_at: new Date(), // Set Deleted_at ke waktu saat ini
          },
        });
      }  
    
    async createItemsInvoice(createItemsInvoice: Items_Invoice): Promise<Invoice_ItemList> {
        const { ID_Invoice, Tittle, Description, Quantity, Price } = createItemsInvoice;
    
        return this.prisma.invoice_ItemList.create({
          data: {
            ID_Invoice,
            Tittle,
            Description,
            Quantity,
            Price,
            Created_at: getAdjustedDate(),  // Set creation date
            Updated_at: getAdjustedDate(),  // Set updated date
          },
        });
    }
    
    
    async getInvoicesSummary(status: 'All' | 'Draft' | 'Paid' | 'Sent' | 'OnHold') {
      // Kondisi untuk filter status
      const statusQuery = status === 'All' ? Prisma.sql`` : Prisma.sql`AND invoice.Status = ${status}`;
      
      // Membuat query SQL dinamis
      const query = Prisma.sql`
        SELECT 
          invoice.ID_Invoice, 
          invoice.Status, 
          user.Username,
          SUM(invoice_itemlist.Price * invoice_itemlist.Quantity) AS Amount,
          DATE(invoice.Created_at) AS Created_at, 
          DATE(invoice.Payment_Due) AS Payment_Due 
        FROM 
          Invoice invoice
        JOIN 
          Project project ON invoice.ID_project = project.ID_project
        JOIN 
          User user ON project.ID_user = user.ID_user
        JOIN 
          Invoice_ItemList invoice_itemlist ON invoice.ID_Invoice = invoice_itemlist.ID_Invoice
        WHERE
          1=1
          ${statusQuery}
        GROUP BY 
          invoice.ID_Invoice, 
          invoice.Status, 
          user.Username,
          DATE(invoice.Created_at),
          DATE(invoice.Payment_Due);
      `;
    
      return this.prisma.$queryRaw(query);
    }
    
    
    
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
          items: {  // Mengambil invoice_itemlist yang terkait
            select: {
              ID_ItemList :true,
              Tittle : true,
              Description: true,
              Quantity: true,
              Price: true,
            },
          },
        },
      });
    }
}