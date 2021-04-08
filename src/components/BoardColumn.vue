<template>
    <div
        class="column"
        draggable="true"
        @dragstart.self="pickupColumn($event, columnIndex)"
        @dragenter.prevent
        @dragover.prevent
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
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
            :column-index="columnIndex"
            :column-tasks="column.tasks"
          /> 

          <input 
              type="text" 
              class="block p-2 bg-transparent w-full"
              placeholder="+ Enter a new task"
              @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ColumnTask from '@/components/ColumnTask';

export default {
    components: {
      ColumnTask
    },

    props: {
        column: {
            type: Object,
            required: true
        },
        columnIndex: {
            type: Number,
            required: true
        }
    },

    computed: {
      ...mapState(['board'])
    },

    methods: {
        createTask(e, tasks) {
          this.$store.commit('CREATE_TASK', { 
            tasks, 
            name: e.target.value 
          })
          e.target.value = '';
        },

        pickupColumn(e, fromColumnIndex) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.dropEffect = 'move';

          //* setData accept string only
          e.dataTransfer.setData('type', 'column');
          e.dataTransfer.setData('from-column-index', fromColumnIndex);    
        },

        moveTaskOrColumn(e, toTasks, toColumnIndex, taskIndex) {
          const type = e.dataTransfer.getData('type');
          if(type === 'task') {
            this.moveTask(e, toTasks, taskIndex);
          } else {
            this.moveColumn(e, toColumnIndex);
          }
        },

        moveColumn(e, toColumnIndex) {
          const fromColumnIndex = e.dataTransfer.getData('from-column-index');
          this.$store.commit('MOVE_COLUMN', {
            fromColumnIndex,
            toColumnIndex
          });
        },

        moveTask(e, toTasks, toTaskIndex) {
          console.log(e.dataTransfer.items);
          const fromColumnIndex = e.dataTransfer.getData('from-column-index');
          const fromTasks = this.board.columns[fromColumnIndex].tasks;
          const fromTaskIndex = e.dataTransfer.getData('task-index'); 

          this.$store.commit("MOVE_TASK", {
            fromTasks,
            fromTaskIndex,
            toTasks,
            toTaskIndex
          });
        },
    }
}
</script>

<style scoped>

.column {
    @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
}

</style>