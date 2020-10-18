// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'

// なんでexportする必要があるのか？？
export const config = {
  api: {
    bodyParser: false,
  }
}

export default (req, res) => {
  const form = new formidable.IncomingForm()

  // ここをs3とかバケットサービスに連携すればアップロードできる。
  form.uploadDir = "./public/images"
  form.keepExtensions = true

  /* requestをparseして多分fileを見つけてる？複数送ってもいけるのだろうか？ */
  form.parse(req, (err, fields, files) => {
    // yarn devした時のterminal consoleに出てくる。
    console.log(err, fields, files)
    res.status(200).json({ fields, files });
  })
}
