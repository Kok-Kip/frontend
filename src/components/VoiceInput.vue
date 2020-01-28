<template>
  <div id="audio-control">
    <audio autoplay controls id="audio"></audio>
    <div id="btn-group">
      <button id="btn-start" v-on:click="start">start</button>
      <button id="btn-pause" v-on:click="pause">pause</button>
      <button id="btn-clear" v-on:click="clear">clear</button>
      <button id="btn-transform" v-on:click="voice2Text">voice2Text</button>
    </div>
    <div id="result-box">
      {{result}}
    </div>
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
      result: ''
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
      console.log(this.file)
      let form = new FormData()
      let voiceFile = new window.File([this.file], 'v.wav', {type: 'audio/wave'})
      console.log(voiceFile)
      form.append('file', voiceFile)
      console.log('voice2Text start')
      this.$axios({
        method: 'post',
        url: `http://127.0.0.1:5000/test_api`,
        data: form
      }).then((response) => {
        console.log(response)
        this.result = response.data.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="../../static/css/VoiceInput.css" scoped></style>
