import { mapState } from "vuex";
import AppDrag from '@/components/AppDrag';
import AppDrop from '@/components/AppDrop';

export default {

  components: {
    AppDrag,
    AppDrop,
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
    moveTaskOrColumn(transferData) {
      if(transferData.type === 'task') {
        this.moveTask(transferData);
      } else {
        this.moveColumn(transferData);
      }
    },

    moveColumn({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      });
    },

    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks;

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      });
    },
  }
}