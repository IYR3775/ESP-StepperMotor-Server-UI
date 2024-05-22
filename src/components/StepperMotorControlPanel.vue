/* eslint-disable no-console */
<template>
  <div class="stepperControlPanel card card-small mt-3">
    <slot></slot>
    <div class="card-body p-3">
      <div class="d-flex flex-row">
        <div class="d-none d-sm-inline-block align-self-center p-1">
          <img src="../assets/stepper.svg" style="width:70px;height:90px;" />
        </div>
        <div class="p-1 pl-3">
          Name: {{ stepperConfiguration.name }}
          <br />ID: {{ stepperConfiguration.id }}
          <br />Moving: {{ (stepperConfiguration.velocity.mm_s > 0 || stepperConfiguration.velocity.mm_s
            < 0) ? "Yes" : "No" }} <br />Velocity: {{ stepperConfiguration.velocity.mm_s }} mm/sec
          <br />
          {{ stepperConfiguration.position.steps }} steps
          <br />
          Position: <h1 class="display-3">
            {{ stepperConfiguration.position.mm.toFixed(1) }}0 mm<!-- | {{stepperConfiguration.position.revs}} revs | -->
          </h1>
        </div>
        <!-- <div class="p-1">
          
          <br />
          
          <br />
         
          <br /> -->
        <!-- {{stepperConfiguration.velocity.rev_s}} revs/sec | --><!-- |
          {{stepperConfiguration.velocity.steps_s}} steps/sec-->
        <!-- <br />
        </div> -->
      </div>
      <div class="row p-3">
        <b-button variant="primary" class="m-3" size="lg" v-on:click="moveToHomeBegin()">
          <font-awesome-icon icon="fast-backward"></font-awesome-icon>&nbsp;Home 0
        </b-button>
        <b-button variant="primary" class="m-3" size="lg" v-on:click="moveToHomeEnd()">
          <font-awesome-icon icon="fast-forward"></font-awesome-icon>&nbsp;Home End
        </b-button>
        <!-- <b-button variant="success" class="m-3" v-on:click="moveBack">
          <font-awesome-icon icon="backward"></font-awesome-icon>
        </b-button> -->
        <b-button variant="warning" class="m-3" size="lg" v-on:click="stop">
          <font-awesome-icon icon="stop"></font-awesome-icon>&nbsp;STOP
        </b-button>
        <b-button variant="success" size="lg" class="m-3" v-on:click="moveForward">
          <font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;Move
        </b-button>
      </div>
      <div class="form-group row mb-1">
        <label class="col-2 col-form-label col-form-label" for="distance">Move (mm)</label>
        <div class="col-auto">
          <input class="form-control" autofocus v-model="distance" type="number" id="distance" />
          <!-- <NumericInput type="number" placeholder="touch to input" v-model="distance" /> -->
        </div>
        <div class="col-3">
          <v-numeric-keyboard :layout="keypad" @press="press" />
        </div>
      </div>
      <!-- <div class="form-group row mb-1">
        <label class="col-2 col-form-label col-form-label" for="speed">Speed</label>
        <div class="col-auto">
          <input class="form-control" v-model="stepperSpeed" type="number" id="speed" />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label
          class="col-2 col-form-label col-form-label"
          for="acceleration"
        >Acceleration</label>
        <div class="col-auto">
          <input class="form-control" v-model="acceleration" type="number" id="acceleration" />
        </div>
      </div> -->
      <!-- <div class="form-group row">
        <label class="col-6 col-form-label col-form-label" for="distance">Set Position</label>
        <div class="col-auto form-inline">
          <input class="form-control" v-model="distance" type="number" id="distance" />
          <select class="form-control ml-1" v-model="stepUnit">
            <option value="steps">steps</option>
            <option value="mm">mm</option>
            <option value="revs">revolutions</option>
          </select>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { ApiService } from "../services/ApiService";
import { BButton } from "bootstrap-vue";
import { NumericKeyboard, Keys } from 'numeric-keyboard'

const apiService = new ApiService();
const keypad = [
  [
    {
      key: Keys.ONE
    },
    {
      key: Keys.TWO
    },
    {
      key: Keys.THREE
    },
    // {
    //   key: Keys.DEL,
    //   rowspan: 4,
    // },
  ],
  [
    {
      key: Keys.FOUR
    },
    {
      key: Keys.FIVE
    },
    {
      key: Keys.SIX
    },
  ],
  [
    {
      key: Keys.SEVEN
    },
    {
      key: Keys.EIGHT
    },
    {
      key: Keys.NINE
    },
    // {
    //   key: Keys.ENTER,
    //   rowspan: 2,
    // },
  ],
  [
    {
      key: Keys.DOT
    },
    {
      key: Keys.ZERO
    },
    {
      key: Keys.DEL
    },
  ],
];

export default {
  name: "StepperMotorControlPanel",
  data: function () {
    return {
      keypad,
      stepperSpeed: 1000,
      distance: 0,
      acceleration: 800,
      stepUnit: "mm"
    };
  },
  props: {
    stepperConfiguration: Object,
  },
  components: {
    BButton,
    'v-numeric-keyboard': NumericKeyboard,
  },
  methods: {
    stop() {
      apiService.stopStepper(this.stepperConfiguration.id).then((data) => {
        //do something
        console.log(data);
      });
    },
    moveForward() {
      apiService
        .moveStepper(
          this.stepperConfiguration.id,
          this.distance,
          this.stepperSpeed,
          this.acceleration,
          this.stepUnit
        )
        .then((data) => {
          //do something
          console.log(data);
        });
    },
    moveBack() {
      apiService
        .moveStepper(
          this.stepperConfiguration.id,
          0 - this.distance,
          this.stepperSpeed,
          this.acceleration,
          this.stepUnit
        )
        .then((data) => {
          //do something
          console.log(data);
        });
    },
    moveToHomeEnd() { },
    moveToHomeBegin() { },
    press(key) {
      if (key === Keys.DEL) {
        const distanceString = this.distance.toString()
        if (distanceString.length === 1) {
          this.distance = 0
        } else { this.distance = parseFloat(distanceString.slice(0, -1)) }
      }
      else {
        if (this.distance === 0 && key === Keys.DOT) {
          this.distance = parseFloat(key)
        }
        this.distance = parseFloat(this.distance + key)
      }
      console.log(this.distance);
    }
  },
};
</script>
