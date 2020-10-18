import React from 'react'
import styles from '../styles/Home.module.css'
import Svg from '../public/uploadImage.svg'

// form系の奴はもうtextfieldで全部できるみたい。
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  input: {
    display: "none"
  },
  button: {
    background: "#2F80ED",
    textTransform: 'none',
    borderRadius: "8px",
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "-0.035em",
    color: "#FFFFFF",
  },
  area: {
    width: "350px",
    background: "#F6F8FB",
    border: "1px dashed #97BEF4",
    boxSizing: "border-box",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    padding: "35px"
  },
  text: {
    margin: "32px 0 0",
    textAlign: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.035em",
    color: "#BDBDBD"
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default function ImageForm({
  onChangeHandler,
  getRootProps,
  getInputProps,
  isDragActive
}) {
  const classes = useStyle()

  return (
    <form className={classes.form}>
      <h1 className={styles.title}>File Upload</h1>
      <p className={styles.subtitle}>File should be jpeg, png, jpg...</p>
      <div {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />
        <div className={classes.area}>
          <Svg />
          <Typography className={classes.text}>
            {
              isDragActive ? ("Drop the files here ...") : ("Drag & Drop your image here")
            }
          </Typography>
        </div>
      </div>
      <Typography className={classes.text} style={{ marginBottom: "32px" }}>Or</Typography>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChangeHandler}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" size="medium" component="span" className={classes.button}>
          Choose File
        </Button>
      </label>
    </form>
  )
}
