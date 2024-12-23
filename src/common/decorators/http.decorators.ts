/**
 * Maps an HTTP GET method to a route.
 * @param path - The route path.
 */
export function get(path: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const routes = Reflect.getMetadata('routes', target.constructor) || [];
    routes.push({ method: 'get', path, handler: descriptor.value });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}

/**
 * Maps an HTTP POST method to a route.
 * @param path - The route path.
 */
export function post(path: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const routes = Reflect.getMetadata('routes', target.constructor) || [];
    routes.push({ method: 'post', path, handler: descriptor.value });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}
