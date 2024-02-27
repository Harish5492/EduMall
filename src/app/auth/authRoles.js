export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  subadmin:['SA', 'ADMIN','SUBADMIN'], // Only SA & Admin & SubAdmin has access
  editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
  guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'] // Everyone has access
};
