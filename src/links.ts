export const getAppLinks = () => {
  const common = {
    home: () => "/",
    login: () => "/login",
    register: () => "/register"
  }

  return {
    common,
  }
}
