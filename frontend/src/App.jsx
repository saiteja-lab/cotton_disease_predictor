import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full h-full max-w-none">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">🌿 Cotton Disease Predictor</h1>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
