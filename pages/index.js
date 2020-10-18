import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { post } from 'axios'
import ImageForm from '../components/ImageForm'
// form系の奴はもうtextfieldで全部できるみたい。
import { Grid, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  card: {
    padding: "1rem",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  }
})

export default function Home() {
  const classes = useStyle()
  const [file, setFile] = useState(null)
  const [fileInfo, setFileInfo] = useState(null)
  const [progress, setProgress] = useState(0)
  const onDrop = useCallback(acceptedFiles => {
    const f = acceptedFiles[0]
    setFile(f)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (file) {
      upload()
    }
  }, [file])

  function upload() {
    setProgress(0);
    fileUpload(file, (event) => {
      console.log(event.loaded)
      console.log(event.total)
      console.log(Math.round((100 * event.loaded) / event.total))
    }).then((response) => {
      // ここで更新するから一生走る。
      // 一回更新したら更新しないようにしないとあかんけど更新してfileが変わったらupload methodが走るから一緒
      setFileInfo(response.data.files)
      console.log(response.data);
    }).catch(() => {
      setProgress(0)
    })
  }
  // function onSubmit(e) {
  //   e.preventDefault() // これでsubmitイベントを止めてるんか
  //   fileUpload(file).then((response) => {
  //     console.log(response.data);
  //   })
  // }
  function onChange(e) {
    const f = e.target.files[0]
    setFile(f)
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
    // form よくわかってない。
    <Grid container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <ImageForm
              fileInfo={fileInfo}
              onChangeHandler={onChange}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
            />
            {/* <div>
          <LinearProgress variant="determinate" value={progress} />
        </div> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  )
}
