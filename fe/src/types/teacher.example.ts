export enum Subject {
  MATH = 'math',
  PHYSICS = 'physics',
}

export interface Teacher {
  name: string
  subjects: Subject[]
}
