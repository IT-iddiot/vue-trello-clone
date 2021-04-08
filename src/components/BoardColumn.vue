<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask 
          v-for="(task, $taskIndex) of column.tasks" 
          :key="$taskIndex"
          :task="task"
          :task-index="$taskIndex"
          :column="column"
          :column-index="columnIndex"
        /> 

        <input 
          type="text" 
          class="block p-2 bg-transparent w-full"
          placeholder="+ Enter a new task"
          @keyup.enter="createTask($event, column.tasks)"
        >
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from '@/components/ColumnTask';
import movingColumnsAndTaskMixins from '@/mixins/movingColumnsAndTaskMixins.js';

export default {
    components: {
      ColumnTask
    },

    mixins: [movingColumnsAndTaskMixins],

    methods: {
      createTask(e, tasks) {
        this.$store.commit('CREATE_TASK', { 
          tasks, 
          name: e.target.value 
        })
        e.target.value = '';
      },
    }
}
</script>