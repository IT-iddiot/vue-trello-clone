<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        'type': 'task',
        'fromTaskIndex': taskIndex,
        'fromColumnIndex': columnIndex
      }"
      @click="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p 
        v-if="task.description"
        class="w-full flex-no-shrink mt-1"
      >
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingColumnsAndTaskMixins from '@/mixins/movingColumnsAndTaskMixins.js';

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
  },

  mixins: [movingColumnsAndTaskMixins],

  methods: {
    goToTask (task){
      this.$router.push({ 
        name: 'task', 
        params: { id: task.id }
      })
    },
  }
}
</script>

<style scoped>

</style>