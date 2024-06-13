import React, { useState, useEffect } from "react";
import { Upload, Image } from "antd";
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

const UploadImageProduct: React.FC<UploadImageProductProps> = (props) => {
  const { onFileChange, initialImage } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState<UploadFile | null>(null);
  const [fileChange, setFileChange] = useState<string>("");

  useEffect(() => {
    onFileChange(fileChange);
  }, [fileChange, onFileChange]);

  useEffect(() => {
    if (initialImage) {
      setFile({
        uid: "-1",
        name: "image.png",
        status: "done",
        url: initialImage,
      });
      setFileChange(initialImage);
    }
  }, [initialImage]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const newFile = newFileList.length ? newFileList[0] : null;
    setFile(newFile);

    if (newFileList.length === 0) {
      setFile(null);
      setFileChange("");
    }

    if (newFile && newFile.originFileObj) {
      const base64 = await getBase64(newFile.originFileObj);
      newFile.url = base64;
      setFileChange(base64);
    }
  };

  const uploadButton = (
    <button className="items-center" type="button">
      <div className="items-center ml-3">
      <Plus />
      </div>
      <div>Upload</div>
    </button>
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
        {file ? null : uploadButton}
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
        />
      )}
    </>
  );
};

export { UploadImageProduct };
