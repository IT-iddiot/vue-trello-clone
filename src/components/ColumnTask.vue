<template>
  <div>
    <div 
      class="task" 
      draggable="true"
      @click="goToTask(task)"
      @dragstart="pickupTask($event, taskIndex, columnIndex)"
      @dragenter.prevent
      @dragover.prevent
      @drop.stop="moveTaskOrColumn($event, columnTasks, columnIndex, taskIndex)"
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    columnIndex: {
      type: Number,
      required: true
    },
    columnTasks: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapState(['board'])
  },

  methods: {
    goToTask (task){
      this.$router.push({ name: 'task', params: { id: task.id }})
    },

    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      //* setData accept string only
      e.dataTransfer.setData('type', 'task');
      e.dataTransfer.setData('task-index', taskIndex);
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

</style>