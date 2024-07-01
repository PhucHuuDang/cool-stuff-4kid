import React, { useState, useEffect, useCallback } from "react";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Plus } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/Config/firebase"; // Đảm bảo đường dẫn này chính xác

type FileType = Exclude<UploadFile['originFileObj'], undefined>;

interface UploadImageProductProps {
  onFileChange: (url: string) => void;
  initialImage?: string;
}

const UploadImageProduct: React.FC<UploadImageProductProps> = ({ onFileChange, initialImage }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState<UploadFile | null>(null);

  useEffect(() => {
    if (initialImage) {
      setPreviewImage(initialImage);
    }
  }, [initialImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList: newFileList }) => {
    const newFile = newFileList[0];
    setFile(newFile);

    if (newFile && newFile.originFileObj) {
      try {
        const storageRef = ref(storage, `products/${Date.now()}_${newFile.name}`);
        const snapshot = await uploadBytes(storageRef, newFile.originFileObj);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        setPreviewImage(downloadURL);
        onFileChange(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Failed to upload image to Firebase");
      }
    }
  };

  const uploadButton = useCallback(() => (
    <button className="items-center" type="button">
      <div className="items-center ml-3">
        <Plus />
      </div>
      <div>Upload</div>
    </button>
  ), []);

  // Helper function to get base64 for preview
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={file ? [file] : []}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
        beforeUpload={() => false} // Prevent auto upload
      >
        {file ? null : uploadButton()}
      </Upload>
      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
          alt="Product Image"
        />
      )}
    </>
  );
};

export { UploadImageProduct };