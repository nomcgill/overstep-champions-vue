<template>
  <div id="account-page">
    <h1>Profile</h1>


    <div v-if="!loggedIn">
      <h2>Log in to save your Champion.</h2>
      <p>{{ browserStatus.os }}</p>
      <p>{{ browserStatus.browser }}</p>
      <p>{{ browserStatus.private }}</p>
      <p>You must be logged in to create another Champion.</p>
      <!-- <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button> -->
<!-- 
      <div id="g_id_onload"
          :data-client_id="clientId"
          data-context="signin"
          data-ux_mode="popup"
          :data-callback="handleCredentialResponse()"
      >
      </div>

      <div class="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
      >
      </div> -->
      

      <!-- Need to set a WATCHER in APP.JS to procure warnings when these conditions are met. (Because created and mounted do not update in time) -->
      <p>Note: Google Sign-In is not compatible with Safari on Adroid, Windows, or Linux, nor with incognito mode on Chrome on iOS.</p>
      <button class="g_id_signout">Sign Out</button>
    </div>


    <div v-else>
      <h2>Logged in!</h2>
      <button class="g_id_signout" @click="signOut">Sign Out</button>
    </div>

  </div>
  <!-- <script src="https://accounts.google.com/gsi/client" async defer></script> -->
</template>

<script>
/* eslint-disable no-debugger */

// import GoogleSignInButton from 'vue-google-signin-button-directive'
  import jwt_decode from 'jwt-decode'


export default {
  name: 'Account',
  props: {
    // {
    //   os: this.OSName,
    //   browser: this.browserName,
    //   private: this.isPrivateBrowsing
    // }
    browserStatus: {
      required: true
    }
  },
  // directives: {
  //   GoogleSignInButton
  // },
  created(){
  },
  mounted(){
    // var thisVue = this

    let googleSignInButtonScript = document.createElement('script')
    googleSignInButtonScript.setAttribute('src', 'https://accounts.google.com/gsi/client')
    googleSignInButtonScript.setAttribute('async', true)
    googleSignInButtonScript.setAttribute('defer', true)
    googleSignInButtonScript.setAttribute('id', 'googleSignInButtonScript')
    document.head.appendChild(googleSignInButtonScript)

    const googleScript = document.getElementById('googleSignInButtonScript')

    googleScript.addEventListener('load', () => {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse
      })
      window.google.accounts.id.prompt(notification => {
        console.log('on prompt notification', notification)
        if (notification.isNotDisplayed()){
          console.log('is not displayed - ', notification.getNotDisplayedReason())
        } else if (notification.isSkippedMoment()){
          console.log('is skipped - ', notification.getSkippedReason())
        } else if (notification.isDismissedMoment()){
          console.log('is dismissed - ', notification.getDismissedReason())
        }
      })
    })
    // console.log(this)
    // var google = window.google
    // debugger;
    // google.accounts.id.initialize({
    //   client_id: '1028981298293-mhurtns3a9e7r2u9vv17v0914b169g23.apps.googleusercontent.com',
    //   callback: thisVue.handleCredentialResponse()
    // })
    // google.accounts.id.prompt()
    

    // const thisVue = this
    // console.log
    // window.onload = function () {
    //   window.google.accounts.id.initialize({
    //     client_id: '1028981298293-mhurtns3a9e7r2u9vv17v0914b169g23.apps.googleusercontent.com',
    //     callback: thisVue.handleCredentialResponse
    //   });
    //   window.google.accounts.id.prompt();
    // };


    // console.log('FROM:')
    // console.log(window.google)

    // if (!window.google){
    //   window.google = {}
    // }

    // // TARGET
    // var target = window.google

    // // HANDLER
    // // const handler = {}
    // const handler = {
    //   get(target, prop) {
    //   console.log('TO:')
    //   console.log(window.google)
    //   console.log(target)
    //   console.log(prop)
    //   debugger;
    //     return "world"
    //   }
    // }
    
    // // PROXY
    // const proxy = new Proxy(target, handler)
    
    // // var proxy = new Proxy(windowGoogle, {
    // //   set: function (target, key, value){
    // //     console.log(key)
    // //     console.log(value)
    // //     target[key] = value
    // //     return true
    // //   }
    // // })
    // console.log(handler.windowGoogle)


    // if (!(window.google === undefined || Object.keys(window.google).length === 0)){
    //   // debugger;
    //   window.google.accounts.id.initialize({
    //     client_id: this.clientId
    //   })
    //   window.google.accounts.id.prompt(notification => {
    //     console.log('on prompt notification', notification)
    //   })
    // }
  },
  data(){
    return {
      loggedIn: false,
      clientId: '1028981298293-mhurtns3a9e7r2u9vv17v0914b169g23.apps.googleusercontent.com'
    }
  },
  methods: {
    // OnGoogleAuthSuccess (idToken) {
    //   console.log(idToken)
    //   // Receive the idToken and make your magic with the backend
    // },
    // OnGoogleAuthFail (error) {
    //   console.log(error)
    // },
    handleCredentialResponse(response){
      this.loggedIn = true

      // Unique clientId
      console.log(response.clientId)

      // Response object with picture URL and first name.
      // .picture, .given_name
      const decodedToken = jwt_decode(response.credential) 
      console.log(decodedToken)    
    },
    signOut(){
      console.log('signing out!')
      this.loggedIn = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#account-page {
  padding: 15px 5px;
}

h1 {
  padding: 10px 0;
  text-align: center;
}

</style>