import styles from '../styles/Home.module.css'

export default function SuccessImage({ fileInfo }) {
  return (
    // https://stackoverflow.com/questions/60797746/nextjs-images-in-public-folder-not-found-on-deploy-but-are-found-locally
    // nextってpublicパスの指定いらないらしい。
    <>
      <h1 className={styles.title}>Uploaded Successfully!</h1>
      {fileInfo && (
        <img src={fileInfo.file.path.split('public/').join('')} width="338" height="224" />
      )}
    </>
  )
}
