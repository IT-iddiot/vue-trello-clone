import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'todo - first task',
          id: '89647cb2dc8ed',
          userAssigned: null
        },
        {
          description: '',
          name: 'todo - second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'todo - cincai task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'in progress - first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'in progress - second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'in progress - third task',
          id: uuid(),
          userAssigned: null
        },
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'done - first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'done - second task',
          id: uuid(),
          userAssigned: null
        },
      ]
    }
  ]
}
