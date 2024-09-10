export function extractUserFields(user) {
  return {
    uuid: user.uuid,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
