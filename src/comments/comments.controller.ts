import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { Roles } from 'decorators/created-by.decorator';
import { Role } from 'enum/role.enum';
import { JwtAuthGuard, RolesGuard } from 'guards';
import { GetUser } from 'users/get-user.decorator';
import { User } from 'users/user.entity';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async createCommment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() currentUser: User,
  ): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto, currentUser);
  }

  @Patch('/:id')
  // @UseGuards(RolesGuard<CommentsService>)
  @Roles(Role.Owner)
  async updateContent(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }
}
