/* eslint-disable no-param-reassign */
/* eslint-disable fp/no-mutation */

import base64 from 'base-64'
import moment from 'moment'
import { schema } from 'normalizr'


const options = {
  processStrategy: ({ access_token }) => {
    const data = JSON.parse(base64.decode(access_token.split('.')[1]));
    const exp =  moment.unix(data.exp).format();

    return { access_token, exp }
  },
  idAttribute: ({ access_token }) => JSON.parse(base64.decode(access_token.split('.')[1])).identity,
};

export default new schema.Entity('authUser', {}, options)
