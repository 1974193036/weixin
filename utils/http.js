import { config } from '../config.js'

const TIPS = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  /**
   * 封装请求方法，es6解构赋值传参
   * @param url    请求地址
   * @param data   请求参数，默认{}
   * @param method 请求方法，默认'GET'
   */
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, data, method, resolve, reject)
    })
  }

  _request(url, data = {}, method = 'GET', resolve, reject) {
    wx.request({
      url: config.api_blink_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        const code = res.statusCode.toString()
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._showErrMsg(error_code)
        }
      },
      fail: err => {
        reject()
        this._showErrMsg(1)
      }
    })
  }

  // 异常提示
  _showErrMsg(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = TIPS[error_code]
    wx.showToast({
      title: tip ? tip : TIPS[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export default HTTP