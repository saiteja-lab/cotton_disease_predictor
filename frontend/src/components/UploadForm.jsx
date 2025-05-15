import { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data);
    } catch (err) {
      alert('Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="w-full flex flex-col items-center">
          {imagePreview && (
            <div className="w-full max-w-md mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full max-w-md p-2 border rounded-md file:bg-green-600 file:text-white file:px-4 file:py-2 file:rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={!image || loading}
          className="bg-green-600 w-full max-w-md text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? 'Processing...' : 'Upload & Predict'}
        </button>
      </form>

      {result && (
        <div className="bg-white border p-4 rounded-lg shadow-md space-y-2">
          <h2 className="text-xl font-bold text-green-700 mb-2">🩺 Prediction Result</h2>
          <ul className="space-y-1">
            <li><strong>Disease:</strong> {result.disease}</li>
            <li><strong>Confidence:</strong> {result.confidence}%</li>
            <li><strong>Infection %:</strong> {result.infection_percentage}%</li>
            <li><strong>Intensity:</strong> {result.intensity_level}</li>
            <li>
              <strong>Recommendation:</strong>
              <div className="bg-gray-50 border mt-1 p-2 rounded-md whitespace-pre-line text-sm text-gray-700">
                {result.recommendation}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
