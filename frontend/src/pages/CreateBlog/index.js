import React, { useEffect, useState } from "react";
import { Input, Button, Upload, TextArea, Gap, Link } from "../../components";
import "./createBlog.scss";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postToAPI, setForm, setImgPreview, updateToAPI } from "../../config/redux/action"
import axios from "axios";

const CreateBlog = (props) => {
  const { form, imgPreview } = useSelector(state => state.createBlogReducer);
  const { title, body } = form;
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch('');
  const history = useHistory();


  useEffect(() => {
    console.log('params: ', props);
    const id = props.match.params.id
    if (id) {
      setIsUpdate(true);
      axios.get(`http://localhost:4000/v1/blog/post/${id}`)
        .then(res => {
          const data = res.data.data
          console.log('res: ', data);
          dispatch(setForm('title', data.title));
          dispatch(setForm('body', data.body));
          dispatch(setImgPreview(`http://localhost:4000/${data.image}`))
        })
        .catch(err => {
          console.log('err: ', err)
        })
    }
  }, [])

  // handle create blog
  const onSubmit = () => {
    const id = props.match.params.id
    if (isUpdate) {
      console.log('Update Data')
      updateToAPI(form, id)
    } else {
      console.log('create Data')
      postToAPI(form)
    }
  }

  // handle image upload
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm('image', file));
    dispatch(setImgPreview(URL.createObjectURL(file)))
  }
  return (
    <div className="blog-post">
      <Link title="kembali" onClick={() => history.push('/')} />
      <p className="title">{isUpdate ? 'Update' : 'Create New Post'}</p>
      <Input label="Post Title" value={title} onChange={(e) => dispatch(setForm('title', e.target.value))} />
      <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
      <TextArea value={body} onChange={(e) => dispatch(setForm('body', e.target.value))} />
      <Gap height={20} />
      <div className="button-action">
        <Button title={isUpdate ? 'Udpate' : 'Simpan'} onClick={onSubmit} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default withRouter(CreateBlog)
