import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  CHANGE_IMAGE_FILE
} from '../action'

// でもこのままやとredux入れたとき簡単に移行できるんかな？
// index.jsがrootReducerになって、あとはページごとに分けて読み込めばいいんかなぁ。
// まぁ作るときにまたやるしかないな。
export const initialState = {
  file: null,
  fileInfo: null,
  progress: 0,
  success: false
}

export default function Reducer(state, action) {
  switch (action.type) {
    case FILE_UPLOAD_REQUEST:
      return {
        progress: Math.round((100 * action.event.loaded) / action.event.total)
      }
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileInfo: action.files,
        progress: 0,
        success: true
      }
    case FILE_UPLOAD_FAILURE:
      return {
        ...state,
        progress: 0,
        fileInfo: null,
        success: false
      }
    case CHANGE_IMAGE_FILE:
      return {
        file: action.file
      }
  }
}
