//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'heutagogy'

//action types
export const LOGIN = `${NAME}/LOGIN`
export const LOGIN_FAILED = `${NAME}/LOGIN_FAILED`
export const LOGOUT = `${NAME}/LOGOUT`
export const SAVE_ARTICLE = `${NAME}/SAVE_ARTICLE`
export const ARTICLES_LOADED = `${NAME}/ARTICLES_LOADED`
export const ARTICLE_CONTENT = `${NAME}/ARTICLE_CONTENT`

//as you can see above, each action is namespaced with module's name.

export const API_VERSION = 'api/v1';
export const GROUP = 'group.heutagogy'
