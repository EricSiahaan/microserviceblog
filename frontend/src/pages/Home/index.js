import React, { useEffect, useState } from "react";
import { BlogItem, Button, Gap } from "../../components";
import "./home.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setDataBlog } from "../../config/redux/action";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";


const Homepage = () => {


  const [counter, setCounter] = useState(1);
  const { dataBlog, page } = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();

  // console.log(page)

  useEffect(() => {
    dispatch(setDataBlog(counter))
  }, [counter, dispatch])
  const history = useHistory()

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
    // console.log(counter)
  }

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1)
    console.log(counter)
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Apakah Anda yakin menghapus post ini ?',
      buttons: [
        {
          label: 'Ya',
          onClick: () => {
            axios.delete(`http://localhost:4000/v1/blog/post/${id}`)
              .then(res => {
                console.log('success delete :', res.data);
                dispatch(setDataBlog(counter))
              })
              .catch(err => {
                console.log('err: ', err)
              })
          }
        },
        {
          label: 'Tidak',
          onClick: () => console.log('user Tdak Setuju')
        }
      ]
    });
  }

  return (
    <div className="home-page-wrapper">
      <div className="create-wrapper">
        <Link to="/create-blog">
          <Button
            title="create blog" onClick={() => history.push("/create-blog")} />
        </Link>
      </div>
      <Gap height={20} />
      <div className="content-wrapper">
        {dataBlog.map(blog => {
          return <BlogItem
            key={blog._id}
            image={`http://localhost:4000/${blog.image}`}
            title={blog.title}
            body={blog.body}
            name={blog.author.name}
            date={blog.createdAt}
            _id={blog._id}
            onDelete={confirmDelete}
          />
        })}

      </div>
      <div className="pagination">
        <Button title="Previos" onClick={previous} />
        <Gap width={20} />
        <p className="text-page">{page.currentPage} / {page.totalPage}</p>
        <Button title="next" onClick={next} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Homepage;
