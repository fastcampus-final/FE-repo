import React from 'react';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { uploadImage } from '@/apis/common';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ htmlStr, setHtmlStr }: IEditor) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  React.useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob | string) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const res = await uploadImage(file as string, 'review');

        resolve({ data: { link: res.data } });
      };

      reader.readAsDataURL(file as Blob);
    });
  };

  // toolbar 설정
  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
  };

  // 언어 설정
  const localization = {
    locale: 'ko',
  };

  return (
    <WysiwygEditor
      editorClassName="editor" // Editor 적용 클래스
      toolbarClassName="toolbar" // Toolbar 적용 클래스
      toolbar={toolbar}
      placeholder="내용을 입력하세요."
      localization={localization}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ height: '500px' }}
    />
  );
};

export default Editor;
