import React from 'react';

import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ htmlStr, setHtmlStr }: IEditor) => {
  const editorRef = React.useRef<ToastEditor>(null);

  // Editor Change 이벤트
  const onChangeEditor = () => {
    if (editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML());
    }
  };

  React.useEffect(() => {
    if (editorRef.current) {
      // 전달받은 html값으로 초기화
      editorRef.current.getInstance().setHTML(htmlStr);

      // 기존 이미지 업로드 기능 제거
      editorRef.current.getInstance().removeHook('addImageBlobHook');
      // 이미지 서버로 데이터를 전달하는 기능 추가
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        (async () => {
          const res = URL.createObjectURL(blob);

          callback(res, 'input alt text');
        })();

        return false;
      });
    }
  }, []);

  // Editor에 사용되는 plugin 추가
  const plugins = [
    colorSyntax, // 글자 색상 추가
  ];

  return (
    <ToastEditor
      initialValue=""
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      plugins={plugins}
      onChange={onChangeEditor}
      height="95%"
    />
  );
};

export default Editor;
