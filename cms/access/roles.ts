import type { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === "admin" || user?.role === "editor";
};

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return user?.role === "admin";
};

export const isPublished: Access = () => {
  return { _status: { equals: "published" } };
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user?.role === "admin") return true;
  if (user) return { id: { equals: user.id } };
  return false;
};
