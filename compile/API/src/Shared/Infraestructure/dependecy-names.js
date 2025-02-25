"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_SERVER = exports.ENV_SERVICE = exports.PET_REPOSITORY = exports.USER_REPOSITORY = void 0;
// Define every repository to obtaing a code that will be bind at runtime. This value changes in every run and it's needed for binding because javascript has no types.
exports.USER_REPOSITORY = Symbol();
exports.PET_REPOSITORY = Symbol();
exports.ENV_SERVICE = Symbol();
exports.HTTP_SERVER = Symbol();
