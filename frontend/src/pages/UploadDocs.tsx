import { useState } from "react";
import { Appbar } from "../components/Appbar.tsx";
import { Footer } from "../components/Footer.tsx";

export const UploadDocuments = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const validFiles = filesArray.filter(file =>
        ["application/pdf", "image/png", "image/jpeg"].includes(file.type)
      );

      if (validFiles.length !== filesArray.length) {
        alert("Only PDF, PNG, and JPG files are allowed.");
      }
      setSelectedFiles(validFiles);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please upload at least one document.");
      return;
    }
    alert("Documents submitted successfully for verification!");
    // Implement backend API call for uploading
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Appbar />

      <main className="flex-1 pt-24 container mx-auto px-4 sm:px-8 py-10">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">Upload Documents for Verification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block font-medium text-gray-700">Upload PDFs, PNGs, or JPGs:</label>
            <input
              type="file"
              multiple
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium">Selected Files:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
            >
              Submit for Verification
            </button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};