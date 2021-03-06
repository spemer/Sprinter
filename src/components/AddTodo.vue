<template lang="pug">
  div#addTodo.bg
    div.addTodo_container
      form.addTodo_form
        div.addTodo_color
          div.addTodo_color-each(
            v-for="(color, i) in getColors"
            @click="setColor(i)"
            ref="addColorEach"
            :style="{ border: '6px solid ' + `${color[0]}` }"
          )
        div.addTodo_form-input
          input(
            type="text"
            v-model.trim="newTodo"
            :placeholder="$t('newTodo')"
          )
          button.addTodo_form-clear(
            type="button"
            v-if="newTodo"
            @click="clearForm"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'times-circle']"
            )
        div.addTodo_form-btn
          button(
            type="submit"
            @click.prevent="addTodo()"
          )
            font-awesome-icon.fas(
              :icon="['fas', 'plus']"
            )
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
library.add(faTimesCircle, faPlus)

import { mapGetters, mapMutations } from 'vuex'
import { auth } from '@/firebase'
import { toast } from '@/mixins/toast'
import { addTodo } from '@/mixins/addTodo'

export default {
  computed: {
    ...mapGetters([
      'getUser',
      'getColors',
    ]),
  },

  mounted () {
    auth.onAuthStateChanged((user) => {
      return (user)
        && this.SET_USER(user.uid)
    })
  },

  methods: {
    ...mapMutations([
      'SET_USER',
    ]),
  },

  mixins: [
    toast,
    addTodo
  ],

}
</script>

<style lang="scss" scoped>
#addTodo {
  $btn: $grid12x;

  bottom: 0;
  width: 100%;
  position: fixed;
  padding-bottom: $grid4x;
  @include user-select();
  @include drop-shadow(0, 0, $grid4x, $black08);

  ::selection {
    background-color: transparent !important;
  }

  .addTodo_container {
    padding: $grid4x;

    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(
        env(safe-area-inset-bottom) + #{$grid12x}
      ) !important;
    }

    .addTodo_color {
      padding-bottom: $grid4x;

      .addTodo_color-each {
        width: $grid6x;
        height: $grid6x;
        cursor: pointer;
        display: inline-block;
        @include border-radius(100%);

        &:not(:first-child) {
          margin-left: $grid2x;
        }
      }
    }

    .addTodo_form {
      height: $grid12x;

      .addTodo_form-input,
      .addTodo_form-btn {
        position: relative;
        display: inline-block;
      }

      .addTodo_form-input {
        width: calc(100% - #{$btn} - #{$btn} - #{$grid8x});

        .addTodo_form-clear {
          top: 0;
          width: $btn;
          height: $btn;
          position: absolute;
          right: -#{$grid16x};
          @include animation(clearBtn 0.5s normal forwards ease);

          @keyframes clearBtn {
            from {
              opacity: 0;
            }

            to {
              opacity: 0.5;
            }
          }

          svg {
            top: 50%;
            left: 50%;
          }
        }

        input {
          width: 100%;
          border: none;
          outline: none;
          height: $btn;
          padding: 0 $grid12x 0 $grid4x;
          @include border-radius();

          &::selection {
            color: #fff !important;
            background-color: $brand !important;
          }
        }
      }

      .addTodo_form-btn {
        width: $btn;
        float: right;

        button {
          width: 100%;
          height: $btn;
          border: none;
          color: #fff;
          display: inline-block;
          background-color: $brand;
          @include border-radius(100%);
        }
      }
    }
  }
}
</style>
