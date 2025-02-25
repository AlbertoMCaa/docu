
// Define every repository to obtaing a code that will be bind at runtime. This value changes in every run and it's needed for binding because javascript has no types.
export const USER_REPOSITORY = Symbol();
export const PET_REPOSITORY = Symbol();
export const ENV_SERVICE = Symbol();
export const HTTP_SERVER = Symbol();