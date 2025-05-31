import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';
import ResultsDisplay from './ResultsDisplay'; // Assuming ResultsDisplay component exists

interface PredictionResult {
  confidence: number;
  disease: string;
  infection_percentage: number;
  intensity_level: string;
  recommendation: string;
}

const UploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPredictionResult(null);
    
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (e.g., JPG, PNG, JPEG).');
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedFile(file);
    
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    setError(null);
    setPredictionResult(null);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (e.g., JPG, PNG, JPEG).');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image', selectedFile); // CORRECTED: Use 'image' as the key
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          // Let Axios set the Content-Type header automatically for FormData
          'Accept': 'application/json'
        },
        withCredentials: false,
        timeout: 30000,
      });
      
      // Ensure the response from predict_disease() matches PredictionResult interface
      if (response.data) {
        setPredictionResult(response.data);
      } else {
        throw new Error('No data received from server, though request was successful.');
      }
    } catch (err: any) {
      console.error('Error submitting file:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Error Response Data:', err.response.data);
          console.error('Error Response Status:', err.response.status);
          setError(
            err.response.data?.error || // Use 'error' key from your Flask error response
            err.response.data?.message ||
            `Server error: ${err.response.status} - ${err.response.statusText || 'Bad Request'}. Please check server logs.`
          );
        } else if (err.request) {
          setError('No response from server. Please check your network connection and if the server is running.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="upload" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detect Cotton Plant Diseases</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload an image of your cotton plant and our AI will analyze it for diseases, 
              providing you with detailed information and treatment recommendations.
            </p>
          </div>
          
          {!predictionResult ? (
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    previewUrl 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  
                  {previewUrl && selectedFile ? (
                    <div className="space-y-4">
                      <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={previewUrl} 
                          alt="Selected plant" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      </p>
                      <button 
                        type="button" 
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetForm();
                        }}
                      >
                        Choose a different image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                        <Upload className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">
                          Drag and drop your image here or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Supported formats: JPG, PNG, JPEG
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-start space-x-2" role="alert">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-8 py-3 flex items-center justify-center min-w-[180px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <ResultsDisplay 
              result={predictionResult} 
              imageUrl={previewUrl!}
              onReset={resetForm}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;