export const getAppLinks = () => {
  const common = {
    home: () => "/",
    login: () => "/login",
    register: () => "/register",
    profile: () => "/profile"
  }

  return {
    common,
  }
}
