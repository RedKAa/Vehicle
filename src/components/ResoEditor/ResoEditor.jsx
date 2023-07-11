import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { uploadImages } from '@/services/file';
import spinnerPath from '@/assets/images/spinner.svg';
import 'react-quill/dist/quill.snow.css';

import ImageResize from 'quill-image-resize-module-react';

var Image = Quill.import('formats/image');
Image.className = 'custom-class-to-image';
Quill.register(Image, true);

// Add fonts to whitelist
// var fonts = ['sofia', 'roboto'];
// var Font = Quill.import('formats/font');
// Font.whitelist = fonts;
// Quill.register(Font, true);

//Handle Inline module Align not working
var Align = Quill.import('attributors/style/align');
let AlignStyle = Quill.import('attributors/style/align');
let BackgroundStyle = Quill.import('attributors/style/background');
let ColorStyle = Quill.import('attributors/style/color');
let DirectionStyle = Quill.import('attributors/style/direction');
let FontStyle = Quill.import('attributors/style/font');
let SizeStyle = Quill.import('attributors/style/size');

let Font = Quill.import('formats/font');

Font.whitelist = ['Asap', 'Roboto'];

Quill.register(Font, true);
Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);
Quill.register(Align, true);
Quill.register('modules/imageResize', ImageResize);


function imageUpload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file = input.files[0];

    // Save current cursor state
    const range = this.quill.getSelection(true);

    // Insert temporary loading placeholder image
    this.quill.insertEmbed(range.index, 'image', spinnerPath);

    // Move cursor to right side of image (easier to continue typing)
    this.quill.setSelection(range.index + 1);

    const res = await uploadImages(file); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

    // Remove placeholder image
    this.quill.deleteText(range.index, 1);

    // Insert uploaded image
    // this.quill.insertEmbed(range.index, 'image', res);
    this.quill.insertEmbed(range.index, 'image', res);
  };
}

const ResoEditor = (props) => {
  const [editorHtml, setEditorHtml] = useState('');
  const handleChange = (html) => setEditorHtml(html);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageUpload },
    },
    clipboard: { matchVisual: false },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'size',
    'color',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'background',
    'font',
    'width',
  ];

  //end FAKE
  return <ReactQuill modules={modules} formats={formats} {...props} onchange={handleChange} />;
};

export default ResoEditor;
