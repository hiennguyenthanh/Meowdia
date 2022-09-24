import { Transform, Expose } from 'class-transformer';
import { Post } from '../post.entity';
import { DatetimeFormat } from 'transformers/datetime-format.transformer';

export class PostDto {
  @Expose()
  id: string;

  @DatetimeFormat()
  @Expose()
  createdAt: Date;

  @DatetimeFormat()
  @Expose()
  updatedAt: Date;

  @Expose()
  content: string;

  @Transform(({ obj }: { obj: Post }) => obj?.user?.id)
  @Expose()
  userId: string;
}
