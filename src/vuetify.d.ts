import Vue from 'vue'

export interface IVForm extends Vue {
  validate(): void
}

export interface IVTextField extends Vue {
  focus(): void
}
