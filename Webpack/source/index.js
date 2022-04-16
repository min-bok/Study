import hello_word from "./hello.js";
import world_word from "./world.js";
import css from "./style.css";
import _ from "lodash";
document.querySelector('#root').innerHTML = _.join([hello_word, world_word], ' ');

console.log('css', css);