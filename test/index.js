import chromeColorLog from 'chromeColorLog'
import asciify from 'asciify-aalib'

new Vue({
  el: "#app",
  template: `
    <div>
      <h4>Open your console and select a image file</h4>
      <input type="file" @change="fileChange" accept="image/*" />
      <div>
        <pre v-html="ascii"></pre>
      </div>
    </div>
  `,
  data() {
    return {
      ascii: ''
    }
  },
  methods: {
    fileChange(e) {
      const myFile = Array.from(e.target.files).pop()
      const url = URL.createObjectURL(myFile)

      const asiiImage = new asciify(url)

      asiiImage.ascii()
        .then(res => {
          chromeColorLog(res)
          self.ascii = res.innerHTML
        })
    }
  }
})