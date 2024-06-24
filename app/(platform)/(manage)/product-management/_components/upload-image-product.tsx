import React, { useState, useEffect, useCallback } from "react";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Plus } from "lucide-react";

type FileType = Exclude<UploadFile['originFileObj'], undefined>;

interface UploadImageProductProps {
  onFileChange: (fileChange: string) => void;
  initialImage?: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImageProduct: React.FC<UploadImageProductProps> = ({ onFileChange, initialImage }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState<UploadFile | null>(null);
  const [fileChange, setFileChange] = useState<string>("");

  useEffect(() => {
    onFileChange(fileChange);
  }, [fileChange, onFileChange]);

  useEffect(() => {
    if (initialImage) {
      const initialFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: initialImage,
      } as UploadFile;
      setFile(initialFile);
      setFileChange(initialImage);
    }
  }, [initialImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj as FileType);
      } catch (error) {
        message.error("Failed to read file");
      }
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList: newFileList }) => {
    const newFile = newFileList.length ? newFileList[0] : null;
    setFile(newFile);

    if (newFileList.length === 0) {
      setFile(null);
      setFileChange("");
    }

    if (newFile && newFile.originFileObj) {
      try {
        const base64 = await getBase64(newFile.originFileObj);
        newFile.url = base64;
        setFileChange(base64);
      } catch (error) {
        message.error("Failed to convert file to base64");
      }
    }
  };

  const uploadButton = useCallback(
    () => (
      <button className="items-center" type="button">
        <div className="items-center ml-3">
          <Plus />
        </div>
        <div>Upload</div>
      </button>
    ),
    []
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={file ? [file] : []}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
      >
        {file ? null : uploadButton()}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          alt="Product Image"
        />
      )}
    </>
  );
};

export { UploadImageProduct };
