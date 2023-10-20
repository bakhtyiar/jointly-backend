// Parses from expressjs router.stack data for permissions collection in mongodb
export function extractRoutesMethods(data) {
  const routes = [];
  for (const item of data) {
    if (item.route) {
      const route = item.route;
      const path = route.path;
      const methods = Object.keys(route.methods).filter(
        (method) => route.methods[method],
      );
      for (const method of methods) {
        routes.push({ path: path, method: method });
      }
    }
  }
  return routes;
}
