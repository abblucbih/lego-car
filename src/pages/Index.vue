<template>
  <q-page class="bg-grey-3" style="overflow: hidden;">
    <!-- <div class="q-pa-md">
      <div style="width: 100%">
        <q-chat-message  
          v-for="info in chatMessages"
          :name="info.user"
          :avatar="
            info.user == 'Luca'
              ? 'https://cdn.quasar.dev/img/avatar1.jpg'
              : 'https://cdn.quasar.dev/img/avatar2.jpg'
          "
          :text="[info.message]"
          :sent="info.user == 'Luca'"
          :bg-color="info.user == 'Luca' ? 'primary' : 'success'"
        />
      </div>
    </div>
    <div class="absolute-bottom row">
      <q-input
        type="text"
        class="col bg-white"
        v-model="publishMessage"
        outlined
      />
      <q-btn  @click="publish" icon="send" color="primary"></q-btn>
    </div> -->

    <div>
<div style="width:100%; height: 30vh; margin-top: 20vh;" class="row justify-center items-center" >
   <q-slider
      style="width: 70%;"
      :min="0"
      :max="90"
      @mouseout="goCenter"
      v-model="sideToside"
      color="transparent"
      track-size="20px"
      thumb-color="black"
      thumb-size="35px"
        :step="10"
    />

</div>
<div style="width: 100%;" class="row justify-center">
  <q-slider
      :min="0"
      :max="2"
      vertical
      v-model="upDown"
      color="transparent"
      track-size="20px"
      thumb-color="black"
    :step="1"
       thumb-size="35px"
    />
</div>
    </div>
  </q-page>
</template>

<script>
import { client } from "../boot/mqtt-boot";
export default {
  created() {
    client.on("connect", () => {
      console.log("Conntected!");
      client.subscribe("Luca-messages", function (err) {
        if (!err) {
          let info = JSON.stringify({
            user: "Luca",
            message: "Sup mqtt",
          });
          client.publish("topic", info);
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`${topic} - ${message.toString()}`);
      let info = JSON.parse(message.toString());
      this.chatMessages.push(info);
    });
  },
  data() {
    return {
      sideToside:45,
      upDown:1,
    };
  },
  methods: {
    stear(action, value) {
     client.publish("lucbih/"+ action, value.toString());
    },
    speed(action, value){
      client.publish("lucbih/"+ action, value.toString());
    },
    goCenter(){
        this.sideToside= 45
    },
  },
  watch:{
    sideToside: function (){
      
      this.stear("stear", this.sideToside);
    },

    upDown: function (){
    
        this.speed("speed", this.upDown);
    }

  }
};
</script>
