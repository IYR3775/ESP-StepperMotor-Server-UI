/* eslint-disable no-console */
<template>
  <div class="stepperControlPanel mt-3">
    <slot></slot>
    <div class="card-body p-3">
      <div class="d-flex flex-row">
        <!-- <div class="d-none d-sm-inline-block align-self-center p-1">
          <img src="../assets/stepper.svg" style="width:70px;height:90px;" />
        </div> -->
        <div class="col-5 p-1 pl-3">
          <h3 class="font-weight-bold">
            <!-- Name: {{ stepperConfiguration.name }}
          <br />ID: {{ stepperConfiguration.id }} -->
            <br />Moving: {{ (stepperConfiguration.velocity.mm_s > 0 || stepperConfiguration.velocity.mm_s
              < 0) ? "Yes" : "No" }} <br />Velocity: {{ stepperConfiguration.velocity.mm_s }} mm/sec
            <br />
            {{ stepperConfiguration.position.steps }} steps
            <br />
            <br />
            <b-button pill variant="primary" class="m-0 font-weight-bold" size="lg" v-on:click="moveToHomeBegin()">
              <font-awesome-icon icon="fast-backward"></font-awesome-icon>&nbsp;Home
            </b-button>
            <br />
            <br />
            Current Position: <h1 class="display-3 text-success font-weight-bold">
              {{ parseFloat(stepperConfiguration.position.mm).toFixed(1) }}0
              mm<!-- | {{stepperConfiguration.position.revs}} revs | -->
            </h1>
          </h3>
        </div>
        <div class="col-7 p-2">
          <div class="col-auto pl-0 p-0 m-0 font-weight-bold blockquote">
             Set Position (mm) <br />
            <div class="display-3 text-primary font-weight-bold col-7">
              {{ distance }}
            </div>
          </div>
          <div class="row mr-1 btn-group-lg btn-group-vertical col-2">
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('1')"><span
                style="font-size:2em;">1</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('4')"><span
                style="font-size:2em;">4</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('7')"><span
                style="font-size:2em;">7</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('.')"><span
                style="font-size:2em;">.</span>
            </b-button>
          </div>
          <div class="row btn-group-lg btn-group-vertical col-2">
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('2')"><span
                style="font-size:2em;">2</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('5')"><span
                style="font-size:2em;">5</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('8')"><span
                style="font-size:2em;">8</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('0')"><span
                style="font-size:2em;">0</span>
            </b-button>
          </div>
          <div class="row ml-1 btn-group-lg btn-group-vertical col-2">
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('3')"><span
                style="font-size:2em;">3</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('6')"><span
                style="font-size:2em;">6</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('9')"><span
                style="font-size:2em;">9</span>
            </b-button>
            <b-button pill variant="secondary" class="m-2" size="lg" v-on:click="press('C')"><span
                style="font-size:2em;">C</span>
            </b-button>
          </div>
          <div class="row ml-5 btn-group-lg btn-group-vertical">
            <!-- <b-button variant="primary" class="m-3" size="lg" v-on:click="moveToHomeBegin()">
          <font-awesome-icon icon="fast-backward"></font-awesome-icon>&nbsp;Home 0
        </b-button>
        <b-button variant="primary" class="m-3" size="lg" v-on:click="moveToHomeEnd()">
          <font-awesome-icon icon="fast-forward"></font-awesome-icon>&nbsp;Home End
        </b-button> -->
            <!-- <b-button variant="success" class="m-3" v-on:click="moveBack">
          <font-awesome-icon icon="backward"></font-awesome-icon>
        </b-button> -->
            <b-button pill variant="warning" class="m-3 font-weight-bold" size="lg" v-on:click="stop">
              <font-awesome-icon icon="stop"></font-awesome-icon>&nbsp;STOP
            </b-button>
            <b-button pill variant="success" size="lg" class="m-3 text-dark font-weight-bold" v-on:click="moveForward">
              <font-awesome-icon icon="forward"></font-awesome-icon>&nbsp;Move
            </b-button>
            <b-button pill variant="danger" class="m-3 font-weight-bold" size="lg" v-on:click="clearDistance()">
              <font-awesome-icon icon="trash"></font-awesome-icon>&nbsp;CLEAR
            </b-button>
          </div>
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
// import { NumericKeyboard, Keys } from 'numeric-keyboard'

const apiService = new ApiService();
// const keypad = [
//   [
//     {
//       key: Keys.ONE
//     },
//     {
//       key: Keys.TWO
//     },
//     {
//       key: Keys.THREE
//     },
//     // {
//     //   key: Keys.DEL,
//     //   rowspan: 4,
//     // },
//   ],
//   [
//     {
//       key: Keys.FOUR
//     },
//     {
//       key: Keys.FIVE
//     },
//     {
//       key: Keys.SIX
//     },
//   ],
//   [
//     {
//       key: Keys.SEVEN
//     },
//     {
//       key: Keys.EIGHT
//     },
//     {
//       key: Keys.NINE
//     },
//     // {
//     //   key: Keys.ENTER,
//     //   rowspan: 2,
//     // },
//   ],
//   [
//     {
//       key: Keys.DOT
//     },
//     {
//       key: Keys.ZERO
//     },
//     {
//       key: Keys.DEL
//     },
//   ],
// ];

export default {
  name: "StepperMotorControlPanel",
  data: function () {
    return {
      // keypad,
      stepperSpeed: 1000,
      distance: "0",
      acceleration: 800,
      stepUnit: "mm"
    };
  },
  props: {
    stepperConfiguration: Object,
  },
  components: {
    BButton,
    // 'v-numeric-keyboard': NumericKeyboard,
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
    clearDistance() {
      return this.distance = "0";
    },
    press(key) {
      switch (key) {
        case "C":
          if (this.distance.length === 1) {
            this.distance = "0";
          } else {
            this.distance = this.distance.slice(0, -1);
          }

          break;

        case "0":
          if (this.distance === "0") {
            this.distance = "0";
          } else {
            if (this.distance.length === 6 || (!this.distance.includes(".") && this.distance.length === 3)) {
              this.distance = key;
            } else
              this.distance = this.distance + key;
          }

          break;

        case ".":
          if (!this.distance.length) {
            this.distance = "0";
          } else if (!this.distance.includes(".")) {
            this.distance = this.distance + key;
          }

          break;

        default:
          if (this.distance === "0") {
            this.distance = key;
          } else {
            if (this.distance.length === 6 || (!this.distance.includes(".") && this.distance.length === 3)) {
              this.distance = key;
            } else
              this.distance = this.distance + key;
          }
          break;
      }
      // console.log(this.distance.length)
      // console.log(key)
      // if (this.distance.length === 1 && key === "0" || this.distance.length === 1 && key === "C") {
      //   console.log("here")
      //   this.distance = "0";
      // } else {
      //   this.distance = this.distance + key;
      // }
      // if (key === 'C') {
      //   console.log("here")
      //   // const distanceString = this.distance.toString()
      //   if (this.distance.length === 1) {
      //     this.distance = "0";
      //   } else {
      //     console.log("here2")
      //     this.distance = this.distance.slice(0, -1);
      //   }
      // }
      // else if (this.distance === "0" && key === "0") {
      //   this.distance = "0";
      // }
      console.log(this.distance);
    }
  },
};
</script>
