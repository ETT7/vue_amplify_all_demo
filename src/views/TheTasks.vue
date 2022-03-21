<template>
    <div class="form-body">
        <form v-on:submit.prevent autocomplete="off">
          <div>
            <label>Task: </label>
            <input v-model='form.taskName' class='input' autocomplete="off" />
          </div>
          <div>
            <label>Details: </label>
            <input v-model='form.details' class='input' autocomplete="off" />
          </div>
          <button @click='createTask' class='button'>Create</button>
          <button @click='getData' class='button'>Refresh</button>
        </form>
      </div>
      <div class="app-body">
        <div v-if="loading" class="loading">Loading...</div>
        <div class="card-container" v-if="!loading">
          <div class="card" v-for="task of sortedTasks" :key="task.id">
            <div class="remove"><button @click='deleteTask(task)' class='button'>Delete</button></div>
            <div class="name">{{ task.taskName }}</div>
            <div class="symbol">{{ task.details }}</div>
          </div>
        </div>
      </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import { listTasks } from '../graphql/queries';
import { createTask, deleteTask } from '../graphql/mutations';
import { onCreateTask, onDeleteTask } from '../graphql/subscriptions';
export default {
    data() {
    return {
      user: { },
      tasks: [],
      form: { },
      loading: true
    }
  },
  computed: {
    sortedTasks() {
      let tasks = [...this.tasks];
      return tasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
    }
  },
  created() {
    // authentication state managament
  
        this.getData();
      
    //Subscribe to changes
    API.graphql(graphqlOperation(onCreateTask))
    .subscribe((sourceData) => {
      const newTask = sourceData.value.data.onCreateTask
      if (newTask) {
        // skip our own mutations and duplicates
        if (this.tasks.some(r => r.id == newTask.id)) return;
        this.tasks = [newTask, ...this.tasks];
      } 
    });
    API.graphql(graphqlOperation(onDeleteTask))
    .subscribe((sourceData) => {
      const deletedTask = sourceData.value.data.onDeleteTask
      if (deletedTask) {
        this.tasks = this.tasks.filter((r) => r.id != deletedTask.id);
      } 
    });
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const response = await API.graphql(graphqlOperation(listTasks));
        this.tasks = response.data.listTasks.items;
      }
      catch (error) {
        console.log('Error loading Tasks...', error);
      }
      finally {
        this.loading = false;
      }
    },
    async createTask() {
      const { taskName, details } = this.form
      if (!taskName || !details) return;
    console.log("hehe");
      const task = { taskName, details, clientId: this.clientId };
      console.log("hehe");
      try {
        const response = await API.graphql(graphqlOperation(createTask, { input: task }))
        console.log('Item created!')
        this.tasks = [...this.tasks, response.data.createTask];
        this.form = { taskName: '', details: ''};
      } catch (error) {
        console.log('Error creating task...', error)
      }
    },
    async deleteTask(task) {
      if (task) {
        try {
          const { id } = task;
          await API.graphql(graphqlOperation(deleteTask, { input: { id: id } }))
          console.log('Item deleted!')
          this.tasks = this.tasks.filter((r) => r.id != task.id );
        } catch (error) {
          console.log('Error deleting task...', error)
        }
      }
    }
  }
}
</script>
