class Promise {
  static myPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('proses error gan')
      }, 1000);
    })
  }

}

async function asyncNcus() {
  try {
    console.log('asd')
    const data = await Promise.myPromise()
    console.log('qwe', data)
  } catch (err) {
    console.log(err)
  } finally {
    console.log('selesai gan')
  }
}

asyncNcus()