const { createWorker } = require('tesseract.js');
const multer = require('multer');
const path = require('path');

class OCRService {
  constructor() {
    this.worker = null;
  }

  async initWorker() {
    if (!this.worker) {
      this.worker = await createWorker('vie+eng');
    }
    return this.worker;
  }

  async extractTextFromImage(imagePath) {
    try {
      const worker = await this.initWorker();
      const { data: { text } } = await worker.recognize(imagePath);
      return text;
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Không thể đọc văn bản từ hình ảnh');
    }
  }

  async parseReceiptData(text) {
    // Parse receipt text to extract amount, date, description
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    let amount = null;
    let date = null;
    let description = '';

    // Extract amount (look for VND or numbers)
    const amountRegex = /(\d{1,3}(?:\.\d{3})*|\d+)(?:\s*VND|\s*vnd|\s*đ|\s*VNĐ)/gi;
    const amountMatches = text.match(amountRegex);
    if (amountMatches) {
      // Take the largest amount as total
      const amounts = amountMatches.map(match => {
        const num = match.replace(/[^\d]/g, '');
        return parseInt(num.replace(/\./g, ''));
      });
      amount = Math.max(...amounts);
    }

    // Extract date
    const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{2,4}[\/\-]\d{1,2}[\/\-]\d{1,2})/g;
    const dateMatch = text.match(dateRegex);
    if (dateMatch) {
      date = dateMatch[0];
    }

    // Extract description (first meaningful line)
    for (const line of lines) {
      if (line.length > 5 && !line.match(/\d/) && !line.toLowerCase().includes('tong tien')) {
        description = line;
        break;
      }
    }

    return {
      amount,
      date,
      description: description || 'Hóa đơn',
      rawText: text
    };
  }

  async processReceipt(imagePath) {
    try {
      const text = await this.extractTextFromImage(imagePath);
      const parsedData = await this.parseReceiptData(text);

      return {
        success: true,
        data: parsedData
      };
    } catch (error) {
      console.error('Receipt Processing Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Auto categorize based on description
  categorizeExpense(description) {
    const desc = description.toLowerCase();

    if (desc.includes('an uong') || desc.includes('nha hang') || desc.includes('cafe') || desc.includes('tra sua')) {
      return 'Ăn uống';
    } else if (desc.includes('taxi') || desc.includes('grab') || desc.includes('xe buyt')) {
      return 'Di chuyển';
    } else if (desc.includes('sieu thi') || desc.includes('cho') || desc.includes('thuc pham')) {
      return 'Mua sắm';
    } else if (desc.includes('dien') || desc.includes('nuoc') || desc.includes('internet')) {
      return 'Tiện ích';
    } else if (desc.includes('quanao') || desc.includes('giay') || desc.includes('thoi trang')) {
      return 'Thời trang';
    } else {
      return 'Khác';
    }
  }

  async terminate() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

module.exports = new OCRService();