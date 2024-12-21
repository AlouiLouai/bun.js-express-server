import type { Router, RequestHandler } from "express";
import "reflect-metadata";

interface RouteDefinition {
  method: "get" | "post" | "put" | "delete" | "patch"; // HTTP methods
  path: string; // Route path
  handler: RequestHandler; // Express request handler
}


/**
 * Marks a method as a route for the router.
 * @param method - HTTP method (e.g., "get", "post").
 * @param path - Path of the route (e.g., "/register").
 */
export function route(method: RouteDefinition["method"], path: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const existingRoutes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor) || [];
    existingRoutes.push({
      method,
      path,
      handler: descriptor.value as RequestHandler,
    });
    Reflect.defineMetadata("routes", existingRoutes, target.constructor);
  };
}

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
 * Dynamically registers routes for a router class.
 * @param router - The Express router instance.
 * @param RouterClass - The router class containing route definitions.
 */
export function registerRouter(router: Router, instance: any): void {
  const routes: RouteDefinition[] = Reflect.getMetadata("routes", instance.constructor) || [];

  routes.forEach((route: RouteDefinition) => {
    router[route.method](route.path, route.handler.bind(instance));
    console.log(`Mapped route: [${route.method.toUpperCase()}] ${route.path}`);
  });
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
