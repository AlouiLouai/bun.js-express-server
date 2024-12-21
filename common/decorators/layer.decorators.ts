import "reflect-metadata";

/**
 * Marks a class as a controller and logs its registration
 * @param path - The base path for the controller
 */
export function controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("path", path, target);
    Reflect.defineMetadata("type", "controller", target);
    console.log(`Registered controller: ${target.name} at path: ${path}`);
  };
}

/**
 * Marks a class as a service and logs its registration.
 */
export function service(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("type", "service", target);
    console.log(`Registered service: ${target.name}`);
  };
}
