import React, { useState } from 'react';
import { Button, message, Upload } from "antd/lib";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const SelectFile = ({ value, onChange, ...props }) => {

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    selectedFile: null,
    selectedFileList: []
  })

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleOnChange = info => {
    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        setLoading(true);
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        setLoading(false);
        message.success('Tải lên thành công');
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;
      case "error":
        setLoading(false);
        message.error('Tải lên lỗi');
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
        break;
      default:
        // error or removed
        setLoading(false);
        message.success('Tải lên lỗi');
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    setState(() => nextState);
  };

    return (
      <Upload
      props={...props}
      fileList={state.selectedFileList}
      customRequest={dummyRequest}
      onChange={handleOnChange}
    >
      {uploadButton}
    </Upload>
  );
};

export default SelectFile;






