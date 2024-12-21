import type { Router, RequestHandler } from "express";
import "reflect-metadata";
import { authenticateMiddleware } from "../middleware/auth.middlewares";
import Config from "../config/Config";

interface RouteDefinition {
  method: "get" | "post" | "put" | "delete" | "patch"; // HTTP methods
  path: string; // Route path
  handler: RequestHandler; // Express request handler
  requiresAuth?: boolean; // Flag to indicate if the route requires JWT authentication
}

const config = Config.getInstance();

/**
 * Marks a method as a route for the router.
 * @param method - HTTP method (e.g., "get", "post").
 * @param path - Path of the route (e.g., "/register").
 * @param requiresAuth - Optional flag to require JWT authentication for the route.
 */
export function route(
  method: RouteDefinition["method"],
  path: string,
  requiresAuth: boolean = false
): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const existingRoutes: RouteDefinition[] =
      Reflect.getMetadata("routes", target.constructor) || [];
    existingRoutes.push({
      method,
      path,
      handler: descriptor.value as RequestHandler,
      requiresAuth,
    });
    Reflect.defineMetadata("routes", existingRoutes, target.constructor);
  };
}

/**
 * Dynamically registers routes for a router class.
 * @param router - The Express router instance.
 * @param RouterClass - The router class containing route definitions.
 */
export function registerRouter(router: Router, instance: any): void {
  const routes: RouteDefinition[] =
    Reflect.getMetadata("routes", instance.constructor) || [];

    routes.forEach((route: RouteDefinition) => {
      // Apply the authenticateMiddleware if the route requires authentication
      if (route.requiresAuth) {
        router[route.method](route.path, authenticateMiddleware(config.jwt_secret), route.handler.bind(instance));
      } else {
        router[route.method](route.path, route.handler.bind(instance));
      }
      console.log(`Mapped route: [${route.method.toUpperCase()}] ${route.path}`);
    });
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
 * Marks a class as a service and logs its registration.
 */
export function service(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("type", "service", target);
    console.log(`Registered service: ${target.name}`);
  };
}
