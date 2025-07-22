// lib/pdf/generateGatepass.ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

interface GatepassData {
  name: string;
  adhar: string;
  mobile: string;
  purpose: string;
  date: string;
  visitingOfficer?: string;
  validFrom?: string;
  validTo?: string;
  company?: string;
  division?: string;
}

export async function generateGatepassPDF(data: GatepassData): Promise<Uint8Array> {
  try {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Add a blank page (A4 size: 595 x 842 points)
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    // Embed fonts
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Draw header
    page.drawText('OFFICIAL GATEPASS', {
      x: 150,
      y: height - 100,
      size: 24,
      font: fontBold,
      color: rgb(0, 0, 0.5),
    });

    // Draw border
    page.drawRectangle({
      x: 50,
      y: height - 750,
      width: width - 100,
      height: 650,
      borderColor: rgb(0, 0, 0.5),
      borderWidth: 2,
    });

    // Visitor information
    let yPosition = height - 150;
    const lineHeight = 25;

    // Section headers
    const drawSection = (title: string, content: {label: string, value: string}[]) => {
      page.drawText(title, {
        x: 60,
        y: yPosition,
        size: 14,
        font: fontBold,
      });
      yPosition -= lineHeight * 1.5;

      content.forEach(item => {
        page.drawText(item.label, {
          x: 60,
          y: yPosition,
          size: 12,
          font: fontBold,
        });
        page.drawText(item.value, {
          x: 150,
          y: yPosition,
          size: 12,
          font: fontRegular,
        });
        yPosition -= lineHeight;
      });
      yPosition -= lineHeight;
    };

    // Visitor Details
    drawSection('Visitor Information:', [
      { label: 'Name:', value: data.name },
      { label: 'Aadhaar:', value: data.adhar },
      { label: 'Mobile:', value: data.mobile },
    //   { label: 'Company:', value: data.company || 'N/A' },
    ]);

    // Visit Details
    // drawSection('Visit Information:', [
    //   { label: 'Purpose:', value: data.purpose },
    //   { label: 'Visiting Officer:', value: data.visitingOfficer || 'N/A' },
    //   { label: 'Date:', value: data.date },
    //   { label: 'Valid From:', value: data.validFrom || data.date },
    //   { label: 'Valid To:', value: data.validTo || data.date },
    //   { label: 'Division:', value: data.division || 'N/A' },
    // ]);

    // Footer
    page.drawText('This gatepass must be presented at security checkpoints', {
      x: 100,
      y: 50,
      size: 10,
      font: fontRegular,
      color: rgb(0.5, 0, 0),
    });

    // Save the PDF
    return await pdfDoc.save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function downloadGatepassPDF(data: GatepassData) {
  try {
    const pdfBytes = await generateGatepassPDF(data);
    
    // Create blob and download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `gatepass_${data.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}