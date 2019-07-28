import {
  db
} from '@/firebase'

export const removeTodo = {
  methods: {
    data: _ => ({
      isRemoved: false,
    }),

    removeTodo(todo, delay) {
      todo.isRemoved = true
      this.isRemoved = true

      this.$toasted.show(`${todo.text} removed`, {
        theme: 'primary',
        position: 'bottom-center',
        duration: delay,
        action: {
          text: 'UNDO',
          dontClose: true,
          onClick: (e, toastObject) => {
            todo.isRemoved = false
            this.isRemoved = false
            toastObject.goAway(0)
          }
        },
      })

      setTimeout(() => {
        if (this.isRemoved) {
          db.collection(todo.uid).doc(todo.id).delete()
            .then((response) => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }, delay)
    },
  },

}
