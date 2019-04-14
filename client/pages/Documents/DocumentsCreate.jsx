import React, {Component} from 'react';
import SimpleSchema from "simpl-schema";
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import db from 'apollo-morpher';
import { Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import { proces_verbal } from '../../utils';
import SignatureCanvas from 'react-signature-canvas';

class PostCreate extends Component {

  state = {
    pdf: '',
    type: '',
    editorState: '',
  };

  onSubmit = async data => {
    const {editorState, type} = this.state;
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(
      rawContentState
    );

    await fetch('https://v2018.api2pdf.com/chrome/html', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'e29b6016-6dbc-4923-b5e3-fce65b76cd8f' //Get your API key from https://portal.api2pdf.com
      },
      body: JSON.stringify({html: `<p>${markup}</p>`, inlinePdf: true, fileName: 'test.pdf' })
    }).then(res=> res.json())
      .then(res => {
        this.setState({
          pdf: res.pdf
        })
      });

    const newData = {
      ...data,
      pdf: this.state.pdf,
      userId: Meteor.userId()
    };

    db.documents.insert(newData)
      .then(id => {
        if (id) {
          console.log(id);
          //do smth
        } else {
          // error
        }
      });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleType = (id) => {
    const content = id === 1 ? proces_verbal : 'Nu merge.';
    this.setState({
      type: id,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${content}</p>`)
        )
      )
    });
  };

  render() {
    const { type, editorState } = this.state;
    if (!type) {
      return (
        <div>
          <Navbar className="navbar__white" />

          <div className="documents__create__types">
            <div className="documents__create__type box" onClick={() => this.handleType(1)}>
              Proces verbal
            </div>
            <div className="documents__create__type box" onClick={() => this.handleType(2)}>
              Adeverinta elev
            </div>
            <div className="documents__create__type box" onClick={() => this.handleType(2)}>
              Sedinta
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Navbar className="navbar__white" />

        <AutoForm schema={DocumentSchema} onSubmit={this.onSubmit}>
          <AutoField name="title" placeholder="Enter your email address" />

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <AutoField name="type" placeholder="Enter your email address" />
          <div className="cc-signature">
            <div className="flex--helper cc-signature__row text--dark-blue">
            </div>
            <SignatureCanvas
              ref={ref => {
                this.sigPad = ref;
              }}
              penColor="#133d6b"
              canvasProps={{
                width: 630,
                height: 200,
                className: 'sigCanvas',
              }}
            />
          </div>
          <Button type="primary" htmlType="submit">Submit</Button>
        </AutoForm>
      </div>
    );
  }
}

const DocumentSchema = new SimpleSchema({
  title: {
    type: String,
  },
  type: { type: String },
});

export default PostCreate;