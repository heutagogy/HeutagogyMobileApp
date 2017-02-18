//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'heutagogy'

//action types
export const LOGIN = `${NAME}/LOGIN`
export const LOGOUT = `${NAME}/LOGOUT`
export const SAVE_ARTICLE = `${NAME}/SAVE_ARTICLE`

//as you can see above, each action is namespaced with module's name.
