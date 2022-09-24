import { Transform, TransformFnParams } from 'class-transformer';
import * as moment from 'moment';

export const DatetimeFormat = () =>
  Transform((params: TransformFnParams) =>
    moment(params.obj.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  );
