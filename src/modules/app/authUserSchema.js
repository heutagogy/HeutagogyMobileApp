/* eslint-disable no-param-reassign */
/* eslint-disable fp/no-mutation */

import { schema } from 'normalizr'
import moment from 'moment'
import { decodeUnicode } from './../../utils/base64'


const options = {
  processStrategy: ({ access_token }) => {
    const data = JSON.parse(decodeUnicode(access_token.split('.')[1]));
    const exp =  moment.unix(data.exp).format();

    return { access_token, exp }
  },
  idAttribute: ({ access_token }) => JSON.parse(decodeUnicode(access_token.split('.')[1])).identity,
};

export default new schema.Entity('authUser', {}, options)
