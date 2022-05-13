export interface AdapterInterceptor<T, D> {
  intercept(value: T): D;
}
