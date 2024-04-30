import { useUsers } from "@/stores/auth";

export function usePermission() {
  const store = useUsers();

  const hasRole = (name) => store.userData?.roles.includes(name);
  // || usePage().props.auth.user.roles.includes("super-admin");
  const hasPermission = (name) => store.userData?.permissions.includes(name);
  //|| usePage().props.auth.user.roles.includes("super-admin");

  return { hasRole, hasPermission };
}
