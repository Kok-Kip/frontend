<template>
  <div id="audio-control">
    <audio autoplay controls id="audio"></audio>
    <div id="btn-group">
      <button id="btn-start" v-on:click="start">start</button>
      <button id="btn-pause" v-on:click="pause">pause</button>
      <button id="btn-clear" v-on:click="clear">clear</button>
      <button id="btn-transform" v-on:click="voice2Text">voice2Text</button>
    </div>
  </div>

</template>

<script>
import Recorder, {RECORDER_STATE, ENCODE_TYPE} from 'recorderx'
import axios from 'axios'
import RPCClient from '@alicloud/pop-core'

export default {
  name: 'VoiceInput',
  data () {
    return {
      rc: null,
      file: null
    }
  },
  methods: {
    start: function () {
      console.log('start record')
      if (!this.rc) {
        this.rc = new Recorder({
          recordable: true,
          sampleRate: 16000
        })
      }
      if (this.rc.state === RECORDER_STATE.READY) {
        this.rc.start()
          .then(() => {
            console.log('start recording')
          })
          .catch((error) => {
            console.log('recording failed', error)
          })
      }
    },
    pause: function () {
      console.log('pause record')
      if (this.rc && this.rc.state === RECORDER_STATE.RECORDING) {
        this.rc.pause()

        // save to audio source
        var audio = document.getElementById('audio')
        audio.src = URL.createObjectURL(this.rc.getRecord({
          encodeTo: ENCODE_TYPE.WAV
        }))
        this.file = this.rc.getRecord({
          encodeTo: ENCODE_TYPE.WAV
        })
        console.log(audio.src)
      }
    },
    clear: function () {
      console.log('clear record')
      this.rc.clear()
    },
    voice2Text: function () {
      // console.log(this.file)
      console.log('voice2Text start')
      this.getToken()
      // this.getTextByVoice()
    },
    getToken: function () {
      console.log('getToken start')
      var client = new RPCClient({
        accessKeyId: 'LTAI4FvbUkbyYDQ6PZY13Hin',
        accessKeySecret: 'AGSS25KHDLyyDe5QIoiZqLgUqGRENi',
        endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
        apiVersion: '2019-02-28'
      })

      client.request('CreateToken')
        .then((result) => {
          console.log(result.Token)
        })
    },
    getTextByVoice: function () {
      var appkey = 'oIO7nqiFIunoSK4F'
      var token = ''

      var url = 'http://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/asr'
      var format = 'wav'
      var sampleRate = '16000'
      var enablePunctuationPrediction = true
      var enableInverseTextNormalization = true
      var enableVoiceDetection = false

      var requestUrl = url
      requestUrl = requestUrl + '?appkey=' + appkey
      requestUrl = requestUrl + '&format=' + format
      requestUrl = requestUrl + '&sample_rate=' + sampleRate
      if (enablePunctuationPrediction) {
        requestUrl = requestUrl + '&enable_punctuation_prediction=' + 'true'
      }
      if (enableInverseTextNormalization) {
        requestUrl = requestUrl + '&enable_inverse_text_normalization=' + 'true'
      }
      if (enableVoiceDetection) {
        requestUrl = requestUrl + '&enable_voice_detection=' + 'true'
      }

      var header = {
        'X-NLS-Token': token,
        'Content-type': 'application/octet-stream',
        'Content-Length': this.file.size
      }

      axios.post(requestUrl,
        {data: this.file},
        {
          headers: header
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/VoiceInput.css" scoped></style>
