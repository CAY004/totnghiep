import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileImage, Loader2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const OCRUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('receipt', file);

      const response = await axios.post('/api/ocr/process-receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi xử lý hình ảnh');
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <FileImage className="w-6 h-6 text-accent" />
        <h3 className="text-lg font-semibold text-gray-200">OCR Hóa đơn</h3>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Click để chọn hình ảnh hóa đơn</p>
          <p className="text-sm text-gray-500">PNG, JPG, JPEG (max 5MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Receipt preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={resetUpload}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={loading}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Xử lý hóa đơn
                </>
              )}
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-400"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-900/50 border border-green-700 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Xử lý thành công!</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Số tiền:</span>
                  <span className="text-gray-200">{result.amount?.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngày:</span>
                  <span className="text-gray-200">{result.date || 'Không xác định'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mô tả:</span>
                  <span className="text-gray-200">{result.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Danh mục gợi ý:</span>
                  <span className="text-accent">{result.suggestedCategory}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default OCRUpload;