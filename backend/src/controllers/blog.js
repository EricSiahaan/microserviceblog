const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs')
const BlogPost = require('../models/blog');

// membuat blog
exports.createBlog = (req, res, next) => {


  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err
  }

  if (!req.file) {
    const err = new Error('Image Harus Di Upload');
    err.errorStatus = 422
    throw err
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: 'Eric Hansdeka' }
  })

  Posting.save()
    .then(result => {
      res.status(201).json({
        message: "Create Blog Post Success",
        data: result
      })

    })

    .catch(err => {
      console.log('err: ', err)
    })
}

// mendapatkan semua artikel blog
exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
      res.status(200).json({
        message: 'Data Berhasil Dipanggil',
        data: result,
        total_Data: totalItems,
        per_Page: parseInt(perPage),
        current_Page: parseInt(currentPage),
      })
    })
    .catch(err => {
      next(err)
    })
}

//mendapatkan blog berdasarkan id
exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then(result => {
      if (!result) {
        const error = new Error('Blog Post Tidak Ditemukan');
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Berhasil Dipanggi",
        data: result,
      })

    })
    .catch(err => {
      next(err)
    })
}

//melakukan perubahan berdasarkan id 
exports.updateBlogPostById = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = new Error('Invalid Value');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err
  }

  if (!req.file) {
    const err = new Error('Image Harus Di Upload');
    err.errorStatus = 422
    throw err
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {

        const err = new Error('Blog Post Tidak Ditemukan');
        err.errorStatus = 404;
        throw err;
      }
      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then(result => {
      res.status(200).json({
        massage: "Update Berhasil",
        data: result,
      })
    })
    .catch(err => {
      next(err)
    })

}

//menghapus blog
exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const err = new Error('Blog Post Tidak Ditemukan');
        err.errorStatus = 404;
        throw err;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);

    })
    .then(result => {
      res.status(200).json({
        message: "Berhasil Di Hapus",
        data: result,
      })
    })
    .catch(err => {
      next(err)
    })
}

//menghapus gambar
const removeImage = (filePath) => {
  console.log('filePath', filePath);
  console.log('dir name: ', __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, err => console.log(err));
}