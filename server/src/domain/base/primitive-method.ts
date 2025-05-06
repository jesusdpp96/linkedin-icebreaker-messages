export interface PrimitiveMethod<T> {
  // to get the primitive value of the object (raw value)
  toPrimitive(): T
}
