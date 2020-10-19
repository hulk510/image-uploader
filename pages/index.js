import React, { useCallback, useEffect, useState, useReducer } from 'react'
import { useDropzone } from 'react-dropzone'
import { post } from 'axios'
// form系の奴はもうtextfieldで全部できるみたい。
import { Grid, Card, CardContent, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ImageForm from '../components/ImageForm'
import SuccessImage from '../components/SuccessImage'

const initialState = {
  file: null,
  fileInfo: null,
  progress: 0,
  success: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILE_UPLOAD_REQUEST':
      return {
        progress: Math.round((100 * action.event.loaded) / action.event.total)
      }
    case 'FILE_UPLOAD_SUCCESS':
      return {
        ...state,
        fileInfo: action.files,
        progress: 0,
        success: true
      }
    case 'FILE_UPLOAD_FAILURE':
      return {
        ...state,
        progress: 0,
        fileInfo: null,
        success: false
      }
    case 'CHANGE_IMAGE_FILE':
      return {
        file: action.file
      }
  }
}

const useStyle = makeStyles({
  card: {
    padding: "1rem",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  }
})

export default function Home() {
  const classes = useStyle()
  const [props, dispatch] = useReducer(reducer, initialState)
  const { file, fileInfo, progress, success } = props
  const onDrop = useCallback(acceptedFiles => {
    const f = acceptedFiles[0]
    dispatch({ type: 'CHANGE_IMAGE_FILE', file: f })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (file) {
      upload()
    }
  }, [file])

  function upload() {
    fileUpload(file, (event) => {
      dispatch({ type: 'FILE_UPLOAD_REQUEST', event: event })
    }).then((response) => {
      dispatch({ type: 'FILE_UPLOAD_SUCCESS', files: response.data.files })
    }).catch(() => {
      dispatch({ type: 'FILE_UPLOAD_FAILURE' })
    })
  }
  function onChange(e) {
    const f = e.target.files[0]
    dispatch({ type: 'CHANGE_IMAGE_FILE', file: f })
  }

  function fileUpload(file, onUploadProgress) {
    // こうやって書いてしまうと非同期でreturnしてないからエラーになる。
    // けどfileない時をどうやって判断したらいいのか。
    // if (!file) {
    //   return
    // }
    const url = 'http://localhost:3000/api/upload-image';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      // なんやこれ
      onUploadProgress
    }
    return post(url, formData, config)
  }
  return (
    <Grid container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            {success ? (
              <SuccessImage
                fileInfo={fileInfo}
              />
            ) : (
                <ImageForm
                  fileInfo={fileInfo}
                  onChangeHandler={onChange}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                />
              )}
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  )
}
