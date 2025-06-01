export interface ToJsonMethod<T> {
  // to get the primitive value of the object (raw value)
  toJSON(): T
}
