import React, { useEffect, useState } from "react";
import './detailBlog.scss'
import { useHistory, withRouter } from "react-router-dom";
import { Gap, Link } from "../../components";
import axios from 'axios';

const DetailBlog = (props) => {
    const [data, setData] = useState({})
    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`http://localhost:4000/v1/blog/post/${id}`)
            .then(res => {
                console.log('Success: ', res)
                setData(res.data.data)
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }, [props])
    const history = useHistory();
    if (data.author) {

        return (
            <div className="detail-blog-wrapper">
                <img className="img-cover" src={`http://localhost:4000/${data.image}`} alt="thumb" />
                <p className="blog-title">{data.title}</p>
                <p className="blog-author">{data.author.name} - {data.createdAt}</p>
                <p className="blog-body">Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply Lorem Ipsum is Simply</p>
                <Gap height={30} />
                <Link title="Kembali Ke Home" onClick={() => history.push('/')} />
                <Gap height={30} />
            </div>

        )
    }
    return <p>Loading data ...</p>
}

export default withRouter(DetailBlog)