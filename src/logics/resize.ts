// @ts-ignore
import Reduce from 'image-blob-reduce'

const reduce = Reduce()
reduce._create_blob = function(env: any) {
  return this.pica.toBlob(env.out_canvas, 'image/jpeg', 0.8)
    .then((blob: any) => {
      env.out_blob = blob
      return env
    })
}

export {
  reduce,
}
