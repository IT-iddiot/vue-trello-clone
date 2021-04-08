import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils';

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      // return state.board.columns.find(col => {
      //   return col.tasks.find(e => e.id === taskId);
      // })
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if(task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    // TODO helloworld
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },

    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value;
    },

    MOVE_TASK (state, { fromTasks, fromTaskIndex, toTasks, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },

    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },

    //* Column Reorder
    MOVE_COLUMN (state, { fromColumn, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumn, 1)[0]; // remove old
      columnList.splice(toColumnIndex, 0, columnToMove); // add new
    }
  }
})
