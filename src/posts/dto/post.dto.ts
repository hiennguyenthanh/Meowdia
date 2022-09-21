import { Transform, Expose } from 'class-transformer';
import { Post } from '../post.entity';
import * as moment from 'moment';
import { User } from 'users/user.entity';

export class PostDto {
  @Expose()
  id: string;

  @Transform(({ obj }: { obj: Post }) =>
    moment(obj.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  )
  @Expose()
  createdAt: Date;

  @Transform(({ obj }: { obj: Post }) =>
    moment(obj.updatedAt).format('MMMM Do YYYY, h:mm:ss a'),
  )
  @Expose()
  updatedAt: Date;

  @Expose()
  content: string;

  @Transform(({ obj }: { obj: Post }) => obj?.user?.id)
  @Expose()
  userId: string;
}
