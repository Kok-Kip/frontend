<template>
  <div id="audio-control">
    <audio id="audio"></audio>
    <div id="btn-group">
      <button id="btn-start" v-on:click="start">{{startBtnText}}</button>
      <button id="btn-stop" v-on:click="stop">stop</button>
      <button id="btn-transform" v-on:click="voice2Text">voice2Text</button>
    </div>
    <div id="result-box">
      Recognized Result: {{result}}
    </div>
    <button id="btn-back" v-on:click="back">back</button>
  </div>

</template>

<script>
import Recorder, {RECORDER_STATE, ENCODE_TYPE} from 'recorderx'

export default {
  name: 'VoiceInput',
  data () {
    return {
      rc: null,
      file: null,
      result: '',
      startBtnText: 'start'
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
            this.startBtnText = 'pause'
          })
          .catch((error) => {
            console.log('recording failed', error)
          })
      } else if (this.rc && this.rc.state === RECORDER_STATE.RECORDING) {
        console.log('pause recording')
        this.rc.pause()
        this.startBtnText = 'continue'
      }
    },
    stop: function () {
      console.log('stop record')
      if (this.rc && this.rc.state === RECORDER_STATE.RECORDING) {
        this.rc.pause()
        this.startBtnText = 'start'
        // save to audio source
        var audio = document.getElementById('audio')
        audio.src = URL.createObjectURL(this.rc.getRecord({
          encodeTo: ENCODE_TYPE.WAV
        }))
        this.file = this.rc.getRecord({
          encodeTo: ENCODE_TYPE.WAV
        })
        console.log(audio.src)

        this.rc.clear()
      }
    },
    voice2Text: function () {
      console.log(this.file)
      let form = new FormData()
      let voiceFile = new window.File([this.file], 'v.wav', {type: 'audio/wave'})
      console.log(voiceFile)
      form.append('file', voiceFile)
      console.log('voice2Text start')
      this.$axios({
        method: 'post',
        url: `http://127.0.0.1:5000/voice`,
        data: form
      }).then((response) => {
        console.log(response)
        this.result = response.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    back: function () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/VoiceInput.css" scoped></style>
