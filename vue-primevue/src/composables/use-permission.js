import { useAuth } from "@/stores/auth";

export function usePermission() {
  const store = useAuth();

  const hasRole = (name) => store.authData?.roles.includes(name);
  // || usePage().props.auth.user.roles.includes("super-admin");
  const hasPermission = (name) => store.authData?.permissions.includes(name);
  //|| usePage().props.auth.user.roles.includes("super-admin");

  return { hasRole, hasPermission };
}
