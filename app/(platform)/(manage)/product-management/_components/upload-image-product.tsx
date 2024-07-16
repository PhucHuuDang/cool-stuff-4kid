import React, { useState, useEffect, useCallback } from "react";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Plus } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/Config/firebase";

type FileType = Exclude<UploadFile['originFileObj'], undefined>;

interface UploadImageProductProps {
  onFileChange: (url: string | string[]) => void;
  initialImage?: string;
  initialImages?: string[];
  multiple?: boolean;
  maxCount?: number;
}

const UploadImageProduct: React.FC<UploadImageProductProps> = ({ 
  onFileChange, 
  initialImage, 
  initialImages, 
  multiple = false, 
  maxCount = 1 
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialImage) {
      setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: initialImage }]);
    } else if (initialImages) {
      setFileList(initialImages.map((url, index) => ({ 
        uid: `-${index + 1}`, 
        name: `image${index + 1}.png`, 
        status: 'done', 
        url 
      })));
    }
  }, [initialImage, initialImages]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const uploadPromises = newFileList
      .filter(file => file.originFileObj)
      .map(async file => {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file.originFileObj as Blob);
        return getDownloadURL(snapshot.ref);
      });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      if (multiple) {
        onFileChange(uploadedUrls);
      } else {
        onFileChange(uploadedUrls[0] || '');
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload image(s) to Firebase");
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
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
        beforeUpload={() => false}
        multiple={multiple}
        maxCount={maxCount}
      >
        {fileList.length >= maxCount ? null : uploadButton()}
      </Upload>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
        src={previewImage}
        alt="Product Image"
      />
    </>
  );
};

export { UploadImageProduct };